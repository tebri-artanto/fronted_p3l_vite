import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import SidebarTest from "../SidebarTest";
import Navbar from "../Navbar";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";


import {
  Button
} from "@chakra-ui/react";
import PrintableLaporan1 from "./PrintableLaporan1";
import PrintableLaporan2 from "./PrintableLaporan2";
import PrintableLaporan3 from "./PrintableLaporan3";
import PrintableLaporan4 from "./PrintableLaporan4";
import ChartLaporan2 from "./ChartLaporan2";
import ChartLaporan3 from "./ChartLaporan3";
import ReactToPrint from "react-to-print";
const HomeLaporan = () => {
  const componentRef1 = useRef();
  const componentRef2 = useRef();
  const componentRef3 = useRef();
  const componentRef4 = useRef();


  return (
    <div className="App flex justify-between">
      <SidebarTest />
      <div className="w-screen ">
        <Navbar />
        <div className="w-full p-10">
          <h1 className="text-3xl font-semibold text-gray-900 pb-10">
            Laporan
          </h1>

          <div className="relative flex shadow rounded-lg mt-3">
            <ReactToPrint
              trigger={() => (
                <Button colorScheme="teal" mt="4" mr="-20">
                  Print
                </Button>
              )}
              content={() => componentRef1.current}
            />
            <PrintableLaporan1 ref={componentRef1} />
            <ReactToPrint
              trigger={() => (
                <Button colorScheme="teal" mt="4" mr="-20">
                  Print
                </Button>
              )}
              content={() => componentRef2.current}
            />
            <PrintableLaporan2 ref={componentRef2} />
          </div>

          <div className="relative flex shadow rounded-lg mt-3">
          <ReactToPrint
              trigger={() => (
                <Button colorScheme="teal" mt="4" mr="-20">
                  Print
                </Button>
              )}
              content={() => componentRef3.current}
            />
            <PrintableLaporan3 ref={componentRef3}/>
            
            <ReactToPrint
              trigger={() => (
                <Button colorScheme="teal" mt="4" mr="-20">
                  Print
                </Button>
              )}
              content={() => componentRef4.current}
            />
            <PrintableLaporan4 ref={componentRef4}/>
          </div>

          <div className="relative flex shadow rounded-lg mt-3">
            <ChartLaporan2 />
            <ChartLaporan3 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLaporan;
