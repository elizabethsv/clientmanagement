import React,{Component} from 'react';

// import Calendar from 'react-calendar';
import ClientList from './components/pt/ClientList'
import {Schedule,Notes} from './components/pt/Schedule'
import Button from '@material-ui/core/Button';
import './App.css';
import {Nav, LeftNav} from './components/dashboard/Nav'

class App extends Component {
  

 
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
          <Button variant="contained" color="primary" onClick={()=>{this.routeChange()}}>Add Appointment</Button>
        <ClientList/>
        <Notes className="schedule-options"/>
        </div>
      </div>
      </React.Fragment>
    );
  }
}

export default App;
