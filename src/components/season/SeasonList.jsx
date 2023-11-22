import React, { Fragment, useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import SidebarTest from "../SidebarTest";
import Navbar from "../Navbar";


const SeasonList = () => {
  const { mutate } = useSWRConfig();
  const [searchTerm, setSearchTerm] = useState("");
  const fetcher = async () => {
    
    const response = await axios.get('http://localhost:8000/seasons');
    return response.data.data;
  };

  const { data } = useSWR('season', fetcher);
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
//   const toISOIgnoreTimezone = (inputDate) => {
//     return inputDate.getFullYear() + "-" +  
//       ("0" + (inputDate.getMonth()+1)).slice(-2) + "-" +
//       ("0" + inputDate.getDate()).slice(-2) + "T00:00:00.000Z";
// }
  function formatDate(date) {
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    return formattedDate;
  }
  function formatDateToDateString(dateString) {
    // Create a Date object from the date string
    const date = new Date(dateString);

  // Define options for formatting the date
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

  // Format the date in "DD-MM-YYYY" format
  return date.toLocaleDateString('en-GB', options);
  }

  return (
    <div className='App flex justify-between'>
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
          <table className="w-full text-sm text-left text-gray-500">``
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="py-3 px-1 text-center">No</th>
                <th className="py-3 px-6">Nama Season</th>
                <th className="py-3 px-6">Tanggal Mulai</th>
                <th className="py-3 px-6">Tanggal Selesai</th>
                <th className="py-3 px-1 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((season, index) => (
                <tr className="bg-white border-b" key={season.id}>
                  <td className="py-3 px-1 text-center">{index + 1}</td>
                  <td className="py-3 px-6 font-medium text-gray-900">
                    {season.nama_season}
                  </td>
                  <td className="py-3 px-6">{formatDateToDateString(season.tanggal_mulai)}</td>
                  <td className="py-3 px-6">{formatDateToDateString(season.tanggal_selesai)}</td>
                  <td className="py-3 px-1 text-center">
                    <Link
                      to={`/editSeason/${season.id}`}
                      className="font-medium bg-blue-400 hover:bg-blue-500 px-3 py-1 rounded text-white mr-1"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(season.id)}
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
      </div>
    </div>
    </div>
  );
};

export default SeasonList;