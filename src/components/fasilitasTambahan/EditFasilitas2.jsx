import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Field, Form, Formik } from 'formik';
import * as yup from "yup"; // Import yup


import SidebarTest from "../SidebarTest";

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

const EditFasilitas2 = () => {
    const [name, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [stock, setStock] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', harga: '', stock: '' });

    // Define the validation schema using yup
    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .required("Name is required"),
        harga: yup
            .number()
            .typeError("Harga must be a number")
            .required("Harga is required"),
        stock: yup
            .number()
            .typeError("Stock must be a number")
            .required("Stock is required"),
    });

    useEffect(() => {
        const getProductById = async () => {
            const response = await axios.get(`http://localhost:8000/fasilitasTambahans/${id}`);
            setNama(response.data.data.nama_fasilitas);
            setHarga(response.data.data.harga);
          setStock(response.data.data.stock);
            const { nama_fasilitas, harga, stock } = response.data.data;
            setFormData({ name: nama_fasilitas, harga, stock });
        };
        getProductById();
    }, [id]);

    const updateProduct = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/fasilitasTambahans/${id}`, {
            nama_fasilitas: name,
            harga: harga,
            stock: stock,
        });
        navigate("/fasilitas");
      };
      console.log(formData);

    const formik = useFormik({
        initialValues: {
            nama_fasilitas: name,
            harga: harga,
            stock: stock,
          },
        validationSchema: validationSchema, // Apply the validation schema
        onSubmit: updateProduct,
        
    });

    const handleForm = (event) => {
        const { target } = event;
        formik.setFieldValue(target.name, target.value);
      };

    return (
        // <Formik
        //     initialValues={formData}
        //     validationSchema={validationSchema} // Apply the validation schema
        //     onSubmit={formik.handleSubmit}
        // >
        //     {(props) => (
        //         <Form>
        //             <Field name='name'>
        //                 {({ field, form }) => (
        //                     <FormControl isInvalid={form.errors.name && form.touched.name}>
        //                         <FormLabel>Name ({formData.name})</FormLabel>
        //                         <Input {...field} placeholder='Name'
        //                         onChange={handleForm}
        //                         onBlur={formik.handleBlur}
        //                         value={formik.values.name} />
        //                         <FormErrorMessage>{form.errors.name}</FormErrorMessage>
        //                     </FormControl>
        //                 )}
        //             </Field>

        //             <Field name='harga'>
        //                 {({ field, form }) => (
        //                     <FormControl isInvalid={form.errors.harga && form.touched.harga}>
        //                         <FormLabel>Harga ({formData.harga})</FormLabel>
        //                         <Input {...field} placeholder='Harga'
        //                         onChange={handleForm}
        //                         onBlur={formik.handleBlur}
        //                         value={formik.values.harga} />
        //                         <FormErrorMessage>{form.errors.harga}</FormErrorMessage>
        //                     </FormControl>
        //                 )}
        //             </Field>

        //             <Field name='stock'>
        //                 {({ field, form }) => (
        //                     <FormControl isInvalid={form.errors.stock && form.touched.stock}>
        //                         <FormLabel>Stock  ({formData.stock})</FormLabel>
        //                         <Input {...field} placeholder='Stock' 
        //                         onChange={handleForm}
        //                         onBlur={formik.handleBlur}
        //                         value={formik.values.stock}/>
        //                         <FormErrorMessage>{form.errors.stock}</FormErrorMessage>
        //                     </FormControl>
        //                 )}
        //             </Field>

        //             <Button
        //                 mt={4}
        //                 colorScheme='teal'
        //                 type='submit'
        //             >
        //                 Submit
        //             </Button>
        //         </Form>
        //     )}
        // </Formik>
    <div className='App flex justify-between'>
      
      <div className="relative w-full mx-20 my-20 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <Button className="bg-slate-600 colour" colorScheme="blackAlpha" onClick={() => navigate("/fasilitas")}>Back</Button>

        <Box padding="4" border="1px solid lightgray" borderRadius="4px" mt="8">
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing="3">
              <FormControl isInvalid={formik.errors.nama_fasilitas}>
                <FormLabel>Name ({formData.name})</FormLabel>
                <Input
                  onChange={handleForm}
                  type="text"
                  name="nama_fasilitas"
                  onBlur={formik.handleBlur}
                  value={name} />
                <FormErrorMessage>{formik.errors.nama_fasilitas}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.harga}>
                <FormLabel>Harga ({formData.harga})</FormLabel>
                <Input
                  onChange={handleForm}
                  type="number"
                  name="harga"
                  onBlur={formik.handleBlur}
                  value={harga} />
                <FormErrorMessage>{formik.errors.harga}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.stock}>
                <FormLabel>Stock  ({formData.stock})</FormLabel>
                <Input
                  onChange={handleForm}
                  type="number"
                  name="stock"
                  onBlur={formik.handleBlur}
                  value={stock} />
                <FormErrorMessage>{formik.errors.stock}</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="teal">
                Ubah Fasilitas
              </Button>
            </Stack>
          </form>
        </Box>
      </div>
    </div>
    )
}

export default EditFasilitas2;
