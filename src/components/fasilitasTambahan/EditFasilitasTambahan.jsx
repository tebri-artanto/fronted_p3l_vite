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

} from "@chakra-ui/react";

const EditFasilitasTambahan = () => {
  const [nama_fasilitas, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [stock, setStock] = useState("");
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    axios.get(`http://localhost:8000/fasilitasTambahans/${id}`)
      .then((response) => {
        const { nama_fasilitas, harga, stock } = response.data.data;
        setProduct({ nama_fasilitas, harga, stock });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const updateProduct = async (values) => {
    try {
      await axios.put(`http://localhost:8000/fasilitasTambahans/${id}`, values);
      navigate("/fasilitas");
    } catch (error) {
      // Handle error as needed
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: product || {
      nama_fasilitas: nama_fasilitas,
      harga: harga,
      stock: stock,
    },
    onSubmit: updateProduct,
    validationSchema: yup.object().shape({
      nama_fasilitas: yup.string().required("Required"),
      harga: yup.number().positive().integer().required("Required"),
      stock: yup.number().positive().integer().required("Required"),
    }),
    enableReinitialize: true,
  });

  const handleForm = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      

      <Box padding="4" border="1px solid lightgray" borderRadius="4px" mt="8">
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing="3">
              <FormControl isInvalid={formik.errors.nama_fasilitas}>
                <FormLabel>nama_fasilitas</FormLabel>
                <Input
                   onChange={formik.handleChange}
                  type="text"
                  name="nama_fasilitas"
                  onBlur={formik.handleBlur}
                  value={formik.values.nama_fasilitas} />
                <FormErrorMessage>{formik.errors.nama_fasilitas}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.harga}>
                <FormLabel>harga</FormLabel>
                <Input
                  onChange={handleForm}
                  type="number"
                  name="harga"
                  onBlur={formik.handleBlur}
                  value={formik.values.harga} />
                <FormErrorMessage>{formik.errors.harga}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.stock}>
                <FormLabel>Password</FormLabel>
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
    
  );
};

export default EditFasilitasTambahan;