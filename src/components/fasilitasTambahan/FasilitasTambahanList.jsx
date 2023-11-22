import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import SidebarTest from "../SidebarTest";
import Navbar from "../Navbar";
import { Dialog, Transition } from '@headlessui/react'


const FasilitasTambahanList = () => {
  const { mutate } = useSWRConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const fetcher = async () => {
    const response = await axios.get("http://localhost:8000/fasilitasTambahans");
    return response.data.data;
  };

  const { data } = useSWR("fasilitasTambahan", fetcher);
  if (!data) return <h2>Loading...</h2>;

  const filteredData = data.filter((fasilitasTambahan) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      fasilitasTambahan.nama_fasilitas.toLowerCase().includes(searchTermLower) ||
      fasilitasTambahan.harga.toString().includes(searchTermLower) ||
      fasilitasTambahan.stock.toString().includes(searchTermLower)
    );
  });

  const deleteProduct = async (fasilitasTambahanId) => {
    openModal();
    if (!window.confirm("Are you sure?")) return;
    await axios.delete(`http://localhost:8000/fasilitasTambahans/${fasilitasTambahanId}`);
    mutate("fasilitasTambahan");
  };
  function closeModal() {
    setIsOpen(false)
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
          <h1 className="text-3xl font-semibold text-gray-900 pb-10">Fasilitas Tambahan</h1>
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
                  <th className="py-3 px-6">Product Name</th>
                  <th className="py-3 px-6">Price</th>
                  <th className="py-3 px-6">Stock</th>
                  <th className="py-3 px-1 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((fasilitasTambahan, index) => (
                  <tr className="bg-white border-b" key={fasilitasTambahan.id}>
                    <td className="py-3 px-1 text-center">{index + 1}</td>
                    <td className="py-3 px-6 font-medium text-gray-900">
                      {fasilitasTambahan.nama_fasilitas}
                    </td>
                    <td className="py-3 px-6">{fasilitasTambahan.harga}</td>
                    <td className="py-3 px-6">{fasilitasTambahan.stock}</td>
                    <td className="py-3 px-1 text-center">
                      <Link
                        to={`/editfasilitas/${fasilitasTambahan.id}`}
                        className="font-medium bg-blue-400 hover:bg-blue-500 px-3 py-1 rounded text-white mr-1"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteProduct(fasilitasTambahan.id)}
                        className="font-medium bg-red-400 hover:bg-red-500 px-3 py-1 rounded text-white"
                      >
                        Delete
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
                          onClick={closeModal}
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

export default FasilitasTambahanList;