import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Box, Container, Flex, Button, Text, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon } from '@chakra-ui/react';
import { ChevronRightIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { courseModules } from '../utils/courseData';
import LessonContent from '../components/LessonContent';
import { Module, Lesson } from '../utils/courseData';

const LessonPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [nextLesson, setNextLesson] = useState<Lesson | null>(null);
  const [prevLesson, setPrevLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    if (!lessonId) return;

    // Find the current lesson and its module
    let foundLesson: Lesson | null = null;
    let foundModule: Module | null = null;
    let foundLessonIndex = -1;
    let foundModuleIndex = -1;

    for (let i = 0; i < courseModules.length; i++) {
      const module = courseModules[i];
      const lessonIndex = module.lessons.findIndex(lesson => lesson.id === lessonId);
      
      if (lessonIndex !== -1) {
        foundLesson = module.lessons[lessonIndex];
        foundModule = module;
        foundLessonIndex = lessonIndex;
        foundModuleIndex = i;
        break;
      }
    }

    setCurrentLesson(foundLesson);
    setCurrentModule(foundModule);

    // Determine next and previous lessons
    if (foundModule && foundLessonIndex !== -1) {
      // Previous lesson
      if (foundLessonIndex > 0) {
        // Previous lesson in the same module
        setPrevLesson(foundModule.lessons[foundLessonIndex - 1]);
      } else if (foundModuleIndex > 0) {
        // Last lesson of the previous module
        const prevModule = courseModules[foundModuleIndex - 1];
        setPrevLesson(prevModule.lessons[prevModule.lessons.length - 1]);
      } else {
        setPrevLesson(null);
      }

      // Next lesson
      if (foundLessonIndex < foundModule.lessons.length - 1) {
        // Next lesson in the same module
        setNextLesson(foundModule.lessons[foundLessonIndex + 1]);
      } else if (foundModuleIndex < courseModules.length - 1) {
        // First lesson of the next module
        const nextModule = courseModules[foundModuleIndex + 1];
        setNextLesson(nextModule.lessons[0]);
      } else {
        setNextLesson(null);
      }
    }
  }, [lessonId]);

  const handleNext = () => {
    if (nextLesson) {
      navigate(`/lessons/${nextLesson.id}`);
    }
  };

  const handlePrevious = () => {
    if (prevLesson) {
      navigate(`/lessons/${prevLesson.id}`);
    }
  };

  if (!currentLesson || !currentModule) {
    return (
      <Container maxW="container.lg" py={8}>
        <Text>Lesson not found</Text>
        <Link to="/">
          <Button leftIcon={<ArrowBackIcon />} mt={4}>
            Return to Course Home
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={8}>
      <Flex direction="column">
        <Breadcrumb 
          separator={<ChevronRightIcon color="gray.500" />} 
          mb={6}
          fontSize="sm"
        >
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">{currentModule.title}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">{currentLesson.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <LessonContent 
          lesson={currentLesson} 
          onNext={handleNext} 
          onPrevious={handlePrevious} 
          hasNext={nextLesson !== null} 
          hasPrevious={prevLesson !== null} 
        />

        <Flex justify="center" mt={8}>
          <Link to="/">
            <Button leftIcon={<ArrowBackIcon />} variant="outline">
              Return to Course Home
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
};

export default LessonPage;
