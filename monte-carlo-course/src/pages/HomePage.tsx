import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Button, 
  Flex, 
  Badge, 
  Icon, 
  Grid, 
  Progress, 
  Accordion,
  SimpleGrid
} from '@chakra-ui/react';
import { courseModules, PathOption, filterModulesByDifficulty } from '../utils/courseData';
import CourseModule from '../components/CourseModule';
import { Link } from 'react-router-dom';
import { FaRegLightbulb, FaChalkboardTeacher, FaRocket, FaBookOpen } from 'react-icons/fa';
import { FiBarChart2, FiAward, FiPieChart, FiTrendingUp } from 'react-icons/fi';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

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
      p={3} 
      borderRadius="md"
      boxShadow="sm"
      position="relative"
      overflow="hidden"
      height="100%"
      borderWidth="1px"
      borderColor="var(--border-light)"
      _hover={{ boxShadow: "md", borderColor: "var(--accent-primary-alpha)" }}
      transition="all 0.2s"
    >
      <Flex justify="space-between" mb={2}>
        <Text fontSize="xs" color="var(--text-muted)" fontWeight="500">{title}</Text>
        <Box color={color}>{icon}</Box>
      </Flex>
      <Text fontSize="xl" fontWeight="bold" mb={1}>{value}</Text>
      {secondaryValue && (
        <Text fontSize="sm" color="var(--text-secondary)">{secondaryValue}</Text>
      )}
      {trend && (
        <Flex align="center" mt={2}>
          <Box as="span" mr={1} color={trend === 'increase' ? 'var(--success)' : 'var(--error)'}>
            {trend === 'increase' ? '↑' : '↓'}
          </Box>
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
      p={3}
      borderRadius="md"
      boxShadow="sm"
      border={isSelected ? `1px solid ${getColor()}60` : '1px solid var(--border-light)'}
      onClick={() => onClick(difficulty)}
      role="button"
      aria-selected={isSelected}
      cursor="pointer"
      transition="all 0.2s"
      _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
      height="100%"
    >
      <Flex direction="column" h="100%">
        <Flex justify="space-between" align="center" mb={2}>
          <Badge colorScheme={difficulty === 'easy' ? 'green' : difficulty === 'medium' ? 'orange' : 'red'} variant="subtle" px={2} fontSize="xs">
            {difficulty.toUpperCase()}
          </Badge>
          <Box color={getColor()}>{icon}</Box>
        </Flex>
        <Text fontWeight="bold" fontSize="sm" color="var(--text-primary)">{title}</Text>
        <Text fontSize="xs" color="var(--text-secondary)" mt={1} mb="auto">{description}</Text>
      </Flex>
    </Box>
  );
};

