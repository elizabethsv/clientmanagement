import React,{Component} from 'react';
import './App.css';
import CancelAppt from './components/pt/CancelAppt'



const App =()=>{
  
  let appts = [{title:'Client name'}, {time: '9:30'}]
  
  
    return (
      <React.Fragment>
      <div id="welcome">
        <h1>Welcome, (name)</h1>
      </div>
      <div class="grid-container">
        <div class="Upcoming-Appts">
          <h3>Upcoming Appointments</h3>
          {appts.map(appt=>{
            return appt.title
          })}
        </div>
        <div class="child">
          <h3>Tasks</h3>
        </div>
        <div class="child">
          <h3>Messages</h3>
        </div>
        <div class="child">
          <h3>Revenue</h3>
        </div>
        <div class="child">
          <h3>Settings</h3>
        </div>
      </div>
      </React.Fragment>


    )

}

export default App;
