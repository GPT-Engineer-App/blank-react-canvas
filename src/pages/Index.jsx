import { Container, Text, VStack, Box, Flex, Spacer, Heading, Link, Button } from "@chakra-ui/react";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { Link as RouterLink } from "react-router-dom";

const Index = () => {
  const { session, logout } = useSupabaseAuth();

  return (
    <Container maxW="container.xl">
      <Flex as="nav" bg="blue.500" color="white" padding={4}>
        <Box>
          <Heading size="md">MyApp</Heading>
        </Box>
        <Spacer />
        <Box>
          <Link as={RouterLink} to="/" margin={2} color="white">
            Home
          </Link>
          <Link as={RouterLink} to="/about" margin={2} color="white">
            About
          </Link>
          <Link as={RouterLink} to="/contact" margin={2} color="white">
            Contact
          </Link>
          {session ? (
            <Button onClick={logout} margin={2} colorScheme="red">
              Logout
            </Button>
          ) : (
            <Link as={RouterLink} to="/login" margin={2} color="white">
              Login
            </Link>
          )}
        </Box>
      </Flex>
      <Flex direction="column" align="center" justify="center" height="80vh">
        <VStack spacing={4}>
          <Text fontSize="2xl">Your Blank Canvas</Text>
          <Text>Chat with the agent to start making edits.</Text>
        </VStack>
      </Flex>
    </Container>
  );
};

export default Index;