import React from 'react'
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '.5em'

  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60,

  },
  paper: {
    height: '100vh',
    background: '#333',
    background: 'linear-gradient(to top, #232526, #414345)',
    borderRadius:0,
    color: 'white',
    fontSize: '.5em'
  },
}));


export const Nav = () =>{

    return(
        <div id="nav">
            <h3>APPNAME</h3>
            <ChatBubbleIcon/>
        </div>
    )
}

export const LeftNav = ()=>{
    const classes = useStyles();
    return(
    <div className={classes.root}>
       
      <Paper className={classes.paper}>
        <MenuList>
      
          <MenuItem><HomeIcon/></MenuItem>
          <MenuItem><DateRangeIcon/></MenuItem>
          <MenuItem><PermContactCalendarIcon/></MenuItem>
          <MenuItem><AttachMoneyIcon/></MenuItem>
        </MenuList>
      </Paper>
      </div>
      )
}
