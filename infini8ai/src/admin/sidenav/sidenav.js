import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import { Container } from 'reactstrap';
import logo from '../../Images/logo.png'

import { fire } from '../../config.js';

import Routes from '../routes.js'
import Sub from './SubMenu.js'
import Addgroups from '../groups/groupForm.js'
import Groups from '../groups/groups.js'



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row'
        },

    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: '#04B2AE',
        justifyContent: 'start',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        background: '#04B2AE'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),

    },
}));

function ResponsiveDrawer(props) {
    const { contain } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const logout = (props) => {
        fire.auth().signOut();
        localStorage.removeItem("Login")
        // localStorage.clear()
        window.location.href = '/adminlogin'



    }


    const drawer = (
        <div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={logo}></img>

            </div>
            <Divider />
            <List>

                <Link to='/admin'>
                    <ListItem style={{ textUnderlinePosition: 'under' }} className='nav-links text-white' button key='Admin'>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary='Admin' />
                    </ListItem>
                </Link>
                <Link to='/admin/sub'>
                    <ListItem className='nav-links text-white' button key='verification'>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary='User Verification' />
                    </ListItem>
                </Link>
                <Link to='/admin/groups'>
                    <ListItem className='nav-links text-white' button key='groups'>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary='Groups' />
                    </ListItem>
                </Link>
                <Link to='/admin/tasks2'>
                    <ListItem className='nav-links text-white' button key='tasks'>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary='Tasks' />
                    </ListItem>
                </Link>

                <Link to='/admin/meetings'>
                    <ListItem className='nav-links text-white' button key='meetings'>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary='Meetings' />
                    </ListItem>
                </Link>
                <Link to='/admin/chat'>
                    <ListItem className='nav-links text-white' button key='meetings'>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary='Chat' />
                    </ListItem>
                </Link>


            </List>
            <Divider />
            <List>

                <ListItem onClick={logout} button key='Logout'>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary='Logout' />
                </ListItem>

            </List>
        </div>
    );

    const container = contain !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            {/* <CssBaseline /> */}
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
                style={{ paddingLeft: '30px' }}
            >
                <MenuIcon />
            </IconButton>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                {/* <div className={classes.toolbar} /> */}


                <Switch>
                    <Route path="/admin" component={Routes} />

                </Switch>


            </main>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    contain: PropTypes.func,
};

export default ResponsiveDrawer;
