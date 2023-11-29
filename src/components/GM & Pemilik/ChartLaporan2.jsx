import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Center,
  Divider,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import Chart from "react-apexcharts";

const ChartLaporan2 = () => {
  const [laporan2, setLaporan2] = useState([]);
  const [totalJumlah, setTotalJumlah] = useState(0);

  useEffect(() => {
    const getInvociebyId = async () => {
      const response = await axios.get(
        "http://localhost:8000/laporans/laporan2"
      );
      setLaporan2(response.data.data);
      console.log(response.data.data);
    };
    getInvociebyId();
  }, []);

  useEffect(() => {
    const calculateTotalJumlah = () => {
      let sum = 0;
      laporan2.forEach((item) => {
        sum += item.Total;
      });
      setTotalJumlah(sum);
    };
    calculateTotalJumlah();
  }, [laporan2]);

  const formatFloat = (value) => {
    return parseFloat(value).toLocaleString();
  };

  const chartData = {
    series: [
      {
        name: "Group",
        data: laporan2.map((item) => item.Grup),
      },
      {
        name: "Personal",
        data: laporan2.map((item) => item.Personal),
      },
      {
        name: "Total",
        data: laporan2.map((item) => item.Total),
      },
    ],
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: laporan2.map((item) => item.bulan),
      },
      yaxis: {
        title: {
          text: "Amount (Rp)",
        },
      },
      title: {
        text: "LAPORAN PENDAPATAN BULANAN",
        align: "center",
      },
      legend: {
        position: "top",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
    },
  };
  return (
    <Box w={500}>
       <Chart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={350}
          />
    </Box>
  );
};

export default ChartLaporan2;
