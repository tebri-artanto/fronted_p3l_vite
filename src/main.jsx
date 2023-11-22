import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'flowbite';
import { ChakraProvider } from "@chakra-ui/react";
import {NextUIProvider} from "@nextui-org/react";
// import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <NextUIProvider>
      <App />
    </NextUIProvider>
    
  </ChakraProvider>
  </React.StrictMode>,
)
