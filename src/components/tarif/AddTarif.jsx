import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import SidebarTest from "../SidebarTest";
import useSWR, { useSWRConfig } from "swr";
import Dropdown from 'react-bootstrap/Dropdown';


const AddTarif = () => {
    const [jenis_tarif, setNama] = useState("");
    const [besaran_tarif, setHarga] = useState("");
    //const [id_season, setStock] = useState("");
    const navigate = useNavigate();
    const { mutate } = useSWRConfig();
    const [seasonList, setSeasonList] = useState([{'id':'','nama_season':'', 'tanggal_mulai':'', 'tanggal_selesai':''}]);


    useEffect(() => {
        const fetcher = async () => {
            const response = await fetch("http://localhost:8000/seasons");
            const data = await response.json();
            setSeasonList(data.data);
            
        };
        fetcher();
    }, []);

    
    // const { data } = useSWR("season", fetcher);

    const saveProduct = async (e) => {
        e.preventDefault();
        console.log(SelectedValue);
        await axios.post("http://localhost:8000/tarifs", {
            jenis_tarif: jenis_tarif,
            besaran_tarif: besaran_tarif,
            id_season: Number(SelectedValue),
            
        });
        
        navigate("/tarif");
    };
    const [SelectedValue, setSelectedValue] = useState("");
    

    return (
        <div className="App flex justify-between">
            <SidebarTest />
            <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
                <h1 className="text-center font-extrabold ">Tambah Tarif</h1>
                <form onSubmit={saveProduct} className="my-10">
                    <div className="flex flex-col">
                        <div className="mb-5">
                            <label className="font-bold text-slate-700">Jenis Kamar</label>
                            <input
                                type="text"
                                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                placeholder="Jenis Kamar"
                                value={jenis_tarif}
                                onChange={(e) => setNama(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label className="font-bold text-slate-700">Besaran Tarif</label>
                            <input
                                type="number"
                                placeholder="Besaran Tarif"
                                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                value={besaran_tarif}
                                onChange={(e) => setHarga(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label className="font-bold text-slate-700">Season</label>
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                                value={SelectedValue}
                                onChange={(e) => setSelectedValue(e.target.value)}>
                                <option value="">Select Season</option>
                                {seasonList.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.nama_season}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTarif;
