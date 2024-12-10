import React, { useState } from 'react';
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Dialog,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  PersonAdd as ContactIcon,
  Business as CompanyIcon,
  AttachMoney as DealIcon,
  Email as EmailIcon,
  Event as EventIcon,
  Note as NoteIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const QuickActionMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const actions = [
    { icon: <ContactIcon />, name: 'Add Contact', action: () => navigate('/contacts/new') },
    { icon: <CompanyIcon />, name: 'Add Company', action: () => navigate('/companies/new') },
    { icon: <DealIcon />, name: 'Add Deal', action: () => navigate('/deals/new') },
    { icon: <EmailIcon />, name: 'Send Email', action: () => navigate('/email/new') },
    { icon: <EventIcon />, name: 'Schedule', action: () => navigate('/calendar/new') },
    { icon: <NoteIcon />, name: 'Add Note', action: () => navigate('/notes/new') },
  ];

  return (
    <SpeedDial
      ariaLabel="Quick Actions"
      sx={{ position: 'fixed', bottom: 80, right: 16 }}
      icon={<SpeedDialIcon />}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.action}
        />
      ))}
    </SpeedDial>
  );
};

export default QuickActionMenu; 