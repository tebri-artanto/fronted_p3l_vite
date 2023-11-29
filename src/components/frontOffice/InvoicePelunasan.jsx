import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import SidebarTest from "../SidebarTest";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";
import PrintableInvoice from "./PrintableInvoice";
import {
  Button,
  Center,
} from "@chakra-ui/react";

import { ArrowBackIcon } from "@chakra-ui/icons";

const InvoicePelunasan = () => {
      const navigate = useNavigate();
  const { id } = useParams();
  const [invoices, setInvoices] = useState([id]);
  const [reservasi, setReservasi] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [transaksiFasilitas, setTransaksiFasilitas] = useState([]);
  const [transaksiKamars, setTransaksiKamars] = useState([]);



  useEffect(() => {
    const getInvociebyId = async () => {
      const response = await axios.get(`http://localhost:8000/invoices/${id}`);
      setInvoices(response.data.data);
      console.log(response.data.data);
    };
    getInvociebyId();
  }, [id]);

  useEffect(() => {
    const getReservasiByInvocieId = async () => {
      const response = await axios.get(`http://localhost:8000/invoices/${id}`);
      setReservasi(response.data.data["reservasi"]);
      console.log(response.data.data["reservasi"]);
    };
    getReservasiByInvocieId();
  }, [id]);

  useEffect(() => {
    const getCustomerByInvocieId = async () => {
      const response = await axios.get(`http://localhost:8000/invoices/${id}`);
      setCustomer(response.data.data["reservasi"]["customer"]);
      console.log(response.data.data["reservasi"]["customer"]);
    };
    getCustomerByInvocieId();
  }, [id]);

  useEffect(() => {
    const getTransaksiFasilitasById = async (reservasi) => {
      const response = await axios.get(
        `http://localhost:8000/transaksiFasilitas/${reservasi.id}`
      );
      setTransaksiFasilitas(response.data.data);
      console.log(response.data.data);
    };

    if (reservasi) {
      getTransaksiFasilitasById(reservasi);
    }
  }, [reservasi]);

  useEffect(() => {
    const getTransaksiKamarsById = async (reservasi) => {
      const response = await axios.get(
        `http://localhost:8000/transaksiKamars/all/${reservasi.id}`
      );
      setTransaksiKamars(response.data.data);
      console.log(response.data.data);
    };

    if (reservasi) {
      getTransaksiKamarsById(reservasi);
    }
  }, [reservasi]);

  function formatDateToDateString(dateString) {
    const date = new Date(dateString);

    if (dateString === "1970-01-01T00:00:00.000Z") {
      return "-";
    }

    const options = { day: "2-digit", month: "2-digit", year: "numeric" };

    return date.toLocaleDateString("en-GB", options);
  }

  const componentRef = useRef();
  const handleback = () => {
    navigate("/homeFO");
  }

      // Rest of the code...

      return (
        <Fragment>
          <Button
            colorScheme="teal"
            position="absolute"
            top="1rem"
            left="1rem"
            onClick={() => handleback()}
          >
            <ArrowBackIcon mr="2" />
            Back
          </Button>

          <Center>
            <PrintableInvoice
              ref={componentRef}
              invoices={invoices}
              reservasi={reservasi}
              customer={customer}
              transaksiFasilitas={transaksiFasilitas}
              transaksiKamars={transaksiKamars}
              formatDateToDateString={formatDateToDateString}
            />
            <ReactToPrint
              trigger={() => (
                <Button colorScheme="teal" mt="4">
                  Print
                </Button>
              )}
              content={() => componentRef.current}
            />
          </Center>
        </Fragment>
      );
    };

export default InvoicePelunasan;
