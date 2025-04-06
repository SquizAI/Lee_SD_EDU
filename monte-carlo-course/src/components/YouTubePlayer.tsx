import React, { useState } from 'react';
import { Box, Text, Spinner } from '@chakra-ui/react';

interface YouTubePlayerProps {
  videoId: string;
  title: string;
  description?: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId, title, description }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="resource-card">
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
        {isLoading && (
          <Box 
            position="absolute" 
            top="0" 
            left="0" 
            width="100%" 
            height="100%" 
            display="flex" 
            alignItems="center" 
            justifyContent="center"
            backgroundColor="rgba(0,0,0,0.05)"
          >
            <Spinner size="xl" color="blue.500" />
          </Box>
        )}
        <iframe 
          src={`https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0`}
          title={title}
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          onLoad={() => setIsLoading(false)}
        />
      </div>
      {description && (
        <Text className="resource-description">{description}</Text>
      )}
    </div>
  );
};

export default YouTubePlayer;
