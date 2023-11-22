import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function ConfirmationPage({title, message, onConfirm, onCancel}) {
    const {isOpen, onOpen, onClose} = useDisclosure();

    const handleConfirm = () => {
        onConfirm();
        onClose();
    }

    const handleCancel = () => {
        onCancel();
        onClose();
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                            <ModalBody>
                                <p>{message}</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={handleCancel}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={handleConfirm}>
                                    Confirm
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

