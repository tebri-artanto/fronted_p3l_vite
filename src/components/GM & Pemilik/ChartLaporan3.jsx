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
import Chart from "react-apexcharts";
import axios from "axios";

const ChartLaporan3 = (bulan) => {
  const [laporan3, setLaporan3] = useState([]);
  const [selectedBulan, setSelectedBulan] = useState('');
  const [bulanValue, setBulanValue] = useState(0);

  useEffect(() => {
    console.log(bulan);
    setSelectedBulan(bulan);
    console.log(selectedBulan.bulan);

    setBulanValue(selectedBulan.bulan); 
    console.log(bulanValue);
    
    const getLaporan3 = async () => {
      const response = await axios.get(
        `http://localhost:8000/laporans/laporan3/${bulanValue}`
      );
      setLaporan3(response.data);
      console.log(response.data);
    };
    getLaporan3();
  }, [bulanValue]);

  // Extracting data for the chart
  const chartData = {
    series: [
      {
        name: "Group",
        data: laporan3.map((item) => item.Grup),
      },
      {
        name: "Personal",
        data: laporan3.map((item) => item.Personal),
      },
      {
        name: "Total",
        data: laporan3.map((item) => item.Total),
      },
    ],
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: laporan3.map((item) => item.Jenis_kamar),
      },
      yaxis: {
        title: {
          text: "Total",
        },
      },
      title: {
        text: "LAPORAN JUMLAH TAMU",
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

export default ChartLaporan3;
