import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Container, Button, Flex, Badge, SimpleGrid, Icon } from '@chakra-ui/react';
import { Accordion } from '@chakra-ui/accordion';
import { courseModules, PathOption, filterModulesByDifficulty } from '../utils/courseData';
import CourseModule from '../components/CourseModule';
import { Link } from 'react-router-dom';
import { FaRegLightbulb, FaChalkboardTeacher, FaRocket } from 'react-icons/fa';

const LearningPathOption: React.FC<{
  title: string;
  description: string;
  difficulty: PathOption;
  icon: React.ReactElement;
  isSelected: boolean;
  onClick: (difficulty: PathOption) => void;
}> = ({ title, description, difficulty, icon, isSelected, onClick }) => {
  return (
    <Box 
      className={`path-option ${difficulty} ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(difficulty)}
      role="button"
      aria-selected={isSelected}
    >
      <Flex direction="column" align="center" gap={2}>
        {icon}
        <Text fontWeight="bold">{title}</Text>
        <Text fontSize="sm">{description}</Text>
      </Flex>
    </Box>
  );
};

const HomePage: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [selectedPath, setSelectedPath] = useState<PathOption>('all');
  const [filteredModules, setFilteredModules] = useState(courseModules);
  
  useEffect(() => {
    setFilteredModules(filterModulesByDifficulty(courseModules, selectedPath));
  }, [selectedPath]);

  const handlePathChange = (difficulty: PathOption) => {
    setSelectedPath(difficulty);
  };
  
  return (
    <Container maxW="container.xl" py={6}>
      {/* Header Section */}
      <Box className="header-section" textAlign="center" mb={6}>
        <Heading as="h1" size="2xl" mb={2} className="gradient-text">
          Monte Carlo Algorithms
        </Heading>
        <Text fontSize="lg" mb={4}>
          Interactive course on Monte Carlo methods with real-world applications
        </Text>
      </Box>
      
      {/* Learning Path Selector */}
      <Box mb={8}>
        <Heading as="h2" size="md" mb={3}>
          Choose Your Learning Path
        </Heading>
        <Box className="learning-path-selector">
          <LearningPathOption
            title="All Content"
            description="View the complete curriculum"
            difficulty="all"
            icon={<Icon as={FaChalkboardTeacher} w={6} h={6} />}
            isSelected={selectedPath === 'all'}
            onClick={handlePathChange}
          />
          <LearningPathOption
            title="Beginner"
            description="Fundamental concepts"
            difficulty="easy"
            icon={<Icon as={FaRegLightbulb} w={6} h={6} />}
            isSelected={selectedPath === 'easy'}
            onClick={handlePathChange}
          />
          <LearningPathOption
            title="Intermediate"
            description="Applied techniques"
            difficulty="medium"
            icon={<Icon as={FaChalkboardTeacher} w={6} h={6} />}
            isSelected={selectedPath === 'medium'}
            onClick={handlePathChange}
          />
          <LearningPathOption
            title="Advanced"
            description="Complex implementations"
            difficulty="hard"
            icon={<Icon as={FaRocket} w={6} h={6} />}
            isSelected={selectedPath === 'hard'}
            onClick={handlePathChange}
          />
        </Box>
      </Box>
      
      {/* Course Introduction */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
        <Box className="bento-card overview-card" p={5}>
          <Heading as="h2" size="md" mb={3}>
            Course Overview
          </Heading>
          <Text fontSize="sm" mb={4}>
            Master Monte Carlo algorithms and their applications in data analytics. Learn implementation techniques 
            for simulations, optimization, and machine learning tasks.
          </Text>
          <Flex>
            <Badge colorScheme="blue" mr={2}>8 hours</Badge>
            <Badge colorScheme="green">4 modules</Badge>
          </Flex>
        </Box>
        
        <Box className="bento-card start-card" p={5}>
          <Heading as="h2" size="md" mb={3}>
            Start Your Journey
          </Heading>
          <Text fontSize="sm" mb={4}>
            Begin with the fundamentals and progress through interactive lessons with embedded visualizations and examples.
          </Text>
          <Link to={`/lessons/${courseModules[0].lessons[0].id}`}>
            <Button colorScheme="blue" size="md">
              Start Learning
            </Button>
          </Link>
        </Box>
      </SimpleGrid>
      
      {/* Modules Section */}
      <Box mb={8}>
        <Heading as="h2" size="md" mb={3}>
          Course Modules
        </Heading>
        <Text fontSize="sm" mb={4}>
          {selectedPath === 'all' 
            ? 'Showing all modules. Select a difficulty level to filter content.' 
            : `Showing ${selectedPath} difficulty modules.`}
        </Text>
        
        {filteredModules.length === 0 ? (
          <Box p={4} textAlign="center" borderWidth="1px" borderRadius="md">
            <Text>No modules match the selected difficulty level. Try another option.</Text>
          </Box>
        ) : (
          <Accordion allowToggle onChange={(expandedIndex) => {
            const index = typeof expandedIndex === 'number' ? expandedIndex : null;
            setActiveModule(index !== null ? filteredModules[index].id : null);
          }}>
            {filteredModules.map((module) => (
              <CourseModule 
                key={module.id} 
                module={module} 
                isActive={module.id === activeModule}
              />
            ))}
          </Accordion>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;
