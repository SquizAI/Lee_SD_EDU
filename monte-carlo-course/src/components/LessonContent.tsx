import React, { useState } from 'react';
import { Box, Heading, Text, Button, Flex, Divider, Badge, useColorModeValue } from '@chakra-ui/react';
import { Lesson } from '../utils/courseData';
import { marked } from 'marked';
import Chat from './Chat';

interface LessonContentProps {
  lesson: Lesson;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

const LessonContent: React.FC<LessonContentProps> = ({ 
  lesson, 
  onNext, 
  onPrevious, 
  hasNext, 
  hasPrevious 
}) => {
  const [showChat, setShowChat] = useState(false);
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Configure marked.js to render code blocks with syntax highlighting
  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  const renderedContent = marked.parse(lesson.content);

  return (
    <Box 
      p={6} 
      borderWidth="1px" 
      borderRadius="lg" 
      bg={bgColor}
      borderColor={borderColor}
      boxShadow="md"
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h1" size="xl">{lesson.title}</Heading>
        <Badge colorScheme="blue" p={2} fontSize="md">{lesson.duration}</Badge>
      </Flex>
      
      <Divider my={4} />
      
      <Box 
        className="lesson-content" 
        dangerouslySetInnerHTML={{ __html: renderedContent }} 
        css={{
          'h1': { fontSize: '2xl', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '0.75rem' },
          'h2': { fontSize: 'xl', fontWeight: 'bold', marginTop: '1.25rem', marginBottom: '0.5rem' },
          'ul, ol': { paddingLeft: '1.5rem', margin: '0.75rem 0' },
          'li': { marginBottom: '0.25rem' },
          'p': { marginBottom: '0.75rem' },
          'pre': { 
            padding: '1rem', 
            borderRadius: '0.375rem', 
            backgroundColor: '#1A202C', 
            color: 'white', 
            overflow: 'auto',
            fontSize: '0.875rem',
            margin: '1rem 0'
          },
          'code': {
            fontFamily: 'monospace',
            padding: '0.125rem',
            borderRadius: '0.125rem',
            backgroundColor: '#EDF2F7',
            fontSize: '0.9em'
          },
          'pre code': {
            padding: 0,
            backgroundColor: 'transparent',
          }
        }}
      />
      
      <Divider my={6} />
      
      <Flex justify="space-between" align="center" mt={6}>
        <Button 
          colorScheme="gray" 
          onClick={onPrevious} 
          isDisabled={!hasPrevious}
        >
          Previous
        </Button>
        
        <Button 
          colorScheme="blue" 
          variant={showChat ? "solid" : "outline"}
          onClick={() => setShowChat(!showChat)}
        >
          {showChat ? "Hide Tutor" : "Ask Tutor"}
        </Button>
        
        <Button 
          colorScheme="blue" 
          onClick={onNext} 
          isDisabled={!hasNext}
        >
          Next
        </Button>
      </Flex>
      
      {showChat && (
        <Box mt={6}>
          <Chat />
        </Box>
      )}
      
      {lesson.hasExercise && (
        <Flex 
          mt={6} 
          p={4} 
          borderWidth="1px" 
          borderRadius="md" 
          borderColor="green.200" 
          bg="green.50"
          direction="column"
          align="center"
        >
          <Text fontWeight="bold" fontSize="lg">This lesson has a practical exercise</Text>
          <Text>Ask the AI Tutor for guidance on completing the exercise</Text>
          {!showChat && (
            <Button 
              mt={2} 
              colorScheme="green" 
              onClick={() => setShowChat(true)}
            >
              Open Tutor
            </Button>
          )}
        </Flex>
      )}
    </Box>
  );
};

export default LessonContent;
