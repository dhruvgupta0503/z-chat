// MessageComponent.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@mui/material';
import moment from 'moment';
import { fileFormat } from '../../lib/features';
import RenderAttachment from './RenderAttachment';

const MessageComponent = ({ message, user }) => {
    const { sender, content, attachments = [], createdAt } = message;

    //console.log(attachments); kuch galti hai 

    const timeAgo = moment(createdAt).fromNow();

    const sameSender = sender?._id === user?._id;

    return (
        <div
            style={{
                alignSelf: sameSender ? 'flex-end' : 'flex-start',
                display: 'flex', // Added display flex
                alignItems: 'center', // Added align items
                backgroundColor: 'white',
                color: 'black',
                borderRadius: '5px',
                padding: '0.5rem',
                width: 'fit-content',
            }}
        >
            {user.avatar && !sameSender && ( // Check if user.avatar exists and not sameSender
                <img
                    src={user.avatar[0]} // Assuming avatar is an array with one URL
                    alt={user.name}
                    style={{ width: '30px', height: '30px', marginRight: '0.5rem' }} // Adjust size and spacing as needed
                />
            )}
            <div>
                {!sameSender && (
                    <Typography color="#2694ab" fontWeight="600" variant="caption">
                        {sender.name}
                    </Typography>
                )}
                {content && <Typography>{content}</Typography>}
                {attachments.length > 0 &&
                    attachments.map((attachment, index) => {
                        const url = attachment.url;
                        const file = fileFormat(url);
                        //console.log(attachment)  bhari galti hai 

                        return (
                            <Box key={index} style={{ marginTop: '0.5rem' }}> {/* Added margin top */}
                                <a href={url} target="_blank" download style={{ color: 'black' }}>
                                    {RenderAttachment(file, url)}
                                </a>
                            </Box>
                        );
                    })}
                <Typography variant="caption" color="text.secondary">
                    {timeAgo}
                </Typography>
            </div>
        </div>
    );
};

// Define prop types for MessageComponent
MessageComponent.propTypes = {
    message: PropTypes.object.isRequired,
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
        avatar: PropTypes.arrayOf(PropTypes.string), // Assuming avatar is an array of strings
    }).isRequired,
};

export default MessageComponent;
