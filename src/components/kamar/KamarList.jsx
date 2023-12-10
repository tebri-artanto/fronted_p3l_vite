import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import SidebarTest from "../SidebarTest";
import Navbar from "../Navbar";
import { Spinner } from "@chakra-ui/react";
import {
  Table as NextTable,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";

const KamarList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const [searchTerm, setSearchTerm] = useState("");
  const [kamar, setKamar] = useState([]);

  const APP_URL = import.meta.env.VITE_API_HOSTING;

  useEffect(() => {
    const fetcher = async () => {
      try {
        setIsLoading(true);
        const kamarResponse = await axios.get(`${APP_URL}/kamars`);
        const kamars = kamarResponse.data.data;
        setKamar(kamars);
        setIsLoading(false);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
        throw error;
      }
    };
    fetcher();
  }, []);

  const filteredData = kamar.filter((kamar) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      kamar.no_kamar.toLowerCase().includes(searchTermLower) ||
      kamar.jenis_kamar.toLowerCase().includes(searchTermLower) ||
      kamar.kapasitas.toString().includes(searchTermLower) ||
      kamar.jenis_bed.toLowerCase().includes(searchTermLower) ||
      kamar.luas_kamar.toString().includes(searchTermLower) ||
      kamar.fasilitas.toLowerCase().includes(searchTermLower)
    );
  });

  const deleteProduct = async (kamarId) => {
    if (!window.confirm("Are you sure?")) return;
    await axios.delete(`${APP_URL}/kamars/${kamarId}`);
    mutate("kamar");
  };

  return (
    <div className="App flex justify-between">
      <SidebarTest />
      <div className="w-screen ">
        <Navbar />
        <div className="w-full p-10">
          <h1 className="text-3xl font-semibold text-gray-900 pb-10">Kamar</h1>
          <Link
            to="/addKamar"
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
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="relative shadow rounded-lg mt-3">
              <NextTable
                isHeaderSticky
                responsive
                classNames={{
                  wrapper: "max-h-[480px]",
                }}
              >
                <TableHeader>
                  <TableColumn className="py-3 px-1 text-center">
                    No
                  </TableColumn>
                  <TableColumn className="py-3 px-6">No Kamar</TableColumn>
                  <TableColumn className="py-3 px-6">Jenis Kamar</TableColumn>
                  <TableColumn className="py-3 px-6">Kapasitas</TableColumn>
                  <TableColumn className="py-3 px-6">Jenis Bed</TableColumn>
                  <TableColumn className="py-3 px-6">Luas</TableColumn>
                  <TableColumn className="py-3 px-1">Fasilitas</TableColumn>
                  <TableColumn className="py-3 px-6">
                    Status ketersediaan
                  </TableColumn>
                  <TableColumn className="py-3 px-1 text-center">
                    Action
                  </TableColumn>
                </TableHeader>
                <TableBody>
                  {filteredData.slice().map((kamar, index) => (
                    <TableRow className="bg-white border-b" key={kamar.id}>
                      <TableCell className="py-3 px-1 text-center">
                        {index + 1}
                      </TableCell>
                      <TableCell className="py-3 px-6 font-medium text-gray-900">
                        {kamar.no_kamar}
                      </TableCell>
                      <TableCell className="py-3 px-6">
                        {kamar.jenis_kamar}
                      </TableCell>
                      <TableCell className="py-3 px-6">
                        {kamar.kapasitas}
                      </TableCell>
                      <TableCell className="py-3 px-6">
                        {kamar.jenis_bed}
                      </TableCell>
                      <TableCell className="py-3 px-6">
                        {kamar.luas_kamar}
                      </TableCell>
                      <TableCell className="py-3 px-1">
                        {kamar.fasilitas}
                      </TableCell>
                      <TableCell className="py-3 px-6">
                        {kamar.status_ketersediaan}
                      </TableCell>
                      <TableCell className="py-3 px-1 text-center">
                        <Link
                          to={`/editkamar/${kamar.id}`}
                          className="font-medium bg-blue-400 hover:bg-blue-500 px-3 py-1 rounded text-white mr-1"
                        >
                          Edit
                        </Link>
                        <Button
                          size="sm"
                          radius="sm"
                          onClick={() => deleteProduct(kamar.id)}
                          className="font-medium bg-red-400 hover:bg-red-500 px-3 py-1  text-white"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </NextTable>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KamarList;
