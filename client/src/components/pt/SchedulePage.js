import React,{Component} from 'react';
// import FilterClient from './FilterClient'
import {Schedule,Notes} from './Schedule'
import './Pt.css'



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
            <button onClick={()=>{this.routeChange()}}>Add Appointment</button>
            {/* <FilterClient/>
            <Notes className="schedule-options"/> */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SchedulePage;
