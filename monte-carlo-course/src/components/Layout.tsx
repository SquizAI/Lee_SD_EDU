import React from 'react';
import { Box, Flex, Container, Text, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex direction="column" minH="100vh">
      <Box as="header" bg="blue.600" color="white" py={4} boxShadow="md">
        <Container maxW="container.lg">
          <Flex justify="space-between" align="center">
            <Link to="/">
              <Text fontSize="xl" fontWeight="bold">Monte Carlo | 1-Day Course</Text>
            </Link>
            <Flex>
              <ChakraLink as={Link} to="/" mx={4}>Home</ChakraLink>
              <ChakraLink as={Link} to="/" mx={4}>Resources</ChakraLink>
            </Flex>
          </Flex>
        </Container>
      </Box>
      
      <Box as="main" flex="1">
        {children}
      </Box>
      
      <Box as="footer" bg="gray.100" py={6} mt={8}>
        <Container maxW="container.lg">
          <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
            <Text>&copy; {new Date().getFullYear()} Monte Carlo Course</Text>
            <Text>Built with 💙 by AI Agents</Text>
          </Flex>
        </Container>
      </Box>
    </Flex>
  );
};

export default Layout;
