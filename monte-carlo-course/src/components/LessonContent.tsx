import React, { useState } from 'react';
import { Box, Heading, Text, Button, Flex, Divider, Badge, Icon } from '@chakra-ui/react';
import { Lesson } from '../utils/courseData';
import { marked } from 'marked';
import Chat from './Chat';
import { FiArrowRight, FiArrowLeft, FiMessageCircle } from 'react-icons/fi';

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
      borderRadius="md" 
      bg="var(--background-card)" 
      borderColor="var(--border-light)"
      boxShadow="sm"
      className="lesson-container"
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h1" size="xl">{lesson.title}</Heading>
        <Badge colorScheme="blue" p={2} fontSize="md">{lesson.duration}</Badge>
      </Flex>
      
      <Divider my={4} />
      
      <Box 
        className="lesson-content" 
        dangerouslySetInnerHTML={{ __html: renderedContent }} 
        sx={{
          'h1': { fontSize: '2xl', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '0.75rem' },
          'h2': { fontSize: 'xl', fontWeight: 'bold', marginTop: '1.25rem', marginBottom: '0.5rem' },
          'ul, ol': { paddingLeft: '1.5rem', margin: '0.75rem 0' },
          'li': { marginBottom: '0.25rem' },
          'p': { marginBottom: '0.75rem' },
          'pre': { 
            padding: '1rem', 
            borderRadius: '0.375rem', 
            backgroundColor: 'var(--background-secondary)', 
            color: 'var(--text-primary)', 
            overflow: 'auto',
            fontSize: '0.875rem',
            margin: '1rem 0',
            boxShadow: 'var(--shadow-sm)'
          },
          'code': {
            fontFamily: 'monospace',
            padding: '0.125rem',
            borderRadius: '0.125rem',
            backgroundColor: 'var(--background-primary)',
            color: 'var(--accent-secondary)',
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
          leftIcon={<Icon as={FiArrowLeft} />}
          bg={hasPrevious ? 'var(--background-secondary)' : 'transparent'}
          color="var(--text-primary)"
          border="1px solid var(--border-light)"
          onClick={onPrevious} 
          isDisabled={!hasPrevious}
          _hover={{ bg: 'var(--background-primary)' }}
        >
          Previous
        </Button>
        
        <Button 
          leftIcon={<Icon as={FiMessageCircle} />}
          bg={showChat ? 'var(--accent-primary)' : 'transparent'} 
          color={showChat ? 'white' : 'var(--text-primary)'}
          border="1px solid var(--border-light)"
          onClick={() => setShowChat(!showChat)}
          _hover={{ bg: showChat ? 'var(--accent-tertiary)' : 'var(--background-primary)' }}
        >
          {showChat ? "Hide Tutor" : "Ask Tutor"}
        </Button>
        
        <Button 
          rightIcon={<Icon as={FiArrowRight} />}
          bg={hasNext ? 'var(--accent-primary)' : 'transparent'}
          color={hasNext ? 'white' : 'var(--text-primary)'}
          border="1px solid var(--border-light)"
          onClick={onNext} 
          isDisabled={!hasNext}
          _hover={{ bg: hasNext ? 'var(--accent-tertiary)' : 'var(--background-primary)' }}
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
          borderColor="var(--success)" 
          bg="rgba(74, 222, 128, 0.1)"
          direction="column"
          align="center"
        >
          <Text fontWeight="bold" fontSize="lg">This lesson has a practical exercise</Text>
          <Text>Ask the AI Tutor for guidance on completing the exercise</Text>
          {!showChat && (
            <Button 
              mt={2} 
              bg="var(--success)" 
              color="white"
              _hover={{ bg: 'var(--success)', opacity: 0.8 }}
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
