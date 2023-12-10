import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import SidebarTest from "../SidebarTest";
import useSWR, { useSWRConfig } from "swr";
import Dropdown from 'react-bootstrap/Dropdown';


const EditKamar = () => {
    const [no_kamar, setNama] = useState("");
    const [kapasitas, setHarga] = useState("");
    const [jenis_kamar, setJenis] = useState("");
    const [jenis_bed, setBed] = useState("");
    const [luas_kamar, setLuas] = useState("");
    const [fasilitas, setFasilitas] = useState("");
    const [status_ketersediaan, setStatus] = useState("");
    const [SelectedValue, setSelectedValue] = useState("");

    //const [id_season, setStock] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const [seasonList, setSeasonList] = useState([{'id':'','nama_season':'', 'tanggal_mulai':'', 'tanggal_selesai':''}]);
    const [tarifList, setTarifList] = useState([{'id':'','jenis_tarif':'', 'besaran_tarif':'', 'id_season':'', 'nama_season':'', 'tanggal_mulai':'', 'tanggal_selesai':''}]);

    useEffect(() => {
        const getKamarById = async () => {
            const response = await axios.get(`http://localhost:8000/kamars/${id}`);
            setNama(response.data.data.no_kamar);
            setJenis(response.data.data.jenis_kamar);
            setHarga(response.data.data.kapasitas);
            setBed(response.data.data.jenis_bed);
            setLuas(response.data.data.luas_kamar);
            setFasilitas(response.data.data.fasilitas);
            setStatus(response.data.data.status_ketersediaan);
        };
        getKamarById();
    }, [id]);

    

    

    const updateProduct = async (e) => {
        e.preventDefault();
        console.log(SelectedValue);
        await axios.put(`http://localhost:8000/kamars/${id}`, {
            no_kamar: no_kamar,
            jenis_kamar: jenis_kamar,
            kapasitas: kapasitas,
            jenis_bed: jenis_bed,
            luas_kamar: luas_kamar,
            fasilitas: fasilitas,
            status_ketersediaan: status_ketersediaan,
        });
        
        navigate("/kamar");
    };
    
    

    return (
        <div className="App flex justify-between">
           
            <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
                <h1 className="text-center font-extrabold ">Edit Kamar</h1>
                <form onSubmit={updateProduct} className="my-10">
                    <div className="flex flex-col">
                    <div className="mb-5">
                            <label className="font-bold text-slate-700">No Kamar</label>
                            <input
                                type="text"
                                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                placeholder="No Kamar"
                                value={no_kamar}
                                onChange={(e) => setNama(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label className="font-bold text-slate-700">Jenis Kamar</label>
                            <input
                                type="text"
                                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                placeholder="Jenis Kamar"
                                value={jenis_kamar}
                                onChange={(e) => setJenis(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label className="font-bold text-slate-700">Kapasitas</label>
                            <input
                                type="number"
                                placeholder="Kapasitas"
                                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                value={kapasitas}
                                onChange={(e) => setHarga(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label className="font-bold text-slate-700">Jenis Bed</label>
                            <input
                                type="text"
                                placeholder="Jenis Bed"
                                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                value={jenis_bed}
                                onChange={(e) => setBed(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label className="font-bold text-slate-700">Luas Kamar</label>
                            <input
                                type="text"
                                placeholder="Luas Kamar"
                                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                value={luas_kamar}
                                onChange={(e) => setLuas(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label className="font-bold text-slate-700">Fasilitas</label>
                            <input
                                type="text"
                                placeholder="Fasilitas"
                                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                value={fasilitas}
                                onChange={(e) => setFasilitas(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label className="font-bold text-slate-700">Status Ketersediaan</label>
                            <input
                                type="text"
                                placeholder="Status Ketersediaan"
                                className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                value={status_ketersediaan}
                                onChange={(e) => setStatus(e.target.value)}
                            />
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

export default EditKamar;
