import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PaymentIcon from '@mui/icons-material/Payment';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'لوحة التحكم', icon: <DashboardIcon />, path: '/dashboard' },
    { label: 'الطلاب', icon: <PeopleIcon />, path: '/students' },
    { label: 'المدرسون', icon: <SchoolIcon />, path: '/teachers' },
    { label: 'الفصول', icon: <ClassIcon />, path: '/classes' },
    { label: 'الدرجات', icon: <AssignmentIcon />, path: '/grades' },
    { label: 'الرسوم', icon: <PaymentIcon />, path: '/payments' },
    { label: 'المساعد الذكي', icon: <SmartToyIcon />, path: '/ai' },
  ];

  return (
    <Drawer variant="permanent" sx={{ width: 250, '& .MuiDrawer-paper': { width: 250, boxSizing: 'border-box', backgroundColor: '#F5F7FA' } }}>
      <Box sx={{ p: 2 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                mb: 1,
                borderRadius: '8px',
                '&:hover': { backgroundColor: '#0B2C6F', color: 'white' },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
