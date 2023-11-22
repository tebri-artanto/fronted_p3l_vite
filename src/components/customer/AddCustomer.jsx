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
} from "@chakra-ui/react";

const AddCustomer = () => {
  // const [nama, setNama] = useState("");
  // const [no_identitas, setHarga] = useState("");
  // const [no_telp, setStock] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (values) => {
    try {
      await axios.post("http://localhost:8000/customers/group", values);
      navigate("/customerList");
    } catch (error) {
      // Handle error as needed
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      nama: '',
      no_identitas: '',
      no_telp: '',
      email: '',
      alamat: '',
      nama_institusi:'',

    },
    onSubmit: saveProduct,
    validationSchema: yup.object().shape({
      nama: yup.string().required('Please enter your name'),
      no_identitas: yup.string().required('Please enter your identity number'),
      no_telp: yup.string().required('Please enter your phone number'),
      email: yup.string().required('Please enter your email'),
      alamat: yup.string().required('Please enter your address'),
        nama_institusi: yup.string().required('Please enter your institution name')
    })
  });

  const handleForm = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  return (
    <div className='App flex justify-between'>
      <SidebarTest />
      <div className="relative w-full mx-20 my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <div className="flex "> <Button className="bg-slate-600 colour" colorScheme="blackAlpha" onClick={() => navigate("/customerList")}>Back</Button>
        <Heading  paddingLeft="5">Tambah Customer Grup </Heading></div>
        
        <Box padding="4" border="1px solid lightgray" borderRadius="4px" mt="8">
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing="3">
              <FormControl isInvalid={formik.errors.nama}>
                <FormLabel>Nama</FormLabel>
                <Input
                  onChange={handleForm}
                  type="text"
                  name="nama"
                  onBlur={formik.handleBlur}
                  value={formik.values.nama} />
                <FormErrorMessage>{formik.errors.nama}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.no_identitas}>
                <FormLabel>No Identitas</FormLabel>
                <Input
                  onChange={handleForm}
                  type="text"
                  name="no_identitas"
                  onBlur={formik.handleBlur}
                  value={formik.values.no_identitas} />
                <FormErrorMessage>{formik.errors.no_identitas}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.no_telp}>
                <FormLabel>No Telpone</FormLabel>
                <Input
                  onChange={handleForm}
                  type="text"
                  name="no_telp"
                  onBlur={formik.handleBlur}
                  value={formik.values.no_telp} />
                <FormErrorMessage>{formik.errors.no_telp}</FormErrorMessage>
              </FormControl>
                <FormControl isInvalid={formik.errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                    onChange={handleForm}
                    type="email"
                    name="email"
                    onBlur={formik.handleBlur}
                    value={formik.values.email} />
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={formik.errors.alamat}>
                    <FormLabel>Alamat</FormLabel>
                    <Input
                    onChange={handleForm}
                    type="text"
                    name="alamat"
                    onBlur={formik.handleBlur}
                    value={formik.values.alamat} />
                    <FormErrorMessage>{formik.errors.alamat}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={formik.errors.nama_institusi}>
                    <FormLabel>Nama Institusi</FormLabel>
                    <Input
                    onChange={handleForm}
                    type="text"
                    name="nama_institusi"
                    onBlur={formik.handleBlur}
                    value={formik.values.nama_institusi} />
                    <FormErrorMessage>{formik.errors.nama_institusi}</FormErrorMessage>
                </FormControl>

              <Button type="submit" colorScheme="teal">
                Tambah Customer
              </Button>
            </Stack>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default AddCustomer;