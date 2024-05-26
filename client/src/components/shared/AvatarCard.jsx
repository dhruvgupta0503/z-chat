import React from 'react';
import PropTypes from 'prop-types'; // Import prop-types library
import { Avatar, AvatarGroup, Box, Stack } from '@mui/material';
import { transformImage } from '../../lib/features';

const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction="row" spacing={0.5}>
      <AvatarGroup max={max}
      sx={{
        position:"relative",
      }}>
        <Box width="5rem" height="3rem" position="relative">
          {avatar.map((i, index) => (
            <Avatar
              key={Math.random()*100}
              src={transformImage(i)}
              alt={`Avatar ${index}`}
              sx={{
                width: "3rem",
                height: "3rem",
                position: "absolute",
                left: `${0.5 + index}rem`, // Added backticks for interpolation
              }}
            />
          ))}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

// Prop validation
AvatarCard.propTypes = {
  avatar: PropTypes.arrayOf(PropTypes.string), // Array of string URLs for avatars
  max: PropTypes.number, // Maximum number of avatars to display
};

export default AvatarCard;
