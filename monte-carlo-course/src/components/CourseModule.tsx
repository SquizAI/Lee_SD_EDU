import React from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Badge, 
  Flex
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
        color: 'var(--success)',
        bgColor: 'rgba(74, 222, 128, 0.2)',
        label: 'Beginner'
      };
    case 'medium':
      return { 
        icon: FaChalkboardTeacher, 
        color: 'var(--warning)',
        bgColor: 'rgba(250, 204, 21, 0.2)',
        label: 'Intermediate'
      };
    case 'hard':
      return { 
        icon: FaRocket, 
        color: 'var(--error)',
        bgColor: 'rgba(248, 113, 113, 0.2)',
        label: 'Advanced'
      };
    default:
      return { 
        icon: FaChalkboardTeacher, 
        color: 'var(--info)',
        bgColor: 'rgba(96, 165, 250, 0.2)',
        label: 'All Levels'
      };
  }
};

const CourseModule: React.FC<CourseModuleProps> = ({ module }) => {
  const { color, bgColor, label } = getDifficultyProps(module.difficulty);
  
  return (
    <AccordionItem 
      mb={4} 
      className="module-card"
      border="none"
      borderRadius="md"
      overflow="hidden"
      bg="var(--accent-primary-alpha)"
      _expanded={{ boxShadow: 'var(--shadow-md)' }}
    >
      <h2>
        <AccordionButton 
          className="module-header" 
          py={4} 
          px={5} 
          bg="var(--accent-primary-alpha)" 
          _hover={{ bg: 'var(--accent-primary-alpha)' }}
        >
          <Box flex="1" textAlign="left">
            <Flex align="center">
              <Heading size="md" color="var(--text-primary)">{module.title}</Heading>
              <Badge 
                ml={3} 
                px={2} 
                py={1} 
                borderRadius="full"
                bg={bgColor}
                color={color}
                fontSize="xs"
              >
                {label}
              </Badge>
            </Flex>
          </Box>
          <Flex align="center">
            <Badge 
              bg="var(--background-card)" 
              color="var(--text-secondary)"
              px={2} 
              py={1}
              mr={3}
            >
              {module.duration}
            </Badge>
            <AccordionIcon />
          </Flex>
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4} pt={2} px={5} bg="var(--background-card)">
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
                p={3} 
                mb={2} 
                borderWidth="1px" 
                borderRadius="md"
                bg="var(--background-secondary)"
                borderColor="var(--border-light)"
                _hover={{ bg: "var(--background-secondary)", borderColor: "var(--accent-primary-alpha)", transform: "translateX(3px)" }}
                transition="all 0.2s"
                className="lesson-item"
              >
                <Flex justify="space-between" align="center">
                  <Box>
                    <Text fontWeight="medium" color="var(--text-primary)" fontSize="sm">{index + 1}. {lesson.title}</Text>
                  </Box>
                  <Badge bg="var(--accent-primary-alpha)" color="var(--accent-secondary)" fontSize="xs">{lesson.duration}</Badge>
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
