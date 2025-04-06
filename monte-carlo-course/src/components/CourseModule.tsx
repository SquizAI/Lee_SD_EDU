import React from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Badge, 
  Flex,
  Icon,
  Tooltip
} from '@chakra-ui/react';
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from '@chakra-ui/accordion';
import { Module, DifficultyLevel } from '../utils/courseData';
import { Link } from 'react-router-dom';
import { FaRegLightbulb, FaChalkboardTeacher, FaRocket } from 'react-icons/fa';

interface CourseModuleProps {
  module: Module;
  isActive: boolean;
}

// Helper function to get difficulty icon and color
const getDifficultyProps = (difficulty: DifficultyLevel) => {
  switch(difficulty) {
    case 'easy':
      return { 
        icon: FaRegLightbulb, 
        color: '#10b981',
        label: 'Beginner'
      };
    case 'medium':
      return { 
        icon: FaChalkboardTeacher, 
        color: '#f59e0b',
        label: 'Intermediate'
      };
    case 'hard':
      return { 
        icon: FaRocket, 
        color: '#ef4444',
        label: 'Advanced'
      };
    default:
      return { 
        icon: FaChalkboardTeacher, 
        color: '#3a86ff',
        label: 'All Levels'
      };
  }
};

const CourseModule: React.FC<CourseModuleProps> = ({ module, isActive }) => {
  const { icon, color, label } = getDifficultyProps(module.difficulty);
  
  return (
    <AccordionItem mb={2} className="module-card">
      <h2>
        <AccordionButton className="module-header">
          <Box flex="1" textAlign="left">
            <Flex align="center">
              <Heading size="sm">{module.title}</Heading>
              <Tooltip label={`Difficulty: ${label}`}>
                <span className={`difficulty-indicator ${module.difficulty}`} style={{ color }}>
                  <Icon as={icon} />
                  <Text fontSize="xs">{label}</Text>
                </span>
              </Tooltip>
            </Flex>
          </Box>
          <Flex align="center">
            <Badge colorScheme={isActive ? "blue" : "gray"} mr={2}>{module.duration}</Badge>
            <AccordionIcon />
          </Flex>
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Box mb={4}>
          <Text>{module.description}</Text>
        </Box>
        <Box>
          {module.lessons.map((lesson, index) => (
            <Link 
              key={lesson.id} 
              to={`/lessons/${lesson.id}`}
            >
              <Box 
                p={2.5} 
                mb={1.5} 
                borderWidth="1px" 
                borderRadius="md"
                _hover={{ bg: "gray.50", transform: "translateX(3px)" }}
                transition="all 0.2s"
                className="lesson-item"
              >
                <Flex justify="space-between" align="center">
                  <Box>
                    <Text fontWeight="bold">{index + 1}. {lesson.title}</Text>
                  </Box>
                  <Badge colorScheme="green">{lesson.duration}</Badge>
                </Flex>
              </Box>
            </Link>
          ))}
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default CourseModule;
