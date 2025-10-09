import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useState } from 'react';
import type { User } from '../models/user';
import { ListItemIcon, ListItemText } from '@mui/material';
import { History, Logout, Person } from '@mui/icons-material';
import { useLogoutMutation } from '../../features/acccount/accountApi';

type Props = {user:User}

export default function UserMenu({user}: Props) {
    const [logout] = useLogoutMutation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        color='inherit'
        size='large'
        sx={{fontSize:'1.1rem'}}
      >
        {user.email}
      </Button>
      <Menu
        id="fade-menu"
        slotProps={{
          list: {
            'aria-labelledby': 'fade-button',
          },
        }}
        slots={{ transition: Fade }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem>
            <ListItemIcon>
                <Person />
            </ListItemIcon>
            <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem>
            <ListItemIcon>
                <History />
            </ListItemIcon>
            <ListItemText>My Orders</ListItemText>
        </MenuItem>
        <MenuItem onClick={logout}>
            <ListItemIcon>
                <Logout />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}