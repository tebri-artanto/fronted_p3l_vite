import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-date-picker";

const AddProduct = () => {
  const [namaSeason, setName] = useState("");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    console.log(namaSeason);
    await axios.post("http://localhost:8000/seasons", {
      nama_season: String(namaSeason),
      tanggal_mulai: Date(tanggalMulai),
      tanggal_selesai: Date(tanggalSelesai),
    });
    navigate("/season");
  };


  const seasonList = [
    { title: "High Season" },
    { title: "Promo Season" },
    { title: "Normal Season" }
  ];

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <form onSubmit={saveProduct} >
        <div className="flex flex-col">
          <div className="mb-5">
            <label className="font-bold text-slate-700">Nama Season</label>
            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
              value={namaSeason}
              onChange={(e) => setName(e.target.value)}>
              <option value="">Select Season</option>
              {seasonList.map((option) => (
                <option key={option.id} value={option.title}>
                  {option.title}
                </option>
              ))}
            </select>

          </div>
          <div className="mb-5">
            <label className="font-bold text-slate-700">Tanggal Mulai</label>
            <input
              type="date"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              value={tanggalMulai}
              onChange={(e) => setTanggalMulai(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="font-bold text-slate-700">Tanggal Selesai</label>

            <input
              type="date"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              value={tanggalSelesai}
              onChange={(e) => setTanggalSelesai(e.target.value)}
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
  );
};

export default AddProduct;