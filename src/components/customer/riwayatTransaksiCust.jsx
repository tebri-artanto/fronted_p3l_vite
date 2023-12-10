import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import SidebarTest from "../SidebarTest";
import Navbar from "../Navbar";
import { Dialog, Transition } from '@headlessui/react'
import useProfileData from "../utilities/fetchUserData";
import { useNavigate } from "react-router-dom";

const RiwayatTransaksiCust = () => {
    const { mutate } = useSWRConfig();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);
    const { user, customer } = useProfileData();
    const [reservasiId, setReservasiId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetcher = async () => {
            const response = await axios.get("http://localhost:8000/reservasis");
            setData(response.data.data);
        };
        fetcher();
    }, []);

    console.log(customer);
    const filteredData = data.filter((riwayatReservasi) => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            (riwayatReservasi.id_customer === customer.id ) &&
            (riwayatReservasi.booking_id.toLowerCase().includes(searchTermLower) ||
            riwayatReservasi.tanggal_checkin.toString().includes(searchTermLower) ||
            riwayatReservasi.tanggal_checkout.toString().includes(searchTermLower) ||
            riwayatReservasi.create_date.toLowerCase().includes(searchTermLower) ||
            riwayatReservasi.status_reservasi.toLowerCase().includes(searchTermLower) ||
            riwayatReservasi.tanggal_pembayaran.toString().includes(searchTermLower))
        );
    });
  function formatDateToDateString(dateString) {
    const date = new Date(dateString);

    if (dateString === "1970-01-01T00:00:00.000Z") {
      return "-";
    }
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  }
  

  const deleteProduct = async (reservasiId) => {
    setReservasiId(reservasiId);
    openModal();
    
  };
  function closeModal() {
    setIsOpen(false)
  }
  function closeModalBatal() {
    batalReservasi(reservasiId);
    setIsOpen(false)
  }

  const batalReservasi= async (reservasiId) => {
    const response = await axios.put(
      `http://localhost:8000/reservasis/update/${reservasiId}`,
      {
        status_reservasi: "Dibatalkan",
        tanggal_pembayaran: new Date(0),
      }
    );
    console.log(response.data);
      navigate("/riwayatTransaksiCust");
  }
  function openModal() {
    setIsOpen(true)
  }

  return (
    <div className='App flex justify-between'>
      <SidebarTest />
      <div className="w-screen ">
        <Navbar />
        <div className="w-full p-10">
          <h1 className="text-3xl font-semibold text-gray-900 pb-10">Riwayat Transaksi</h1>
          <Link
            to="/addFasilitas"
            className="bg-green-500 hover:bg-green-700 border border-slate-200 text-white font-bold py-2 px-4 rounded-lg"
          >
            Add New
          </Link>
          <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-slate-200 rounded-md p-2 focus:ring focus:ring-blue-400"
            />
          <div className="relative shadow rounded-lg mt-3">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                    <th className="py-3 px-1 text-center">No</th>
                    <th className="py-3 px-2 text-center">Booking ID</th>
                    <th className="py-3 px-1 text-center">Status </th>
                    <th className="py-3 px-2 text-center">Tanggal Pembuatan</th>
                    <th className="py-3 px-1 text-center">Status Reservasi</th>
                    <th className="py-3 px-1 text-center">Tanggal Pembayaran</th>
                    <th className="py-3 px-1 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((reservasi, index) => (
                  <tr className="bg-white border-b" key={reservasi.id}>
                    <td className="py-3 px-1 text-center">{index + 1}</td>
                    <td className="py-3 px-6 font-medium text-gray-900 text-center">
                      {reservasi.booking_id}
                    </td>
                    <td className="py-3 px-6 text-center">{formatDateToDateString(reservasi.tanggal_checkin)}</td>
                    <td className="py-3 px-6 text-center">{formatDateToDateString(reservasi.create_date)}</td>
                    <td className="py-3 px-6 text-center">{reservasi.status_reservasi}</td>
                    <td className="py-3 px-6 text-center">{formatDateToDateString(reservasi.tanggal_pembayaran)}</td>
                    <td className="py-3 px-1 text-center">
                    <Link
                        to={`/paymentPage/${reservasi.id}`}
                        className={`font-medium px-3 py-1 rounded text-white mr-1 ${
                            reservasi.status_reservasi === "Belum Dibayar" ? "bg-blue-400 hover:bg-blue-500" : "bg-gray-400 cursor-not-allowed"
                        }`}
                        disabled={reservasi.status_reservasi !== "belum dibayar"}
                    >
                        Bayar
                    </Link>
                      <button
                        onClick={() => deleteProduct(reservasi.id)}
                        className="font-medium bg-red-400 hover:bg-red-500 px-3 py-1 rounded text-white"
                      >
                        Batalkan
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Apakah anda yakin ingin menghapus data ini?
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                        </p>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className=" justify-center rounded-md border border-transparent bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModalBatal}
                        >
                          Hapus
                        </button>
                        <button
                          type="button"
                          className="ml-1 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Batal
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </div>
    </div>
  );
};

export default RiwayatTransaksiCust;