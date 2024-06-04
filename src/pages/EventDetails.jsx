import { Container, Text, VStack, Box, Flex, Spacer, Heading, Link, Button, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../integrations/supabase/index.js";

const fetchEventDetails = async (eventId) => {
  const { data, error } = await supabase.from('events').select('*').eq('id', eventId).single();
  if (error) throw new Error(error.message);
  return data;
};

const fetchComments = async (eventId) => {
  const { data, error } = await supabase.from('comments').select('*').eq('event_id', eventId);
  if (error) throw new Error(error.message);
  return data;
};

const EventDetails = () => {
  const { session, logout } = useSupabaseAuth();
  const { eventId } = useParams();

  const { data: event, error: eventError, isLoading: eventLoading } = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => fetchEventDetails(eventId),
  });

  const { data: comments, error: commentsError, isLoading: commentsLoading } = useQuery({
    queryKey: ['comments', eventId],
    queryFn: () => fetchComments(eventId),
  });

  if (!session) {
    return (
      <Container maxW="container.xl">
        <Text>Please log in to see the event details.</Text>
      </Container>
    );
  }

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
          {eventLoading ? (
            <Text>Loading event details...</Text>
          ) : eventError ? (
            <Text>Error loading event: {eventError.message}</Text>
          ) : (
            <>
              <Heading size="lg">{event.name}</Heading>
              <Text>Date: {event.date}</Text>
              <Text>Description: {event.description}</Text>
              <Text>Venue ID: {event.venue_id}</Text>
            </>
          )}
          <Box width="100%">
            <Heading size="md" mb={4}>Comments</Heading>
            {commentsLoading ? (
              <Text>Loading comments...</Text>
            ) : commentsError ? (
              <Text>Error loading comments: {commentsError.message}</Text>
            ) : (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Content</Th>
                    <Th>Created At</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {comments.map(comment => (
                    <Tr key={comment.id}>
                      <Td>{comment.content}</Td>
                      <Td>{comment.created_at}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </Box>
        </VStack>
      </Flex>
    </Container>
  );
};

export default EventDetails;