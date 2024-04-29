import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const ProtectRoute = ({ children, user, redirect = "/login" }) => {
  return user ? children : <Navigate to={redirect} replace />;
};

ProtectRoute.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is passed and is of type node
  user: PropTypes.bool.isRequired, // Ensure user is passed and is of type boolean
  redirect: PropTypes.string // Redirect is optional, if not provided, it defaults to "/login"
};

export default ProtectRoute;
