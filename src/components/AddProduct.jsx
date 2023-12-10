import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputRightElement,
  InputGroup,
  Stack,
  Link,
  useToast,
} from "@chakra-ui/react";

const AddProduct = () => {
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

  const saveProduct = async (values) => {
    try {
      const response = await axios.post(`${API_URL}/seasons`, {
        nama_season: values.nama_season,
        jenis_season: values.jenisSeason,
        tanggal_mulai: values.tanggalMulai,
        tanggal_selesai: values.tanggalSelesai,
      });
      console.log(response);
      SuccessToast("Success", "Season saved successfully");
      navigate("/season");
    } catch (error) {
      console.log(error);
      ErrorToast("Error", "Failed to save season");
    }
  };

  const seasonList = [
    { title: "High Season" },
    { title: "Promo Season" },
    { title: "Normal Season" },
  ];

  const formik = useFormik({
    initialValues: {
      nama_season: "",
      jenisSeason: "",
      tanggalMulai: "",
      tanggalSelesai: "",
    },
    validationSchema: yup.object().shape({
      nama_season: yup.string().required("Please enter the season name"),
      jenisSeason: yup.string().required("Please select the season type"),
      tanggalMulai: yup.string().required("Please enter the start date"),
      tanggalSelesai: yup.string().required("Please enter the end date"),
    }),
    onSubmit: saveProduct,
  });

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4}>
          <FormControl
            id="nama_season"
            isInvalid={formik.errors.nama_season && formik.touched.nama_season}
          >
            <FormLabel>Nama Season</FormLabel>
            <Input
              type="text"
              {...formik.getFieldProps("nama_season")}
              placeholder="Enter season name"
            />
            <FormErrorMessage>{formik.errors.nama_season}</FormErrorMessage>
          </FormControl>

          <FormControl
            id="jenisSeason"
            isInvalid={formik.errors.jenisSeason && formik.touched.jenisSeason}
          >
            <FormLabel>Jenis Season</FormLabel>
            <Input
              as="select"
              {...formik.getFieldProps("jenisSeason")}
              placeholder="Select season type"
            >
              <option value="">Select Season</option>
              {seasonList.map((option) => (
                <option key={option.title} value={option.title}>
                  {option.title}
                </option>
              ))}
            </Input>
            <FormErrorMessage>{formik.errors.jenisSeason}</FormErrorMessage>
          </FormControl>

          <FormControl
            id="tanggalMulai"
            isInvalid={formik.errors.tanggalMulai && formik.touched.tanggalMulai}
          >
            <FormLabel>Tanggal Mulai</FormLabel>
            <Input
              type="date"
              {...formik.getFieldProps("tanggalMulai")}
              placeholder="Select start date"
            />
            <FormErrorMessage>{formik.errors.tanggalMulai}</FormErrorMessage>
          </FormControl>

          <FormControl
            id="tanggalSelesai"
            isInvalid={formik.errors.tanggalSelesai && formik.touched.tanggalSelesai}
          >
            <FormLabel>Tanggal Selesai</FormLabel>
            <Input
              type="date"
              {...formik.getFieldProps("tanggalSelesai")}
              placeholder="Select end date"
            />
            <FormErrorMessage>{formik.errors.tanggalSelesai}</FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            isLoading={formik.isSubmitting}
          >
            Save
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default AddProduct;