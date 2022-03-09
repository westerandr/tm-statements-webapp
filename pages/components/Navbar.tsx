import { useState } from 'react';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import useFirebaseAuth from '../../lib/hooks/useFirebaseAuth';
import { toast } from 'material-react-toastify';

const settings = ['Logout'];

function Navbar() {
  const { authUser, signOut } = useFirebaseAuth();
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const logOut = () => {
    signOut();
    router.replace('/login');
    toast("Successfully Logged Out", { type: 'success' });
  }

  const handleSetting = (setting: string) => {
    if(setting === 'Logout'){
      logOut();
    }
  }

  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  return (
    <AppBar position="static" color='secondary'>
        <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Avatar sx={{ width: 50, height: 50 }} src="/logo.jpg" />
          </Typography>          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <Avatar sx={{ width: 50, height: 50 }} src="/logo.jpg" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>
                  {authUser?.email?.charAt(0)?.toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleSetting(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar