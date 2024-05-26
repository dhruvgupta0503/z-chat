// Home.jsx
import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import { Box, Typography } from '@mui/material';
import { grayColor } from '../constants/color';

// Home component needs to be a function component
const Home = () => {
  return (
  <Box bgcolor={grayColor} height={"100%"} >
    <Typography p={"2rem"} variant="h5" textAlign={"center"}>Select a friend to Chat</Typography>
  </Box>
  );
};

// Wrap Home component with AppLayout
const HomeWithLayout = AppLayout(Home);

export default HomeWithLayout;
