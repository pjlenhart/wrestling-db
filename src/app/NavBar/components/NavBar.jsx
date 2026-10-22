import React, { useLayoutEffect, useRef, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';
import '../styles/NavBarStyles.css';

const NavBar = (props) => {
    const [open, setOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const toolbarRef = useRef(null);
    const measureRef = useRef(null);

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
        { link: 'matchPlaylists', display: 'Match Playlists' },
        { link: 'schools', display: 'School Directory' },
        { link: 'scoresheet', display: 'Scoresheets' },
    ];

    // Collapse to the hamburger whenever the links can't all fit on one
    // line. A hidden copy of the link row reports the width the links need,
    // so this keeps working as links are added or fonts finish loading.
    useLayoutEffect(() => {
        const toolbar = toolbarRef.current;
        const measure = measureRef.current;
        if (!toolbar || !measure) return;

        const check = () => {
            const style = window.getComputedStyle(toolbar);
            const available =
                toolbar.clientWidth -
                parseFloat(style.paddingLeft) -
                parseFloat(style.paddingRight);
            const needsCollapse = measure.scrollWidth > available;
            setCollapsed(needsCollapse);
            if (!needsCollapse) setOpen(false);
        };

        check();
        const observer = new ResizeObserver(check);
        observer.observe(toolbar);
        observer.observe(measure);
        return () => observer.disconnect();
    }, []);

    const renderDesktopItems = () =>
        pages.map((page, index) => (
            <MenuItem key={index} className="navbar-menu-item">
                <Link
                    variant="body2"
                    className="navbar-link-desktop"
                    href={`/${page.link}`}
                >
                    {page.display}
                </Link>
            </MenuItem>
        ));

    return (
        <>
            <div>
                <AppBar position="fixed" className="navbar-appbar">
                    <Container maxWidth="lg">
                        <Toolbar
                            variant="regular"
                            className="navbar-toolbar"
                            ref={toolbarRef}
                        >
                            <Box
                                className="navbar-desktop-menu navbar-measure"
                                ref={measureRef}
                                aria-hidden="true"
                            >
                                {renderDesktopItems()}
                            </Box>
                            {!collapsed && (
                                <Box className="navbar-desktop-menu">
                                    {renderDesktopItems()}
                                </Box>
                            )}
                            {collapsed && (
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
                            )}
                        </Toolbar>
                    </Container>
                </AppBar>
            </div>
        </>
    );
};

export default NavBar;
