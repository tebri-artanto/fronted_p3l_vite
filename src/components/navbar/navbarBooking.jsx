import { useState } from "react";
import axios from "axios";
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box,
} from '@chakra-ui/react'

const AddReservasi = () => {
  const [nama, setNama] = useState("");
  const [no_telp, setNoTelp] = useState("");
  const [tanggal_reservasi, setTanggalReservasi] = useState("");
  const [waktu_reservasi, setWaktuReservasi] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("API_ENDPOINT_URL", {
        nama,
        no_telp,
        tanggal_reservasi,
        waktu_reservasi,
      });
      console.log(response.data);
      // reset form fields
      setNama("");
      setNoTelp("");
      setTanggalReservasi("");
      setWaktuReservasi("");
    } catch (error) {
      console.error(error);
    }
  };

  const steps = [
    { title: 'First', description: 'Contact Info' },
    { title: 'Second', description: 'Date & Time' },
    { title: 'Third', description: 'Select Rooms' },
  ]

  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  })
  return (
    <Stepper size='lg' index={activeStep}>
      {steps.map((step, index) => (
        <Step key={index} onClick={() => setActiveStep(index)}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink='0'>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
}

export default AddReservasi;
