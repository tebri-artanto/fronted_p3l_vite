import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import SidebarTest from "../SidebarTest";
import Navbar from "../Navbar";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";


import {
  Button, Center, Flex, Text, Select
} from "@chakra-ui/react";
import PrintableLaporan1 from "./PrintableLaporan1";
import PrintableLaporan2 from "./PrintableLaporan2";
import PrintableLaporan3 from "./PrintableLaporan3";
import PrintableLaporan4 from "./PrintableLaporan4";
import ChartLaporan2 from "./ChartLaporan2";
import ChartLaporan3 from "./ChartLaporan3";
import ReactToPrint from "react-to-print";
const Laporan3 = () => {
  const componentRef1 = useRef();
  const componentRef2 = useRef();
  const componentRef3 = useRef();
  const componentRef4 = useRef();
  const [bulan, setBulan] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  
  const months = [
    { value: 1, label: "Januari" },
    { value: 2, label: "Februari" },
    { value: 3, label: "Maret" },
    { value: 4, label: "April" },
    { value: 5, label: "Mei" },
    { value: 6, label: "Juni" },
    { value: 7, label: "Juli" },
    { value: 8, label: "Agustus" },
    { value: 9, label: "September" },
    { value: 10, label: "Oktober" },
    { value: 11, label: "November" },
    { value: 12, label: "Desember" },
    { value: "", label: "Semua"},
  ];


  return (
    <div className="App flex justify-between">
      <SidebarTest />
      <div className="w-screen ">
        <Navbar />
        <div className="w-full p-10">
          <h1 className="text-3xl font-semibold text-gray-900 pb-10">
            Laporan 3
          </h1>

          <Flex alignItems="start">
            <Text mr={2}>Bulan:</Text>
            <Select border="1px" value={currentMonth} onChange={(e) => setCurrentMonth(e.target.value)}>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </Select>
            <ReactToPrint
              trigger={() => (
                <Button colorScheme="teal" >
                  Print
                </Button>
              )}
              content={() => componentRef3.current}
            />
          </Flex>
          
          <div className="shadow rounded-lg mt-3">
            <Center>
            
            <PrintableLaporan3 ref={componentRef3} bulan={currentMonth} />
            <ChartLaporan3 bulan={currentMonth} />
            </Center>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Laporan3;

