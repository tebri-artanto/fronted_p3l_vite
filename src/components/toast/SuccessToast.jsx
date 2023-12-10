import { useToast } from "@chakra-ui/react";

const SuccessToast = ({ title, description }) => {
    const toast = useToast();
    
    
        toast({
            title: title,
            description: description,
            status: "success",
            duration: 3000,
            position: 'top',
            variant: 'subtle',
            isClosable: true,
        });
};

export default SuccessToast;