const HomePage: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<PathOption>('all');
  const [filteredModules, setFilteredModules] = useState(courseModules);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const totalLessons = courseModules.reduce((sum, module) => sum + module.lessons.length, 0);
  const completedLessons = 3; // Mock data, would come from user progress tracking
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

  useEffect(() => {
    setFilteredModules(filterModulesByDifficulty(courseModules, selectedDifficulty));
  }, [selectedDifficulty]);

  // Mock data for charts
  const weeklyProgressData = [
    { day: 'Mon', hours: 1.2 },
    { day: 'Tue', hours: 0.8 },
    { day: 'Wed', hours: 1.5 },
    { day: 'Thu', hours: 0.6 },
    { day: 'Fri', hours: 0.3 },
    { day: 'Sat', hours: 0.5 },
    { day: 'Sun', hours: 0.4 }
  ];

  const pieData = [
    { name: 'Completed', value: completedLessons, color: '#4ADE80' },
    { name: 'Remaining', value: totalLessons - completedLessons, color: '#1C1E32' }
  ];

  const COLORS = ['#4ADE80', '#1C1E32'];

  return (
    <Box pt={2} pb={8}>
      {/* Header Section */}
      <Box className="header-section" mb={6}>
        <Heading as="h1" size="xl" mb={2} className="gradient-text">
          Monte Carlo Algorithms
        </Heading>
        <Text fontSize={{ base: "sm", md: "md" }} color="var(--text-secondary)">
          Interactive course on Monte Carlo methods with real-world applications
        </Text>
      </Box>
      
      {/* Dashboard Analytics and Stats */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
        {/* Course Progress Card with Chart */}
        <Box 
          p={4} 
          borderRadius="md" 
          bg="var(--background-card)" 
          boxShadow="sm"
          borderWidth="1px"
          borderColor="var(--border-light)"
          className="hover-card"
        >
          <Flex justify="space-between" align="center" mb={4}>
            <Box>
              <Text fontWeight="500" mb={1}>Course Progress</Text>
              <Flex align="center">
                <Text fontSize="2xl" fontWeight="bold" mr={2}>{progressPercentage}%</Text>
                <Badge colorScheme="green" fontSize="xs">+15% from last week</Badge>
              </Flex>
            </Box>
            <Icon as={FiPieChart} boxSize={6} color="var(--accent-primary)" />
          </Flex>
          
          <Box height="160px">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} lessons`, '']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
          
          <Text fontSize="sm" color="var(--text-secondary)" mt={2}>
            {completedLessons}/{totalLessons} lessons completed
          </Text>
        </Box>
        
        {/* Study Time Chart */}
        <Box 
          p={4} 
          borderRadius="md" 
          bg="var(--background-card)" 
          boxShadow="sm"
          borderWidth="1px"
          borderColor="var(--border-light)"
          className="hover-card"
        >
          <Flex justify="space-between" align="center" mb={4}>
            <Box>
              <Text fontWeight="500" mb={1}>Weekly Study Time</Text>
              <Text fontSize="2xl" fontWeight="bold">5.3 hours</Text>
            </Box>
            <Icon as={FiTrendingUp} boxSize={6} color="var(--warning)" />
          </Flex>
          
          <Box height="160px">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={weeklyProgressData}
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7B66FF" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#7B66FF" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" strokeOpacity={0.2} />
                <XAxis dataKey="day" stroke="#8A8D9A" fontSize={12} />
                <YAxis stroke="#8A8D9A" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#22253A', borderColor: '#333', borderRadius: '8px' }}
                  labelStyle={{ color: '#FFFFFF' }}
                  itemStyle={{ color: '#FFFFFF' }}
                />
                <Area type="monotone" dataKey="hours" stroke="#7B66FF" fillOpacity={1} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
          
          <Flex align="center" mt={2} fontSize="sm" color="var(--success)">
            <Icon as={FiTrendingUp} mr={1} />
            <Text>2.1 hours more than last week</Text>
          </Flex>
        </Box>
      </SimpleGrid>
      
      {/* Additional Stats */}
      <Grid templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(2, 1fr)" }} gap={4} mb={6}>
        <DashboardCard 
          title="Completed Modules" 
          value="1 of 4" 
          icon={<Icon as={FiBarChart2} boxSize={5} />} 
          color="var(--info)"
          secondaryValue="25% completion"
        />
        <DashboardCard 
          title="Achievements" 
          value="4 earned" 
          icon={<Icon as={FiAward} boxSize={5} />} 
          color="var(--success)"
          secondaryValue="2 more available"
        />
      </Grid>

      {/* Course Overview */}
      <Box mb={6} p={4} borderRadius="md" bg="var(--background-card)" boxShadow="sm" position="relative" overflow="hidden" border="1px solid var(--border-light)" className="hover-card">
        <Box position="absolute" top={0} left={0} w="4px" h="100%" bg="var(--accent-primary)" />
        <Heading as="h1" size="md" mb={2} color="var(--text-primary)" fontWeight="600">Monte Carlo Methods</Heading>
        <Text fontSize="sm" mb={3} color="var(--text-secondary)">Master Monte Carlo algorithms and their applications in data analytics. Learn implementation techniques for simulations, optimization, and machine learning tasks.</Text>
        
        <Flex justify="space-between" align="center">
          <Flex align="center" gap={2}>
            <Icon as={FaBookOpen} color="var(--text-muted)" />
            <Text fontSize="sm" color="var(--text-muted)">8 hours • 4 modules • {totalLessons} lessons</Text>
          </Flex>
          <Button 
            as={Link} 
            to={`/lessons/${filteredModules[0]?.lessons[0]?.id}`} 
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
      <Heading as="h2" size="md" mb={2} color="var(--text-primary)" className="gradient-text">Choose Your Learning Path</Heading>
      <Text fontSize="sm" mb={3} color="var(--text-secondary)">Select the difficulty level that matches your experience with Monte Carlo methods.</Text>

      <Grid templateColumns={{ base: "repeat(3, 1fr)" }} gap={3} mb={6}>
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

      {/* Module Cards */}
      <Heading as="h2" size="md" mb={2} color="var(--text-primary)" className="gradient-text">Course Modules</Heading>
      <Text fontSize="sm" mb={4} color="var(--text-secondary)">
        {selectedDifficulty === 'all' ? 'Showing all modules.' : `Showing ${selectedDifficulty} difficulty modules.`}
      </Text>
      
      <Box className="course-modules" w="100%" mb={6}>
        <Accordion 
          allowToggle 
          w="100%"
          onChange={(expandedIndex) => {
            const index = typeof expandedIndex === 'number' ? expandedIndex : -1;
            setActiveModule(index >= 0 ? filteredModules[index]?.id || null : null);
          }}
        >
          {filteredModules.map((module) => (
            <CourseModule 
              key={module.id} 
              module={module}
              isActive={module.id === activeModule}
            />
          ))}
        </Accordion>
      </Box>
    </Box>
  );
};

export default HomePage;
