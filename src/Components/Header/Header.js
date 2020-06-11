import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ArchiveTwoToneIcon from '@material-ui/icons/ArchiveTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import NoteAddTwoToneIcon from '@material-ui/icons/NoteAddTwoTone';
import LabelIcon from '@material-ui/icons/Label';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Logout from '@material-ui/icons/ExitToApp';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { Link } from 'react-router-dom';
import { useStyles } from './header'
import { withRouter } from 'react-router-dom';
var uniqueLables = []
function MiniDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [uniqueLableednotes, setUniqueLableednotes] = React.useState([]);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("Are really want to logout")
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onChangeSearch = (e) => {
        var title = e.target.value;
        setTitle(title);
    }

    const handleSearchNote = (event) => {
        var code = event.keyCode || event.which;
        if (code === 13) {
            if (title !== "") {
                props.props.history.push('/searchNote', { "title": { title } })
            }
        }
    }

    const handleShowLabledNote = (lable) => {
        var lableDetails = {
            'logintoken': localStorage.getItem('token'),
            'lable': lable,
        }
        getLable(lableDetails)
    }

    function handleReadNote() {
        console.log("HLHLHLHLHLHLHLHLHLHLHL");
        var readNoteDetails = {
            'logintoken': localStorage.getItem('token')
        }
        readNotes(readNoteDetails)
    }
    useEffect(() => {
        handleReadNote()
    },[])

    function readNotes(readNoteDetails) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(readNoteDetails)
        };
        fetch(process.env.REACT_APP_HOST + '/readNote', requestOptions)
            .then(response => {
                response.json()
                    .then(data => {
                        if (data.success) {
                            var lableednotes = []

                            data.data.notes.map((note) => {
                                if (note.lable !== null) {
                                    return (lableednotes.push(note))
                                }
                            })
                            uniqueLables = [...new Set(lableednotes.map(lableednotes => lableednotes.lable))]
                                setUniqueLableednotes(uniqueLables)
                            // toast(data.message, { position: toast.POSITION.TOP_CENTER });
                        } else {
                            // toast(data.message, { position: toast.POSITION.TOP_CENTER });
                        }
                    });
            })
    }
    function getLable(lableDetails) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lableDetails)
        };
        fetch(process.env.REACT_APP_HOST + '/getLable', requestOptions)
            .then(response => {
                response.json()
                    .then(data => {
                        if (data.success) {
                            var resultnote = []
                            data.data.notes.map((note) => {
                                return (resultnote.push(note))
                            })
                            props.history.push('/allnotes', { "allNote": resultnote })
                        } else {
                            // toast(data.message, { position: toast.POSITION.TOP_CENTER });
                        }
                    });
            })
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="static" style={{ color: 'black', backgroundColor: "white" }}
                className={clsx(classes.appBar, {
                    // [classes.appBarShift]: open,
                })}>
                <Toolbar>

                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img src={require('../../assets/img/keep.jpeg')} alt="logo" style={{ width: '30px', height: '30px' }} />
                    <Link to="/allnotes" style={{ textDecoration: 'none', paddingLeft: '2%', color: "#6F6968" }} variant="h6">
                        FUNDOO NOTES</Link>
                    {/* </div> */}
                    <div className={classes.search} >
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            style={{ marginTop: '5px' }}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e) => onChangeSearch(e)}
                            onKeyPress={handleSearchNote}
                        />
                    </div>
                    {/* <div >
                        <SearchBar />
                    </div> */}
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>

                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            // aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleClick}

                            color="inherit"
                        >
                            < Logout />
                            {/* sign-out */}
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleLogout} ><Link to="/" style={{ paddingLeft: 13, textDecoration: 'none' }} >Logout</Link></MenuItem>
                        </Menu>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            // aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            // onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                // className={clsx(classes.drawer, {
                //     [classes.drawerOpen]: open,
                //     [classes.drawerClose]: !open,
                // })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>

                    <Link to="/allnotes" style={{ textDecoration: 'none' }}><IconButton style={{ padding: 0, fontSize: "1.2rem" }}><NoteAddTwoToneIcon style={{ marginRight: "40px", fontSize: 25, marginLeft: "30%" }} />AllNotes</IconButton></Link><br /><hr />
                    <Link to="/archive" style={{ textDecoration: 'none' }}><IconButton style={{ padding: 0, fontSize: "1.2rem" }}><ArchiveTwoToneIcon style={{ marginRight: "40px", fontSize: 25, marginLeft: "30%" }} />Archive</IconButton></Link><br /><hr />
                    <Link to="/trash" style={{ textDecoration: 'none' }}><IconButton style={{ padding: 0, fontSize: "1.2rem" }}><DeleteTwoToneIcon style={{ marginRight: "40px", fontSize: 25, marginLeft: "30%" }} />Trash</IconButton></Link><br /><hr />
                </List>
                <Divider />

                {uniqueLableednotes.map((lable, index) =>
                    <div style={{ height: '5%' }} key={index} >
                        <IconButton onClick={() => handleShowLabledNote(lable)} ><LabelIcon style={{ marginRight: "40px", fontSize: 20, marginLeft: "30%" }} key={index} />{lable}</IconButton>
                    </div> 
                )}
            </Drawer>
        </div>
    );
}
export default withRouter(MiniDrawer)