import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import SidebarTest from "../SidebarTest";
import Navbar from "../Navbar";


const TarifList = () => {
    const { mutate } = useSWRConfig();
    const [searchTerm, setSearchTerm] = useState("");
    const fetcher = async () => {
        const tarifResponse = await axios.get("http://localhost:8000/tarifs");
        const seasonResponse = await axios.get("http://localhost:8000/seasons");

        const tarifs = tarifResponse.data.data;
        const seasons = seasonResponse.data.data;

        const joinedData = tarifs.map((tarif) => {
            const season = seasons.find((season) => season.id === tarif.id_season);

            return {
                ...tarif,
                season,
            };
        });

        return joinedData;
    };


    const { data } = useSWR("tarif", fetcher);
    if (!data) return <h2>Loading...</h2>;

    const filteredData = data.filter((tarif) => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            tarif.jenis_tarif.toLowerCase().includes(searchTermLower) ||
            tarif.besaran_tarif.toString().includes(searchTermLower) ||
            tarif.season.nama_season.toLowerCase().includes(searchTermLower)

        );
    });

    const deleteProduct = async (tarifId) => {
        if (!window.confirm("Are you sure?")) return;
        await axios.delete(`http://localhost:8000/tarifs/${tarifId}`);
        mutate("tarif");
    };

    return (
        <div className='App flex justify-between'>
            <SidebarTest />
            <div className="w-screen ">
                <Navbar />
                <div className="w-full p-10">
                    <h1 className="text-3xl font-semibold text-gray-900 pb-10">Tarif</h1>
                    <Link
                        to="/addTarif"
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
                                    <th className="py-3 px-6">Jenis Tarif</th>
                                    <th className="py-3 px-6">Besaran Tarif</th>
                                    <th className="py-3 px-6">Season</th>
                                    <th className="py-3 px-1 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((tarif, index) => (
                                    <tr className="bg-white border-b" key={tarif.id}>
                                        <td className="py-3 px-1 text-center">{index + 1}</td>
                                        <td className="py-3 px-6 font-medium text-gray-900">
                                            {tarif.jenis_tarif}
                                        </td>
                                        <td className="py-3 px-6">{tarif.besaran_tarif}</td>
                                        <td className="py-3 px-6">{tarif.season.nama_season}</td>
                                        <td className="py-3 px-1 text-center">
                                            <Link
                                                to={`/edittarif/${tarif.id}`}
                                                className="font-medium bg-blue-400 hover:bg-blue-500 px-3 py-1 rounded text-white mr-1"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => deleteProduct(tarif.id)}
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

export default TarifList;