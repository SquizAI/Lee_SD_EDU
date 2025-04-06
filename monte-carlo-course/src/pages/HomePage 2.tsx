import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Button, 
  Flex, 
  Badge, 
  SimpleGrid, 
  Icon, 
  Grid, 
  Progress, 
  StatArrow 
} from '@chakra-ui/react';
import { courseModules, PathOption, filterModulesByDifficulty } from '../utils/courseData';
import CourseModule from '../components/CourseModule';
import { Link } from 'react-router-dom';
import { FaRegLightbulb, FaChalkboardTeacher, FaRocket, FaBookOpen } from 'react-icons/fa';
import { FiBarChart2, FiClock, FiAward, FiPieChart } from 'react-icons/fi';

const DashboardCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactElement;
  color?: string;
  secondaryValue?: string;
  trend?: 'increase' | 'decrease';
  trendValue?: string;
}> = ({ title, value, icon, color = 'var(--accent-primary)', secondaryValue, trend, trendValue }) => {
  return (
    <Box 
      bg="var(--background-card)" 
      p={4} 
      borderRadius="var(--border-radius-md)"
      boxShadow="var(--shadow-card)"
      position="relative"
      overflow="hidden"
    >
      <Flex justify="space-between" mb={3}>
        <Text fontSize="sm" color="var(--text-muted)" fontWeight="500">{title}</Text>
        <Box color={color}>{icon}</Box>
      </Flex>
      <Text fontSize="2xl" fontWeight="bold" mb={1}>{value}</Text>
      {secondaryValue && (
        <Text fontSize="sm" color="var(--text-secondary)">{secondaryValue}</Text>
      )}
      {trend && (
        <Flex align="center" mt={2}>
          <StatArrow type={trend} color={trend === 'increase' ? 'var(--success)' : 'var(--error)'} />
          <Text fontSize="xs" color={trend === 'increase' ? 'var(--success)' : 'var(--error)'}>
            {trendValue}
          </Text>
        </Flex>
      )}
    </Box>
  );
};

const LearningPathOption: React.FC<{
  title: string;
  description: string;
  difficulty: PathOption;
  icon: React.ReactElement;
  isSelected: boolean;
  onClick: (difficulty: PathOption) => void;
}> = ({ title, description, difficulty, icon, isSelected, onClick }) => {
  const getColor = () => {
    switch(difficulty) {
      case 'easy': return 'var(--success)';
      case 'medium': return 'var(--warning)';
      case 'hard': return 'var(--error)';
      default: return 'var(--accent-primary)';
    }
  };
  
  return (
    <Box 
      bg={isSelected ? `linear-gradient(135deg, var(--background-card) 0%, ${getColor()}20 100%)` : 'var(--background-card)'}
      p={4}
      borderRadius="var(--border-radius-md)"
      boxShadow="var(--shadow-card)"
      border={isSelected ? `1px solid ${getColor()}60` : '1px solid var(--border-light)'}
      onClick={() => onClick(difficulty)}
      role="button"
      aria-selected={isSelected}
      cursor="pointer"
      transition="all 0.2s"
      _hover={{ transform: 'translateY(-2px)', boxShadow: 'var(--shadow-lg)' }}
    >
      <Flex direction="column" gap={2}>
        <Flex justify="space-between" align="center">
          <Badge colorScheme={difficulty === 'easy' ? 'green' : difficulty === 'medium' ? 'orange' : 'red'} variant="subtle" px={2}>
            {difficulty.toUpperCase()}
          </Badge>
          <Box color={getColor()}>{icon}</Box>
        </Flex>
        <Text fontWeight="bold" mt={2} color="var(--text-primary)">{title}</Text>
        <Text fontSize="sm" color="var(--text-secondary)">{description}</Text>
      </Flex>
    </Box>
  );
};

type DashboardCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactElement;
  color?: string;
  secondaryValue?: string;
  trend?: 'increase' | 'decrease';
  trendValue?: string;
};

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  value, 
  icon, 
  color = 'var(--accent-primary)', 
  secondaryValue, 
  trend, 
  trendValue 
}) => {
  return (
    <Box 
      bg="var(--background-card)" 
      p={4} 
      borderRadius="var(--border-radius-md)"
      boxShadow="var(--shadow-card)"
      position="relative"
      overflow="hidden"
    >
      <Flex justify="space-between" mb={3}>
        <Text fontSize="sm" color="var(--text-muted)" fontWeight="500">{title}</Text>
        <Box color={color}>{icon}</Box>
      </Flex>
      <Text fontSize="2xl" fontWeight="bold" mb={1}>{value}</Text>
      {secondaryValue && (
        <Text fontSize="sm" color="var(--text-secondary)">{secondaryValue}</Text>
      )}
      {trend && (
        <Flex align="center" mt={2}>
          <StatArrow type={trend} color={trend === 'increase' ? 'var(--success)' : 'var(--error)'} />
          <Text fontSize="xs" color={trend === 'increase' ? 'var(--success)' : 'var(--error)'}>
            {trendValue}
          </Text>
        </Flex>
      )}
    </Box>
  );
};

type LearningPathOptionProps = {
  title: string;
  description: string;
  difficulty: PathOption;
  icon: React.ReactElement;
  isSelected: boolean;
  onClick: (difficulty: PathOption) => void;
};

