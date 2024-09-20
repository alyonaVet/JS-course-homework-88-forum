import {Avatar, Box, Button, Menu, MenuItem} from '@mui/material';
import {User} from '../../types';
import React, {useState} from 'react';
import PersonIcon from '@mui/icons-material/Person';
import {Link} from 'react-router-dom';
import {useAppDispatch} from '../../app/hooks';
 import {logout} from '../../features/users/usersThunk';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box display="flex" alignItems="center">
      <Avatar sx={{backgroundColor: '#fff', color: '#448aff', mr: 1}}>
        <PersonIcon/>
      </Avatar>
      <Button onClick={handleClick} color="inherit">
        {user.username}
      </Button>
      <Menu anchorEl={anchorEl} open={isOpen} keepMounted onClose={handleClose}>
        <MenuItem component={Link} to="/new-post">Add new post</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;