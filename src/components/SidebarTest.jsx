import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const SidebarTest = () => {
  const [user, setUser] = useState([{ id: "", username: "", id_role: "" }]);
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  useEffect(() => {
    const token = Cookies.get("authToken");
    console.log(token);
    // Check if the user is authenticated
    if (!token) {
      // Redirect to the login page if no token is found
      history.push("/login");
    }

    // Make an authenticated API request to fetch user data
    fetchUserData(token);
  }, []);

  const fetchUserData = async (token) => {
    // Send the token with the request to authenticate
    try {
      const response = await axios.get("http://localhost:8000/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);

      setUser(response.data.data);
    } catch (error) {
      console.error("Profile fetch error:", error);
    }
  };

  let showMenu = "";
  if (user.id_role === 1) {
    showMenu = "Customer";
  } else if (user.id_role === 2) {
    showMenu = "Sales Marketing";
  } else if (user.id_role === 3) {
    showMenu = "Admin";
  } else if (user.id_role === 5) {
    showMenu = "Front Office";
  } else if (user.id_role === 6 || user.id_role === 7) {
    showMenu = "Laporan";
  }
  const Menus = [
    { title: "Season", src: "Chart_fill", path: "/season" },
    { title: "Tarif", src: "Chat", path: "/tarif" },
    { title: "Kamar", src: "User", gap: true, path: "/kamar" },
    { title: "Fasilitas Tambahan ", src: "Calendar", path: "/fasilitas" },
    { title: "Riwayat Transaksi", src: "Search", path: "/riwayatTransaksi" },
    { title: "Customers", src: "User", path: "/customerList" },
    {
      title: "Riwayat Transaksi",
      src: "Search",
      path: "/riwayatTransaksiCust",
    },
    { title: "Riwyat Transaksi ", src: "Folder", path: "/homeFO" },
    { title: "Laporan", src: "Setting", path: "/homeLaporan" },
    { title: "Laporan 1", src: "Setting", path: "/laporan1" },
    { title: "Laporan 2", src: "Setting", path: "/laporan2" },
    { title: "Laporan 3", src: "Setting", path: "/laporan3" },
    { title: "Laporan 4", src: "Setting", path: "/laporan4" },

  ];

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-20"
        } bg-teal-color h-screen p-5 pt-8 relative duration-400`}
      >
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="https://storage.googleapis.com/image-storage-p3l/logo-kecik.png"
            className={`cursor-pointer duration-500 w-10 ${
              open 
            }`}
          />
          <h1
            className={`text-dark-purple origin-center font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Grand Atma Hotel
          </h1>
        </div>
        <ul className="pt-6">
          {/* {Menus.map((Menu, index) =>(
          (menuCustomer || index < 2) && (
            <li key={index}
              className={`flex rounded-md p-2 cursor-pointer 
              hover:bg-light-white 
              text-gray-300 text-sm 
              items-center gap-x-4
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 }`}
            >
              <img src={`./src/assets/${Menu.src}.png`} alt="test" />
              <span onClick={() => navigate(`${Menu.path}`)} className={`${!open && "hidden"} origin-left duration-200`}>{Menu.title}</span>
            </li>
          ),
          (menuAdmin|| index == 2) && (
            <li key={index}
              className={`flex rounded-md p-2 cursor-pointer 
              hover:bg-light-white 
              text-gray-300 text-sm 
              items-center gap-x-4
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 }`}
            >
              <img src={`./src/assets/${Menu.src}.png`} alt="test" />
              <span onClick={() => navigate(`${Menu.path}`)} className={`${!open && "hidden"} origin-left duration-200`}>{Menu.title}</span>
            </li>
          ),
          (menuAdmin|| index == 2, index == 2 ) && (
            <li key={index}
              className={`flex rounded-md p-2 cursor-pointer 
              hover:bg-light-white 
              text-gray-300 text-sm 
              items-center gap-x-4
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 }`}
            >
              <img src={`./src/assets/${Menu.src}.png`} alt="test" />
              <span onClick={() => navigate(`${Menu.path}`)} className={`${!open && "hidden"} origin-left duration-200`}>{Menu.title}</span>
            </li>
          )
        ))} */}
          {Menus.map((Menu, index) => {
            if (showMenu === "Customer" && index == 6) {
              return (
                <li
                  key={index}
                  className={`flex rounded-md p-2 cursor-pointer 
                hover:bg-light-white 
                text-dark-purple text-base
                items-center gap-x-4
                ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0}`}
                >
                  <img src={`./src/assets/${Menu.src}.png`} alt="test" />
                  <span
                    onClick={() => navigate(`${Menu.path}`)}
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {Menu.title}
                  </span>
                </li>
              );
            } else if (
              showMenu === "Sales Marketing" &&
              (index === 0 ||
                index === 1 ||
                index === 3 ||
                index === 5 ||
                index === 4)
            ) {
              return (
                <li
                  key={index}
                  className={`flex rounded-md p-2 cursor-pointer 
                hover:bg-light-white 
                text-dark-purple text-base 
                items-center gap-x-4
                ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0}`}
                >
                  <img src={`./src/assets/${Menu.src}.png`} alt="test" />
                  <span
                    onClick={() => navigate(`${Menu.path}`)}
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {Menu.title}
                  </span>
                </li>
              );
            } else if (showMenu === "Admin" && index === 2) {
              return (
                <li
                  key={index}
                  className={`flex rounded-md p-2 cursor-pointer 
                hover:bg-light-white 
                text-dark-purple text-base
                items-center gap-x-4
                ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0}`}
                >
                  <img src={`./src/assets/${Menu.src}.png`} alt="test" />
                  <span
                    onClick={() => navigate(`${Menu.path}`)}
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {Menu.title}
                  </span>
                </li>
              );
            } else if (showMenu === "Front Office" && index === 7) {
              return (
                <li
                  key={index}
                  className={`flex rounded-md p-2 cursor-pointer 
                hover:bg-light-white 
                text-dark-purple text-base
                items-center gap-x-4
                ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0}`}
                >
                  <img src={`./src/assets/${Menu.src}.png`} alt="test" />
                  <span
                    onClick={() => navigate(`${Menu.path}`)}
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {Menu.title}
                  </span>
                </li>
              );
            } else if (showMenu === "Laporan" && (index === 8 ||
              index === 9 ||
              index === 10 ||
              index === 11 ||
              index === 12)) {
              return (
                <li
                  key={index}
                  className={`flex rounded-md p-2 cursor-pointer 
                hover:bg-light-white 
                text-dark-purple text-base
                items-center gap-x-4
                ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0}`}
                >
                  <img src={`./src/assets/${Menu.src}.png`} alt="test" />
                  <span
                    onClick={() => navigate(`${Menu.path}`)}
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {Menu.title}
                  </span>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default SidebarTest;
