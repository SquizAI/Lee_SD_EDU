import React, { useState, useRef, useEffect } from 'react';
import { Box, Flex, Input, Button, Text, VStack, HStack, Spinner, Divider } from '@chakra-ui/react';
import { useChat } from '../context/ChatContext';
import { ConceptExplanation, ExerciseSolution } from '../api/openai';

const Chat: React.FC = () => {
  const { messages, loading, lastResponse, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || loading) return;
    
    await sendMessage(input);
    setInput('');
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderConceptExplanation = (content: ConceptExplanation) => (
    <Box p={4} borderRadius="md" bg="blue.50" w="100%">
      <Text fontWeight="bold" fontSize="lg">{content.title}</Text>
      <Text fontStyle="italic" mb={2}>{content.summary}</Text>
      <Divider my={2} />
      <Text whiteSpace="pre-wrap">{content.detailed_explanation}</Text>
      
      {content.examples && content.examples.length > 0 && (
        <>
          <Text fontWeight="bold" mt={3}>Examples:</Text>
          <VStack align="start" spacing={1}>
            {content.examples.map((example, idx) => (
              <Text key={idx}>{example}</Text>
            ))}
          </VStack>
        </>
      )}
      
      {content.related_concepts && content.related_concepts.length > 0 && (
        <>
          <Text fontWeight="bold" mt={3}>Related Concepts:</Text>
          <HStack spacing={2} flexWrap="wrap">
            {content.related_concepts.map((concept, idx) => (
              <Text key={idx} bg="gray.100" px={2} py={1} borderRadius="md">{concept}</Text>
            ))}
          </HStack>
        </>
      )}
    </Box>
  );

  const renderExerciseSolution = (content: ExerciseSolution) => (
    <Box p={4} borderRadius="md" bg="green.50" w="100%">
      <Text fontWeight="bold" fontSize="lg">Problem</Text>
      <Text mb={3}>{content.problem_statement}</Text>
      
      <Text fontWeight="bold" fontSize="lg">Solution</Text>
      <VStack align="start" spacing={2}>
        {content.solution_steps.map((step, idx) => (
          <Text key={idx}>{idx + 1}. {step}</Text>
        ))}
      </VStack>
      
      {content.code_example && (
        <>
          <Text fontWeight="bold" mt={3}>Code Example:</Text>
          <Box bg="gray.800" color="white" p={3} borderRadius="md" fontFamily="monospace" overflowX="auto">
            <pre>{content.code_example}</pre>
          </Box>
        </>
      )}
      
      {content.additional_resources && content.additional_resources.length > 0 && (
        <>
          <Text fontWeight="bold" mt={3}>Additional Resources:</Text>
          <VStack align="start">
            {content.additional_resources.map((resource, idx) => (
              <Text key={idx}>• {resource}</Text>
            ))}
          </VStack>
        </>
      )}
    </Box>
  );

  const renderResponse = (response: any) => {
    if (!response) return null;
    
    switch (response.response_type) {
      case 'concept_explanation':
        return renderConceptExplanation(response.content as ConceptExplanation);
      case 'exercise_solution':
        return renderExerciseSolution(response.content as ExerciseSolution);
      case 'general_answer':
        return (
          <Box p={4} borderRadius="md" bg="gray.50" w="100%">
            <Text whiteSpace="pre-wrap">{response.content as string}</Text>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Flex 
      direction="column" 
      h="100%" 
      maxH="700px" 
      w="100%" 
      maxW="800px" 
      mx="auto" 
      borderWidth={1} 
      borderRadius="lg" 
      overflow="hidden"
    >
      <Box flex="1" overflowY="auto" p={4} bg="gray.50">
        <VStack spacing={4} align="stretch">
          {messages.map((msg, idx) => (
            <Box 
              key={idx} 
              alignSelf={msg.role === 'user' ? 'flex-end' : 'flex-start'}
              maxW="80%"
              p={3} 
              borderRadius="lg" 
              bg={msg.role === 'user' ? 'blue.100' : 'white'} 
              borderWidth={msg.role === 'user' ? 0 : 1}
            >
              {msg.role === 'assistant' && lastResponse && idx === messages.length - 1 ? (
                renderResponse(lastResponse)
              ) : (
                <Text>{msg.content}</Text>
              )}
            </Box>
          ))}
          {loading && (
            <Flex justify="center">
              <Spinner />
            </Flex>
          )}
          <div ref={messagesEndRef} />
        </VStack>
      </Box>
      
      <Box p={4} borderTopWidth={1} bg="white">
        <form onSubmit={handleSubmit}>
          <Flex>
            <Input 
              flex="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Monte Carlo algorithms..."
              mr={2}
              disabled={loading}
            />
            <Button 
              colorScheme="blue" 
              type="submit" 
              isLoading={loading}
              loadingText="Sending"
            >
              Send
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default Chat;
