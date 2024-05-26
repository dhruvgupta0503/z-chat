import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

import { Helmet } from 'react-helmet-async';

const Title = ({ title = "Chat-App", description = "This is the Chat App called z-chat" }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Helmet>
    );
};

// Add PropTypes validation
Title.propTypes = {
    title: PropTypes.string, // title prop is optional and should be a string
    description: PropTypes.string // description prop is optional and should be a string
};

export default Title;
