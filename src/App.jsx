import { useState } from 'react'


import Sidebar, { SidebarItem } from './components/Sidebar'
import { LayoutDashboard } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AddProduct from './components/AddProduct'
import FasilitasTambahanList from './components/fasilitasTambahan/FasilitasTambahanList'
import AddFasilitasTambahan from './components/fasilitasTambahan/AddFasilitasTambahan'


import { Button } from '@mui/material'
import SidebarTest from './components/SidebarTest'
import SeasonList from './components/season/SeasonList'
import EditFasilitasTambahan from './components/fasilitasTambahan/EditFasilitasTambahan'
import TarifList from './components/tarif/TarifList'
import AddTarif from './components/tarif/AddTarif'
import EditTarif from './components/tarif/editTarif'
import KamarList from './components/kamar/KamarList'
import Register from './components/auth/Register'

import Login from './components/auth/Login'
import AddKamar from './components/kamar/AddKamar'
import EditKamar from './components/kamar/EditKamar';
import ShowProfile from './components/auth/ShowProfile';
import RiwayatTransaksi from './components/customer/riwayatTransaksi';
import EditProfile from './components/customer/EditProfile';
import EditSeason from './components/season/EditSeason';
import CustomerList from './components/customer/CustomerList';
import AddCustomer from './components/customer/AddCustomer';
import EditPassword from './components/auth/EditPassword';
import HomePage from './components/HomePage';
import AddReservasi from './components/reservasi/AddReservasi';
import RoomBooking from './components/reservasi/RoomBooking';
// index.js or App.js
import dotenv from 'dotenv'
import ResumePage from './components/reservasi/ResumePage';
import RoomBookingGroup from './components/reservasi/Room BookingGroup';
import PaymentPage from './components/reservasi/PaymentPage';
import AddReservasiGroup from './components/reservasi/AddReservasiGroup';
import RiwayatTransaksiCust from './components/customer/riwayatTransaksiCust';
import HomeFO from './components/frontOffice/homeFO';
import InvoicePelunasan from './components/frontOffice/InvoicePelunasan';
import CheckOutPage from './components/frontOffice/CheckOutPage';
import HomeLaporan from './components/GM & Pemilik/HomeLaporan';
import Laporan1 from './components/GM & Pemilik/Laporan1';
import Laporan2 from './components/GM & Pemilik/Laporan2';
import Laporan3 from './components/GM & Pemilik/Laporan3';
import Laporan4 from './components/GM & Pemilik/Laporan4';


const router = createBrowserRouter([
  {
    path: "*",
    element: <div>Routes Not Found!</div>,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/season",
    element: <SeasonList/>,
  },
  {
    path: "/addSeason",
    element: <AddProduct />,
  },
  {
    path: "/editSeason/:id",
    element: <EditSeason />,
  },
  {
    path: "/fasilitas",
    element: <FasilitasTambahanList />,
  },
  {
    path: "/addfasilitas",
    element: <AddFasilitasTambahan/>,
  },
  {
    path: "/editfasilitas/:id",
    element: <EditFasilitasTambahan />,
  },
  {
    path: "/tarif",
    element: <TarifList />,
  },
  {
    path: "/addTarif",
    element: <AddTarif/>,
  },
  {
    path: "/editTarif/:id",
    element: <EditTarif/>,
  },
  {
    path: "/kamar",
    element:<KamarList/>,
  },
  {
    path: "/addKamar",
    element:<AddKamar />,
  },
  {
    path: "/editKamar/:id",
    element:<EditKamar />,
  },
  {
    path: "/sidebar",
    element: <SidebarTest />,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <ShowProfile/>
  },
  {
    path: "/riwayatTransaksi",
    element: <RiwayatTransaksi/>,
  },
  {
    path: "/editProfile",
    element: <EditProfile/>,
  },
  {
    path: "/customerList",
    element: <CustomerList/>,
  },
  {
    path: "/addCustomer",
    element: <AddCustomer/>,
  },
  {
    path: "/editPassword",
    element: <EditPassword/>,
  },
  {
    path: "/addReservasi",
    element: <AddReservasi/>,
  },
  {
    path: "/roomBooking",
    element: <RoomBooking/>,
  },
  {
    path: "/resumePage",
    element: <ResumePage/>,
  },
  {
    path: "/roomBookingGroup/:id",
    element: <RoomBookingGroup/>,
  },
  {
    path: "/paymentPage/:id",
    element: <PaymentPage/>,
  },
  {
    path: "/addReservasiGroup",
    element: <AddReservasiGroup/>,
  },
  {
    path: "/riwayatTransaksiCust",
    element: <RiwayatTransaksiCust/>,
  },
  {
    path: "/homeFO",
    element: <HomeFO/>,
  },
  {
    path: "/notaLunas/:id",
    element: <InvoicePelunasan/>,
  },
  {
    path: "/checkOutPage/:id",
    element: <CheckOutPage/>,
  },
  {
    path: "/homeLaporan",
    element: <HomeLaporan/>,
  },
  {
    path: "/laporan1",
    element: <Laporan1/>,
  },
  {
    path: "/laporan2",
    element: <Laporan2/>,
  },
  {
    path: "/laporan3",
    element: <Laporan3/>,
  },
  {
    path: "/laporan4",
    element: <Laporan4/>,
  }
]);



const App = () => {

  // dotenv.config()
  //const navigate = useNavigate();

  return (
    <main >
      
     
      {/* <Sidebar2>
        <Button variant="contained" href="/home">Home</Button>
      </Sidebar2> */}
      
      {/* <Sidebar>
        <SidebarItem icon={<LayoutDashboard size={20}/>} text='Dashboard' alert />
        <SidebarItem icon={<LayoutDashboard size={20}/>} text='Dashboard' />
        
      </Sidebar> */}
      
      <RouterProvider router={router} />
      
    </main>
    
  )
}

export default App
