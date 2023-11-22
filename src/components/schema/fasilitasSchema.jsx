import * as yup from "yup";


export const fasilitasSchema = yup.object().shape({
  nama_fasilitas: yup.string().required("Required"),
  harga: yup.number().positive().integer().required("Required"),
  stock: yup.number().positive().integer().required("Required"),
});