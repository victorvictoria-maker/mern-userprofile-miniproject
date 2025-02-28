import { Box, Text, Image, Button, Flex } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

const UserCard = ({ user, onClick }) => {
  return (
    <Box
      borderWidth='1px'
      borderRadius='lg'
      p={4}
      cursor='pointer'
      borderColor={"purple.600"}
    >
      <Image
        src={user.image}
        alt={user.firstName}
        borderRadius='full'
        boxSize='60px'
        mx='auto'
      />
      <Text mt={2} fontWeight='bold' textAlign='center' fontSize={"xl"}>
        {user.firstName} {user.lastName}
      </Text>
      <Text textAlign='center' fontSize={"sm"} minHeight={"30px"}>
        {user.email}
      </Text>
      <Flex justify='center'>
        <Button
          leftIcon={<FaUser />}
          onClick={() => onClick(user)}
          mt={1}
          bgColor={"purple.600"}
          color={"white"}
          _hover={{ bg: "purple.700" }}
        >
          View Profile
        </Button>
      </Flex>
    </Box>
  );
};

export default UserCard;
