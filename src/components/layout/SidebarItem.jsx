import React from 'react';
import { ListItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  margin: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(1),
  backgroundColor: active ? theme.palette.primary.light : 'transparent',
  color: active ? theme.palette.common.white : theme.palette.text.primary,
  '&:hover': {
    backgroundColor: active 
      ? theme.palette.primary.light 
      : theme.palette.action.hover,
  },
  minHeight: 48,
}));

const SidebarItem = ({ icon, text, path, open }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const active = location.pathname === path;

  const listItem = (
    <StyledListItem
      button
      active={active ? 1 : 0}
      onClick={() => navigate(path)}
      sx={{
        justifyContent: open ? 'initial' : 'center',
        px: 2.5,
      }}
    >
      <ListItemIcon 
        sx={{ 
          color: active ? 'white' : 'inherit',
          minWidth: 0,
          mr: open ? 3 : 'auto',
          justifyContent: 'center',
        }}
      >
        {icon}
      </ListItemIcon>
      {open && <ListItemText primary={text} sx={{ opacity: 1 }} />}
    </StyledListItem>
  );

  return open ? (
    listItem
  ) : (
    <Tooltip title={text} placement="right">
      {listItem}
    </Tooltip>
  );
};

export default SidebarItem; 