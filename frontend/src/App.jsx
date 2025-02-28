import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Text,
  Spinner,
  useDisclosure,
  SimpleGrid,
} from "@chakra-ui/react";
import UserCard from "./components/UserCard";
import UserModal from "./components/UserModal";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const { data } = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    onOpen();
  };

  return (
    <Box px={12} py={6}>
      <Text
        as='h1'
        role='heading'
        fontSize='4xl'
        fontWeight='bold'
        mb={4}
        textAlign={"center"}
      >
        User Directory
      </Text>

      {loading ? (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          minHeight='95vh'
        >
          <Spinner size='xl' aria-label='loading-spinner' />
        </Box>
      ) : (
        <SimpleGrid
          columns={{
            base: 1,
            md: 3,
            lg: 4,
          }}
          spacing={10}
          w={"full"}
          mt={8}
        >
          {users.map((user) => (
            <UserCard key={user.id} user={user} onClick={handleUserClick} />
          ))}
        </SimpleGrid>
      )}

      {selectedUser && (
        <UserModal isOpen={isOpen} onClose={onClose} userId={selectedUser.id} />
      )}
    </Box>
  );
};

export default App;
