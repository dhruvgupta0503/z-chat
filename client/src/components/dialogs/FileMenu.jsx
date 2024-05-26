import { Menu } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const FileMenu = ({ anchorE1 }) => {
   return (
     <Menu  anchorEl={anchorE1} open ={false}>
        <div style={{
            width:"10rem"
        }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos exercitationem quae ducimus provident laboriosam, placeat temporibus doloremque laudantium minus sunt rem architecto non necessitatibus, iusto accusantium. Odio totam aperiam nobis?
        </div>
     </Menu>
   );
};

// Prop validation for FileMenu component
FileMenu.propTypes = {
  anchorE1: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.string,
  ])
};

export default FileMenu;