const LearningPathOption: React.FC<LearningPathOptionProps> = ({ 
  title, 
  description, 
  difficulty, 
  icon, 
  isSelected, 
  onClick 
}) => {
  const getColor = () => {
    switch(difficulty) {
      case 'easy': return 'var(--success)';
      case 'medium': return 'var(--warning)';
      case 'hard': return 'var(--error)';
      default: return 'var(--accent-primary)';
    }
  };
  
  return (
    <Box 
      bg={isSelected ? `linear-gradient(135deg, var(--background-card) 0%, ${getColor()}20 100%)` : 'var(--background-card)'}
      p={4}
      borderRadius="var(--border-radius-md)"
      boxShadow="var(--shadow-card)"
      border={isSelected ? `1px solid ${getColor()}60` : '1px solid var(--border-light)'}
      onClick={() => onClick(difficulty)}
      role="button"
      aria-selected={isSelected}
      cursor="pointer"
      transition="all 0.2s"
      _hover={{ transform: 'translateY(-2px)', boxShadow: 'var(--shadow-lg)' }}
    >
      <Flex direction="column" gap={2}>
        <Flex justify="space-between" align="center">
          <Badge colorScheme={difficulty === 'easy' ? 'green' : difficulty === 'medium' ? 'orange' : 'red'} variant="subtle" px={2}>
            {difficulty.toUpperCase()}
          </Badge>
          <Box color={getColor()}>{icon}</Box>
        </Flex>
        <Text fontWeight="bold" mt={2} color="var(--text-primary)">{title}</Text>
        <Text fontSize="sm" color="var(--text-secondary)">{description}</Text>
      </Flex>
    </Box>
  );
};

const HomePage: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<PathOption>('all');
  const [filteredModules, setFilteredModules] = useState(courseModules);
  const totalLessons = courseModules.reduce((sum, module) => sum + module.lessons.length, 0);
  const completedLessons = 3; // Mock data, would come from user progress tracking
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

  useEffect(() => {
    setFilteredModules(filterModulesByDifficulty(courseModules, selectedDifficulty));
  }, [selectedDifficulty]);

  return (
    <Box pb={8}>
      {/* Top Stats Dashboard */}
      <Grid templateColumns="repeat(4, 1fr)" gap={6} mb={8}>
        <DashboardCard 
          title="Course Progress" 
          value={`${progressPercentage}%`} 
          icon={<Icon as={FiPieChart} boxSize={5} />} 
          secondaryValue={`${completedLessons}/${totalLessons} lessons completed`}
          trend="increase"
          trendValue="15% from last week"
        />
        <DashboardCard 
          title="Study Time" 
          value="5.3 hours" 
          icon={<Icon as={FiClock} boxSize={5} />} 
          color="var(--warning)"
          secondaryValue="This week"
          trend="increase"
          trendValue="2.1 hours more"
        />
        <DashboardCard 
          title="Completed Modules" 
          value={`${Math.floor(completedLessons / 3)} of ${courseModules.length}`} 
          icon={<Icon as={FiBarChart2} boxSize={5} />} 
          color="var(--info)"
        />
        <DashboardCard 
          title="Achievements" 
          value="4 earned" 
          icon={<Icon as={FiAward} boxSize={5} />} 
          color="var(--success)"
          secondaryValue="2 achievements available"
        />
      </Grid>

      {/* Course Overview */}
      <Box mb={8} p={5} borderRadius="var(--border-radius-md)" bg="var(--background-card)" boxShadow="var(--shadow-card)" position="relative" overflow="hidden">
        <Box position="absolute" top={0} left={0} w="4px" h="100%" bg="var(--accent-primary)" />
        <Heading as="h1" size="lg" mb={3} color="var(--text-primary)" fontWeight="600">Monte Carlo Methods</Heading>
        <Text mb={4} color="var(--text-secondary)">Master Monte Carlo algorithms and their applications in data analytics. Learn implementation techniques for simulations, optimization, and machine learning tasks.</Text>
        
        <Flex justify="space-between" align="center">
          <Flex align="center" gap={2}>
            <Icon as={FaBookOpen} color="var(--text-muted)" />
            <Text fontSize="sm" color="var(--text-muted)">8 hours • 4 modules • {totalLessons} lessons</Text>
          </Flex>
          <Button 
            as={Link} 
            to={`/lesson/${filteredModules[0]?.lessons[0]?.id}`} 
            size="md" 
            bg="var(--accent-primary)" 
            color="white"
            _hover={{ bg: 'var(--accent-tertiary)' }}
            fontWeight="500"
          >
            Continue Learning
          </Button>
        </Flex>
        
        <Box mt={5}>
          <Text fontSize="sm" color="var(--text-muted)" mb={2}>Overall Progress</Text>
          <Progress value={progressPercentage} size="sm" colorScheme="purple" borderRadius="full" bg="var(--background-secondary)" />
        </Box>
      </Box>
      
      {/* Learning Path Selection */}
      <Heading as="h2" size="md" mb={4} color="var(--text-primary)">Choose Your Learning Path</Heading>
      <Text mb={6} color="var(--text-secondary)">Select the difficulty level that matches your experience with Monte Carlo methods.</Text>

      <Grid templateColumns="repeat(3, 1fr)" gap={6} mb={8}>
        <LearningPathOption
          title="Beginner"
          description="Start with the fundamentals and core concepts."
          difficulty="easy"
          icon={<Icon as={FaRegLightbulb} boxSize={5} />}
          isSelected={selectedDifficulty === 'easy'}
          onClick={setSelectedDifficulty}
        />
        <LearningPathOption
          title="Intermediate"
          description="Build on basics with more complex applications."
          difficulty="medium"
          icon={<Icon as={FaChalkboardTeacher} boxSize={5} />}
          isSelected={selectedDifficulty === 'medium'}
          onClick={setSelectedDifficulty}
        />
        <LearningPathOption
          title="Advanced"
          description="Deep dive into advanced topics and techniques."
          difficulty="hard"
          icon={<Icon as={FaRocket} boxSize={5} />}
          isSelected={selectedDifficulty === 'hard'}
          onClick={setSelectedDifficulty}
        />
      </Grid>
      
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
