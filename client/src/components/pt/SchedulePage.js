import React,{Component} from 'react';
import ClientList from './ClientList'
import {Schedule,Notes} from './Schedule'
import Button from '@material-ui/core/Button';
import './Pt.css'

//have to seperate these!
import { createMuiTheme, withStyles, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


class SchedulePage extends Component {
  routeChange=()=> {
    let path = `/addappt`;
    this.props.history.push(path);
  }
 
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Schedule/>
          <div id="schedule-right">
            <Button variant="contained" color="inherit" onClick={()=>{this.routeChange()}}>Add Appointment</Button>
            <ClientList/>
            <Notes className="schedule-options"/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SchedulePage;
