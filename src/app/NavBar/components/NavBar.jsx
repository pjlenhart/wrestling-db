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
import '../styles/NavBarStyles.css';

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
        { link: 'moveSearch', display: 'Move Search' },
        { link: 'schools', display: 'School Directory' },
    ];

    return (
        <>
            <div>
                <AppBar position="fixed" className="navbar-appbar">
                    <Container maxWidth="lg">
                        <Toolbar variant="regular" className="navbar-toolbar">
                            <Box className="navbar-logo-container">
                                <img
                                    src={beast_otw_maroon}
                                    alt="Beast of the week"
                                    className="siteLogo"
                                />
                                <Box className="navbar-desktop-menu">
                                    {pages.map((page, index) => (
                                        <MenuItem
                                            key={index}
                                            className="navbar-menu-item"
                                        >
                                            <Link
                                                variant="body2"
                                                className="navbar-link-desktop"
                                                href={`/${page.link}`}
                                            >
                                                {page.display}
                                            </Link>
                                        </MenuItem>
                                    ))}
                                </Box>
                            </Box>
                            <Box className="navbar-mobile-button">
                                <Button
                                    variant="text"
                                    color="primary"
                                    aria-label="menu"
                                    onClick={toggleDrawer(true)}
                                    className="navbar-menu-button"
                                >
                                    <MenuIcon />
                                </Button>
                                <Drawer
                                    anchor="right"
                                    open={open}
                                    onClose={toggleDrawer(false)}
                                >
                                    <Box className="navbar-drawer-content">
                                        <Box className="navbar-drawer-header"></Box>
                                        {pages.map((page, index) => (
                                            <MenuItem
                                                key={index}
                                                className="navbar-menu-item"
                                            >
                                                <Link
                                                    variant="body2"
                                                    className="navbar-link-mobile"
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
