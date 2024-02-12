import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';
import beast_otw_maroon from '../../Home/images/beast_otw-removebg.png';
import beast_otw_white from '../../Home/images/beast_otw_white-removebg.png';
import '../styles/NavBarStyles.css';
import { Typography, Divider } from '@mui/material';

const NavBar = (props) => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    //const history = useHistory();

    const pages = [
        { link: 'home', display: 'Home' },
        { link: 'about', display: 'About' },
        { link: 'seasons', display: 'Seasons' },
        { link: 'matches', display: 'Team Matches' },
        { link: 'wrestlers', display: 'Wrestlers' },
        { link: 'records', display: 'Records' },
        { link: 'schools', display: 'School Directory' },
        { link: 'staff', display: 'Coaching Staff' },
    ];

    return (
        <>
            <div>
                <AppBar
                    position="fixed"
                    sx={{
                        boxShadow: 0,
                        bgcolor: 'transparent',
                        backgroundImage: 'none',
                        mt: 2,
                    }}
                >
                    <Container maxWidth="md">
                        <Toolbar
                            variant="regular"
                            sx={(theme) => ({
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexShrink: 0,
                                borderRadius: '999px',
                                bgcolor: 'rgba(0, 0, 0, 0)',
                                backdropFilter: 'blur(24px)',
                                maxHeight: 40,
                                border: '1px solid',
                                borderColor: 'divider',
                                boxShadow:
                                    '0 0 1px rgba(128, 0, 0, .7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(128, 0, 0, .7)',
                            })}
                        >
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    ml: '-18px',
                                    px: 0,
                                    height: 60,
                                }}
                            >
                                <img
                                    src={beast_otw_maroon}
                                    alt="Beast of the week"
                                    className="siteLogo"
                                />
                                <Box
                                    sx={{ display: { xs: 'none', md: 'flex' } }}
                                >
                                    {pages.map((page) => (
                                        <MenuItem
                                            sx={{ py: '6px', px: '12px' }}
                                        >
                                            <Link
                                                variant="body2"
                                                color="#800000"
                                                fontFamily="text.primary"
                                                href={`/${page.link}`}
                                            >
                                                {page.display}
                                            </Link>
                                        </MenuItem>
                                    ))}
                                </Box>
                            </Box>
                            <Box sx={{ display: { sm: '', md: 'none' } }}>
                                <Button
                                    variant="text"
                                    color="primary"
                                    aria-label="menu"
                                    onClick={toggleDrawer(true)}
                                    sx={{ minWidth: '30px', p: '4px' }}
                                >
                                    <MenuIcon />
                                </Button>
                                <Drawer
                                    anchor="right"
                                    open={open}
                                    onClose={toggleDrawer(false)}
                                >
                                    <Box
                                        sx={{
                                            minWidth: '60dvw',
                                            p: 2,
                                            backgroundColor: 'background.paper',
                                            flexGrow: 1,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'end',
                                                flexGrow: 1,
                                            }}
                                        ></Box>
                                        {pages.map((page) => (
                                            <MenuItem
                                                sx={{ py: '6px', px: '12px' }}
                                            >
                                                <Link
                                                    variant="body2"
                                                    color="text.secondary"
                                                    href={`/${page.link}`}
                                                >
                                                    {page.display}
                                                </Link>
                                            </MenuItem>
                                        ))}
                                    </Box>
                                </Drawer>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </div>
        </>
    );
};

export default NavBar;
