import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import SidebarTest from "../SidebarTest";
import Navbar from "../Navbar";


const KamarList = () => {
    const { mutate } = useSWRConfig();
    const [searchTerm, setSearchTerm] = useState("");
    
    // const fetcher = async () => {
    //     const tarifResponse = await axios.get("http://localhost:8000/tarifs");
    //     const seasonResponse = await axios.get("http://localhost:8000/seasons");
    //     const kamarResponse = await axios.get("http://localhost:8000/kamars");

    //     const tarifs = tarifResponse.data.data;
    //     const seasons = seasonResponse.data.data;
    //     const kamars = kamarResponse.data.data;

    //     const joinedData = kamars.map((kamar) => {
    //         // const season = seasons.find((season) => season.id === tarif.id_season);
    //         const tarif = tarifs.find((tarif) => tarif.id === kamar.id_tarif);

    //         return {
    //             ...kamar,
    //             tarif,
    //             // season,
    //         };
    //     });

    //     return joinedData;
    // };

    const fetcher = async () => {
        try {
          // Fetch data from the kamar table
          const kamarResponse = await axios.get("http://localhost:8000/kamars");
          const kamars = kamarResponse.data.data;
      
          // Fetch related data from the tarif and season tables for each kamar
          const joinedData = await Promise.all(
            kamars.map(async (kamar) => {
              // Fetch the related tarif record
              const tarifResponse = await axios.get(
                `http://localhost:8000/tarifs/${kamar.id_tarif}`
              );
              const tarif = tarifResponse.data.data;
      
              // Fetch the related season record
              const seasonResponse = await axios.get(
                `http://localhost:8000/seasons/${tarif.id_season}`
              );
              const season = seasonResponse.data.data;
      
              return {
                ...kamar,
                tarif,
                season,
              };
            })
          );
      
          return joinedData;
        } catch (error) {
          // Handle errors here
          console.error("Error fetching data:", error);
          throw error;
        }
      };
      
      

    const { data } = useSWR("kamar", fetcher);
    if (!data) return <h2>Loading...</h2>;
    
    const filteredData = data.filter((kamar) => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            kamar.no_kamar.toLowerCase().includes(searchTermLower) ||
            kamar.jenis_kamar.toLowerCase().includes(searchTermLower) ||
            kamar.kapasitas.toString().includes(searchTermLower) ||
            kamar.jenis_bed.toLowerCase().includes(searchTermLower) ||
            kamar.luas_kamar.toString().includes(searchTermLower) ||
            kamar.fasilitas.toLowerCase().includes(searchTermLower) ||
            kamar.tarif.besaran_tarif.toString().includes(searchTermLower) ||
            kamar.season.nama_season.toLowerCase().includes(searchTermLower)

        );
      });



    const deleteProduct = async (kamarId) => {
        if (!window.confirm("Are you sure?")) return;
        await axios.delete(`http://localhost:8000/kamars/${kamarId}`);
        mutate("kamar");
    };

    return (
        <div className='App flex justify-between'>
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
                    <div className="relative shadow rounded-lg mt-3">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                <tr>
                                    <th className="py-3 px-1 text-center">No</th>
                                    <th className="py-3 px-6">No Kamar</th>
                                    <th className="py-3 px-6">Jenis Kamar</th>
                                    <th className="py-3 px-6">Kapasitas</th>
                                    <th className="py-3 px-6">Jenis Bed</th>
                                    <th className="py-3 px-6">Luas</th>
                                    <th className="py-3 px-1">Fasilitas</th>
                                    <th className="py-3 px-6">Status ketersediaan</th>
                                    <th className="py-3 px-6">Harga</th>
                                    <th className="py-3 px-6">Season</th>
                                    <th className="py-3 px-1 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.slice().map((kamar, index) => (
                                    <tr className="bg-white border-b" key={kamar.id}>
                                        <td className="py-3 px-1 text-center">{index + 1}</td>
                                        <td className="py-3 px-6 font-medium text-gray-900">
                                            {kamar.no_kamar}
                                        </td>
                                        <td className="py-3 px-6">{kamar.jenis_kamar}</td>
                                        <td className="py-3 px-6">{kamar.kapasitas}</td>
                                        <td className="py-3 px-6">{kamar.jenis_bed}</td>
                                        <td className="py-3 px-6">{kamar.luas_kamar}</td>
                                        <td className="py-3 px-1">{kamar.fasilitas}</td>
                                        <td className="py-3 px-6">
                                            {kamar.status_ketersediaan}</td>
                                        <td className="py-3 px-6">{kamar.tarif.besaran_tarif}</td>
                                        <td className="py-3 px-6">{kamar.season.nama_season}</td>
                                        
                                        <td className="py-3 px-1 text-center">
                                            <Link
                                                to={`/editkamar/${kamar.id}`}
                                                className="font-medium bg-blue-400 hover:bg-blue-500 px-3 py-1 rounded text-white mr-1"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => deleteProduct(kamar.id)}
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

export default KamarList;