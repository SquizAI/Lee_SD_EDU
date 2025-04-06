import React from 'react';
import { Box, Flex, Text, Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiBook, FiSettings, FiSearch, FiBarChart2, FiUser } from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  // Simplified navigation items
  const navItems: NavItem[] = [
    { icon: FiHome, label: 'Dashboard', path: '/' },
    { icon: FiBook, label: 'Lessons', path: '/lessons' },
    { icon: FaGraduationCap, label: 'Learning', path: '/learning' },
    { icon: FiBarChart2, label: 'Progress', path: '/progress' },
    { icon: FiSettings, label: 'Settings', path: '/settings' },
  ];

  return (
    <Box position="relative" minH="100vh" bg="var(--background-primary)">
      {/* Sidebar Navigation */}
      <Box 
        w="var(--sidebar-width)" 
        bg="var(--background-sidebar)" 
        color="white" 
        py={6} 
        position="fixed"
        h="100vh"
        zIndex={10}
        boxShadow="md"
        left={0}
        top={0}
        overflowY="auto"
        sx={{ // Fix text overflow in sidebar items
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflowX: "hidden"
        }}
      >
        <Flex direction="column" align="center" h="full">
          {/* Logo */}
          <Flex align="center" w="full" px={6} mb={10} overflow="hidden">
            <Box borderRadius="md" bg="var(--accent-primary)" color="white" p={2} mr={3} flexShrink={0}>
              <Icon as={FiBarChart2} boxSize={5} />
            </Box>
            <Text fontWeight="bold" fontSize="md" isTruncated>Monte Carlo</Text>
          </Flex>
          
          {/* Navigation Menu - Simple List */}
          <Flex direction="column" w="full" mb={8}>
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path || 
                (item.path === '/' && location.pathname === '') || 
                (item.path === '/lessons' && location.pathname.includes('/lesson'));
              
              return (
                <Flex 
                  key={index}
                  as={Link} 
                  to={item.path}
                  align="center"
                  px={6}
                  py={3}
                  mb={2}
                  borderRadius="md"
                  bg={isActive ? "var(--accent-primary-transparent)" : "transparent"}
                  color={isActive ? "var(--accent-primary)" : "var(--text-secondary)"}
                  _hover={{ 
                    bg: "var(--background-hover)", 
                    color: "var(--text-primary)" 
                  }}
                  position="relative"
                  transition="all 0.2s"
                  overflow="hidden"
                  w="full"
                >
                  <Icon 
                    as={item.icon} 
                    boxSize={5} 
                    mr={4}
                    flexShrink={0}
                  />
                  <Text fontWeight={isActive ? "600" : "400"} isTruncated>
                    {item.label}
                  </Text>
                  {isActive && (
                    <Box 
                      position="absolute" 
                      left={0} 
                      top="50%" 
                      transform="translateY(-50%)" 
                      w="3px" 
                      h="70%" 
                      bg="var(--accent-primary)" 
                      borderRadius="0 3px 3px 0"
                    />
                  )}
                </Flex>
              );
            })}
          </Flex>
          
          {/* User Profile Area */}
          <Flex 
            mt="auto" 
            py={3}
            px={6}
            w="full"
            borderTop="1px solid var(--border-light)"
            align="center"
            overflow="hidden"
          >
            <Box 
              borderRadius="full" 
              bg="var(--background-card)" 
              p={1.5} 
              border="2px solid var(--accent-primary)"
              flexShrink={0}
            >
              <Icon as={FiUser} color="var(--text-primary)" boxSize={5} />
            </Box>
            <Box ml={3} overflow="hidden">
              <Text fontSize="sm" fontWeight="bold" color="var(--text-primary)" isTruncated>Student</Text>
              <Text fontSize="xs" color="var(--text-secondary)" isTruncated>Monte Carlo Course</Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
      
      {/* Main Content Area */}
      <Box 
        as="main" 
        ml="var(--sidebar-width)" 
        w={`calc(100% - var(--sidebar-width))`} 
        minH="100vh"
      >
        {/* Header */}
        <Box 
          as="header" 
          bg="var(--background-secondary)" 
          py={4} 
          px={6} 
          borderBottom="1px solid var(--border-light)"
          position="sticky"
          top={0}
          zIndex={5}
        >
          <Flex justify="space-between" align="center">
            <Text fontSize="xl" fontWeight="bold" color="var(--text-primary)">
              Monte Carlo Methods
            </Text>
            <Flex align="center" gap={4}>
              <InputGroup w="250px">
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiSearch} color="var(--text-muted)" />
                </InputLeftElement>
                <Input 
                  placeholder="Search lessons..."
                  bg="var(--background-card)"
                  border="1px solid var(--border-light)"
                  _placeholder={{ color: 'var(--text-muted)' }}
                  _focus={{ borderColor: 'var(--accent-primary)' }}
                  color="var(--text-primary)"
                />
              </InputGroup>
            </Flex>
          </Flex>
        </Box>
        
        {/* Page Content */}
        <Box p={{ base: 4, md: 6 }} maxW="1400px" mx="auto">
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
