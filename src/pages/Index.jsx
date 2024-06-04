import { Container, Text, VStack, Box, Flex, Spacer, Heading, Link, Button, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { Link as RouterLink } from "react-router-dom";
import { useEvents } from "../integrations/supabase/index.js";

const Index = () => {
  const { session, logout } = useSupabaseAuth();
  const { data: events, error, isLoading } = useEvents();

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
          {session ? (
            <Box width="100%">
              <Heading size="lg" mb={4}>Events</Heading>
              {isLoading ? (
                <Text>Loading...</Text>
              ) : error ? (
                <Text>Error loading events: {error.message}</Text>
              ) : (
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Date</Th>
                      <Th>Description</Th>
                      <Th>Venue ID</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {events.map(event => (
                      <Tr key={event.id}>
                        <Td>
                          <Link as={RouterLink} to={`/events/${event.id}`}>
                            {event.name}
                          </Link>
                        </Td>
                        <Td>{event.date}</Td>
                        <Td>{event.description}</Td>
                        <Td>{event.venue_id}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}
            </Box>
          ) : (
            <Text>Please log in to see the events.</Text>
          )}
        </VStack>
      </Flex>
    </Container>
  );
};

export default Index;