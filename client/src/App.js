import React,{useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'



const App =(props)=>{
  
  const [upcomingAppts, setUpcomingAppts] = useState([])

  useEffect(()=>{
    const fetchAppts = () =>{
      axios.get('http://localhost:5000/appts/upcoming')
        .then(appt=>{
          setUpcomingAppts(appt.data)
        })
    }
    fetchAppts()
  },[])
  
  const handleClick = ()=>{
    props.history.push('/schedule')
  }
  // let d = new Date()
  // let todaysDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' +  d.getFullYear()
    return (
      <React.Fragment>
      <div id="welcome">
        <h1>Welcome, (name)</h1>
      </div>
      <div class="grid-container">
        <div class="Upcoming-Appts">
          <h3>Upcoming Appointments</h3>
          {upcomingAppts.map(appt=>{
            let datestring = appt.start
            let start = new Date(datestring)
            let startDate = (start.getMonth() + 1) + '/' + start.getDate() + '/' +  start.getFullYear()
            let startTime = (`${start.getHours()}:${start.getMinutes()}`)
            let endString =(appt.end)
            let end = new Date(endString)
            let endTime =(`${end.getHours()}:${end.getMinutes()}`)

            return(
              <React.Fragment>
              <div id="upcoming-appt">
                <div>{appt.title}</div>
                {/* <div>{startDate}</div> */}
                <div>{startTime}-{endTime}</div>
              </div>
              </React.Fragment>
            ) 
          })}

<button onClick={handleClick}>View All</button>
        </div>
        <div class="child" id="active-clients">
          <h3>Active Clients</h3>
        </div>
        <div class="child" id="messages">
          <h3>Messages</h3>
        </div>
        <div class="child" id="revenue">
          <h3>Revenue</h3>
        </div>
        <div class="child" id="settings">
          <h3>Settings</h3>
        </div>
      </div>
      </React.Fragment>


    )

}

export default App;
