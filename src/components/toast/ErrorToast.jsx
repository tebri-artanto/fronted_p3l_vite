import { useToast } from "@chakra-ui/react";

const ErrorToast = ({ title, description }) => {
    const toast = useToast();
    
    return toast({
        title: title,
        description: description,
        status: "error",
        duration: 3000,
        position: 'top',
        variant: 'subtle',
        isClosable: true,
    });
};

export default ErrorToast;
