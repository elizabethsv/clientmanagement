import React,{Component} from 'react';

import Calendar from 'react-calendar';
import {Schedule,Notes} from './components/pt/Schedule'
import Button from '@material-ui/core/Button';
import './App.css';
import {Nav, LeftNav} from './components/dashboard/Nav'

class App extends Component {
  state = {
    date: new Date(),
  }
 
  onChange = date => this.setState({ date })
 
  render() {
    return (
      <React.Fragment>
        <Nav/>
        
      <div className="container">
      <LeftNav/> 
        <Schedule/>
        <div id="schedule-right">
          <Button variant="contained" color="primary">Add Appointment</Button>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
        <Notes className="schedule-options"/>
        </div>
      </div>
      </React.Fragment>
    );
  }
}

export default App;
