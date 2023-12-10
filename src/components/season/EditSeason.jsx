import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Editable,
  EditablePreview,
  EditableInput,
  useToast,

} from "@chakra-ui/react";

const EditSeason = () => {
  const toast = useToast();
  const SuccessToast = (title, description) => {
    toast({
      title: title,
      description: description,
      status: "success",
      duration: 3000,
      position: "top",
      variant: "subtle",
      isClosable: true,
    });
  };
  const ErrorToast = (title, description) => {
    toast({
      title: title,
      description: description,
      status: "error",
      duration: 3000,
      position: "top",
      variant: "subtle",
      isClosable: true,
    });
  };
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_HOSTING;
  const { id } = useParams();
  const [season, setSeason] = useState(null);
  function formatDateToDateString(dateString) {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  }

  useEffect(() => {
    axios.get(`${API_URL}/seasons/${id}`)
      .then((response) => {
        const { nama_season, jenis_season, tanggal_mulai, tanggal_selesai } = response.data.data;
        setSeason({ nama_season, jenis_season, tanggal_mulai, tanggal_selesai });
        console.log(response);
        console.log(season);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [API_URL,id, season]);

  const updateSeason= async (values) => {
    console.log(values);
    try {
      
      await axios.put(`${API_URL}/seasons/${id}`, values);
      SuccessToast("Success", "Season updated successfully");
      navigate("/season");
    } catch (error) {
      ErrorToast("Error", "Failed to update season");
      console.error(error);
    }
  };


  const formik = useFormik({
    initialValues: season || {
      nama_season: "",
      jenis_season: "",
      tanggal_mulai: "",
      tanggal_selesai: "",
    },
    onSubmit: updateSeason,
    validationSchema: yup.object().shape({
      nama_season: yup.string().required("Please enter the season name"),
      jenis_season: yup.string().required("Please select the season type"),
      tanggal_mulai: yup.string().required("Please enter the start date"),
      tanggal_selesai: yup.string().required("Please enter the end date"),
    }),
    enableReinitialize: true,
  });

  const handleForm = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  const seasonList = [
    { title: "High Season" },
    { title: "Promo Season" },
    { title: "Normal Season" },
  ];

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <form onSubmit={formik.handleSubmit} className="my-10">
        <div className="flex flex-col">
          <div className="mb-5">
            <FormControl isInvalid={formik.errors.nama_season}>
            <FormLabel className="font-bold text-slate-700">Nama Season</FormLabel>
            <Input
            onChange={formik.handleChange}
              type="text"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Nama Season"
              name="nama_season"
              onBlur={formik.handleBlur}
              value={formik.values.nama_season}
              
            />
              <FormErrorMessage>{formik.errors.nama_season}</FormErrorMessage>
          </FormControl>
          </div>
          <FormControl
            isInvalid={formik.errors.jenis_season && formik.touched.jenis_season}
          >
            <FormLabel>Jenis Season</FormLabel>
            <Input
            onChange={handleForm}
            name="jenis_season"
            onBlur={formik.handleBlur}
            value={formik.values.jenis_season}
              as="select"
              placeholder="Select season type"
            >
              <option value="">Select Season</option>
              {seasonList.map((option) => (
                <option key={option.title} value={option.title}>
                  {option.title}
                </option>
              ))}
            </Input>
            <FormErrorMessage>{formik.errors.jenis_season}</FormErrorMessage>
          </FormControl>
          <div className="mb-5">
            <FormLabel className="font-bold text-slate-700">Tanggal Mulai</FormLabel>
            <Input
              type="date"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              value={formik.values.tanggal_mulai}
              onChange={formik.handleChange}
              name="tanggal_mulai"
              onBlur={formik.handleBlur}
            />
            {formik.touched.tanggal_mulai && formik.errors.tanggal_mulai && (
              <FormErrorMessage>{formik.errors.tanggal_mulai}</FormErrorMessage>
            )}
          </div>
          <div className="mb-5">
            <FormControl isInvalid={formik.errors.tanggal_selesai}>
            <FormLabel className="font-bold text-slate-700">Tanggal Selesai</FormLabel>
            <Input
            onChange={handleForm}
              type="date"
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              onBlur={formik.handleBlur}
              name="tanggal_selesai"
              value={formik.values.tanggal_selesai}
              
              
            />
              <FormErrorMessage>{formik.errors.tanggal_selesai}</FormErrorMessage>
          </FormControl>
          </div>
          <Button
            type="submit"
            className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};


export default EditSeason;