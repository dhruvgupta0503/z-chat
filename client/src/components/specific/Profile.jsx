import React from 'react';
import { Avatar, Stack, Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { Face as FaceIcon, AlternateEmail as UserNameIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';

const Profile = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6}>
        <Stack spacing={4} direction="column" alignItems="center">
          <Avatar
            src="https://via.placeholder.com/200"
            sx={{
              width: 200,
              height: 200,
              marginBottom: "1rem",
              border: "5px solid #fff",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          />
          <ProfileCard heading="Bio" text="Random" />
          <ProfileCard heading="UserName" text="giggles" Icon={<UserNameIcon />} />
          <ProfileCard heading="Name" text="Giggles" Icon={<FaceIcon />} />
        </Stack>
      </Grid>
    </Grid>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction="row"
    alignItems="center"
    spacing={1}
    color="text.primary"
    textAlign="center"
    sx={{
      backgroundColor: "#f5f5f5",
      padding: "0.5rem 1rem",
      borderRadius: "8px",
      boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
    }}
  >
    {Icon && Icon}
    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color="text.secondary" variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

ProfileCard.propTypes = {
  text: PropTypes.string.isRequired,
  Icon: PropTypes.element,
  heading: PropTypes.string.isRequired,
};

export default Profile;
