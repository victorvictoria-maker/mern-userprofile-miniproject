import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Image,
  Spinner,
  Divider,
} from "@chakra-ui/react";

const UserModal = ({ isOpen, onClose, userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const { data } = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bgColor={"purple.600"} color={"white"} role='dialog'>
        <ModalHeader>
          <Text fontSize='lg' fontWeight='bold'>
            {user?.firstName} {user?.lastName}
          </Text>
        </ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody textAlign='center'>
          {loading ? (
            <Spinner size='xl' />
          ) : (
            <>
              <Image
                src={user.image}
                alt={user.firstName}
                borderRadius='full'
                boxSize='80px'
                mx='auto'
              />
              <Text fontSize='lg' fontWeight='bold'>
                {user.email}
              </Text>
              <Text>{user.phone}</Text>
              <Text>{user.gender.toUpperCase()}</Text>
              <Text>Blood Group: {user.bloodGroup}</Text>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
