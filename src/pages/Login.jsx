import { Container, Flex, Box, Heading } from "@chakra-ui/react";
import { SupabaseAuthUI } from "../integrations/supabase/auth.jsx";

const Login = () => {
  return (
    <Container maxW="container.xl">
      <Flex direction="column" align="center" justify="center" height="80vh">
        <Box textAlign="center">
          <Heading mb={6}>Login</Heading>
          <SupabaseAuthUI />
        </Box>
      </Flex>
    </Container>
  );
};

export default Login;