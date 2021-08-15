import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';

const user = {
  avatar: 'data:image/jpeg;base64,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',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '#',
    icon: UsersIcon,
    title: 'Customers'
  },
  {
    href: '#',
    icon: ShoppingBagIcon,
    title: 'Products'
  },
  {
    href: '#',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '#',
    icon: SettingsIcon,
    title: 'Settings'
  },
  {
    href: '#',
    icon: LockIcon,
    title: 'Login'
  },
  {
    href: '#',
    icon: UserPlusIcon,
    title: 'Register'
  },
  {
    href: '#',
    icon: AlertCircleIcon,
    title: 'Error'
  }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          backgroundColor: 'background.default',
          m: 2,
          p: 2
        }}
      >
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          Need more?
        </Typography>
        <Typography
          align="center"
          variant="body2"
        >
          Upgrade to PRO version and access 20 more screens
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          <Button
            color="primary"
            component="a"
            href="https://react-material-kit.devias.io"
            variant="contained"
          >
            See PRO version
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
