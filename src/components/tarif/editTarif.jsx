import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditTarif = () => {
  const [jenis_tarif, setJenis] = useState("");
  const [besaran_tarif, setBesaran] = useState("");
  const [SelectedValue, setSelectedValue] = useState("");
  const [seasonList, setSeasonList] = useState([{ 'id': '', 'nama_season': '', 'tanggal_mulai': '', 'tanggal_selesai': '' }]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      const response = await axios.get(`http://localhost:8000/tarifs/${id}`);
      setJenis(response.data.data.jenis_tarif);
      setBesaran(response.data.data.besaran_tarif);
      setSelectedValue(response.data.data.id_season);
    };
    getProductById();
  }, [id]);
  useEffect(() => {
    const fetcher = async () => {
      const response = await fetch("http://localhost:8000/seasons");
      const data = await response.json();
      setSeasonList(data.data);

    };
    fetcher();
  }, []);
  const updateProduct = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/tarifs/${id}`, {
      jenis_tarif: jenis_tarif,
      besaran_tarif: besaran_tarif,
      id_season: Number(SelectedValue),
    });
    navigate("/tarif");
  };

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <form onSubmit={updateProduct} className="my-10">
        <div className="flex flex-col">
          <div className="mb-5">
            <label className="font-bold text-slate-700">Jenis Kamar</label>
            <input
              type="text"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Product Name"
              value={jenis_tarif}
              onChange={(e) => setJenis(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="font-bold text-slate-700">Besaran Tarif</label>
            <input
              type="number"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Price"
              value={besaran_tarif}
              onChange={(e) => setBesaran(e.target.value)}
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTarif;