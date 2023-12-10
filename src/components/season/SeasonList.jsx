import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import SidebarTest from "../SidebarTest";
import Navbar from "../Navbar";
import {
  Table as NextTable,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";

const SeasonList = () => {
  const { mutate } = useSWRConfig();
  const [searchTerm, setSearchTerm] = useState("");
  const fetcher = async () => {
    const response = await axios.get("http://localhost:8000/seasons");
    return response.data.data;
  };

  const { data } = useSWR("season", fetcher);
  console.log(data);
  if (!data) return <h2>Loading...</h2>;
  const filteredData = data.filter((season) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      season.nama_season.toLowerCase().includes(searchTermLower) ||
      season.tanggal_mulai.toString().includes(searchTermLower) ||
      season.tanggal_selesai.toString().includes(searchTermLower)
    );
  });

  const deleteProduct = async (seasonId) => {
    if (!window.confirm("Are you sure?")) return;
    await axios.delete(`http://localhost:8000/seasons/${seasonId}`);
    mutate("season");
  };

  function formatDateToDateString(dateString) {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  }

  return (
    <div className="App flex justify-between">
      <SidebarTest />

      <div className="w-screen">
        <Navbar />
        <div className="w-full p-10">
          <h1 className="text-3xl font-semibold text-gray-900 pb-10">Season</h1>

          <Link
            to="/addSeason"
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
            <NextTable
              isHeaderSticky
              responsive
              classNames={{
                wrapper: "max-h-[480px]",
              }}
            >
              <TableHeader>
                <TableColumn className="py-3 px-1 text-center">No</TableColumn>
                <TableColumn className="py-3 px-6">Nama Season</TableColumn>
                <TableColumn className="py-3 px-6">Jenis Season</TableColumn>
                <TableColumn className="py-3 px-6">Tanggal Mulai</TableColumn>
                <TableColumn className="py-3 px-6">Tanggal Selesai</TableColumn>
                <TableColumn className="py-3 px-1 text-center">
                  Action
                </TableColumn>
              </TableHeader>
              <TableBody>
                {filteredData.map((season, index) => (
                  <TableRow className="bg-white border-b" key={season.id}>
                    <TableCell className="py-3 px-1 text-center">
                      {index + 1}
                    </TableCell>
                    <TableCell className="py-3 px-6 font-medium text-gray-900">
                      {season.nama_season}
                    </TableCell>
                    <TableCell className="py-3 px-6 font-medium text-gray-900">
                      {season.jenis_season}
                    </TableCell>
                    <TableCell className="py-3 px-6">
                      {formatDateToDateString(season.tanggal_mulai)}
                    </TableCell>
                    <TableCell className="py-3 px-6">
                      {formatDateToDateString(season.tanggal_selesai)}
                    </TableCell>
                    <TableCell className="py-3 px-1 text-center">
                      <Link
                        to={`/editSeason/${season.id}`}
                        className="font-medium bg-blue-400 hover:bg-blue-500 px-3 py-1 rounded text-white mr-1"
                      >
                        Edit
                      </Link>
                      <Button
                        size="sm"
                        radius="sm"
                        onClick={() => deleteProduct(season.id)}
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
        </div>
      </div>
    </div>
  );
};

export default SeasonList;
