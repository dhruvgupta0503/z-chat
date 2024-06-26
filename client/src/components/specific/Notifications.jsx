import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Dialog,
  DialogTitle,
  ListItem,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { blueGrey, grey } from '@mui/material/colors'; // Import MUI colors
import { sampleNotifications } from '../../constants/sampleData';

const Notifications = () => {
  const friendRequesthandler = () => {};

  return (
    <Dialog open>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"} sx={{ backgroundColor: grey[100], borderRadius: '10px' }}>
        <DialogTitle sx={{ backgroundColor: blueGrey[500], color: '#fff', borderRadius: '10px 10px 0 0' }}>Notifications</DialogTitle>
        {
          sampleNotifications.length > 0 ? (
            sampleNotifications.map((sender, index) => (
              <NotificationItem sender={sender} key={index} handler={friendRequesthandler} />
            ))
          ) : (
            <Typography textAlign="center" mt={2}>No notifications</Typography>
          )
        }
      </Stack>
    </Dialog>
  );
};

Notifications.displayName = 'Notifications';

const NotificationItem = memo(({ sender, handler }) => {
  const { name, avatar } = sender || {}; // Destructure name and avatar from sender object

  return (
    <ListItem sx={{ borderBottom: '1px solid #ccc' }}>
      <Stack direction="row" alignItems="center" spacing={2} width="100%">
        <Avatar src={avatar} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {name ? `${name} sent you a friend request.` : 'Unknown sender'}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" color="primary" onClick={() => handler({ accept: true })}>Accept</Button>
          <Button variant="outlined" color="error" onClick={() => handler({ accept: false })}>Reject</Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

NotificationItem.displayName = 'NotificationItem';

// Prop validation for NotificationItem
NotificationItem.propTypes = {
  sender: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
  handler: PropTypes.func.isRequired,
};

export default Notifications;
