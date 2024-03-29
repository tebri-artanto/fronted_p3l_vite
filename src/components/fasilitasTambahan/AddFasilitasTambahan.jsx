import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import SidebarTest from "../SidebarTest";
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
      await axios.post(`${API_URL}/fasilitasTambahans`, values);
      SuccessToast("Success", "Fasilitas saved successfully");
      navigate("/fasilitas");
    } catch (error) {
      ErrorToast("Error", "Failed to save fasilitas");
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      nama_fasilitas: "",
      harga: "",
      stock: "",
    },
    onSubmit: saveProduct,
    validationSchema: yup.object().shape({
      nama_fasilitas: yup.string().required("Required"),
      harga: yup.number().positive().integer().required("Required"),
      stock: yup.number().positive().integer().required("Required"),
    }),
  });

  const handleForm = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  return (
    <div className='App flex justify-between'>
      <SidebarTest />
      <div className="relative w-full mx-20 my-20 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <Button className="bg-slate-600 colour" colorScheme="blackAlpha" onClick={() => navigate("/fasilitas")}>Back</Button>
        <Heading mb="4">Tambah Fasilitas</Heading>
        <Box padding="4" border="1px solid lightgray" borderRadius="4px" mt="8">
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing="3">
              <FormControl isInvalid={formik.errors.nama_fasilitas}>
                <FormLabel>Nama Fasilitas</FormLabel>
                <Input
                  onChange={handleForm}
                  type="text"
                  name="nama_fasilitas"
                  onBlur={formik.handleBlur}
                  value={formik.values.nama_fasilitas} />
                <FormErrorMessage>{formik.errors.nama_fasilitas}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.harga}>
                <FormLabel>Harga</FormLabel>
                <Input
                  onChange={handleForm}
                  type="number"
                  name="harga"
                  onBlur={formik.handleBlur}
                  value={formik.values.harga} />
                <FormErrorMessage>{formik.errors.harga}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.stock}>
                <FormLabel>Stock</FormLabel>
                <Input
                  onChange={handleForm}
                  type="number"
                  name="stock"
                  onBlur={formik.handleBlur}
                  value={formik.values.stock} />
                <FormErrorMessage>{formik.errors.stock}</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="teal">
                Tambah Fasilitas
              </Button>
            </Stack>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default AddProduct;