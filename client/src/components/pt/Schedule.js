import React, {Component} from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
// import dayGridPlugin from '@fullcalendar/daygrid'; // for dayGridMonth view
import '../../main.scss'

const useStyles = {
    calendar:{
        height: "80vh"
    }
}
const classes = useStyles

export class Schedule extends Component{
    constructor(){
        super()
        this.state={appts: {}}
    }
    
    updateAppt = (info) =>{
        let apptid = info.event.id
        let start = info.event.start
        let end = info.event.end
        console.log(start)
        console.log(end)
        fetch(`http://localhost:5000/appts/${apptid}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                start: start,
                end: end,
            })
          })
    }

    

    getApptInfo = (info) =>{
        let apptid = info.event.id
        console.log(apptid)
    }
      
    render(){
        return (
            <React.Fragment>
                <FullCalendar defaultView="timeGridWeek" 
                                header = {{
                                    left:   'prev,next',
                                    center: 'title',
                                    right:  'timeGridWeek, timeGridDay'
                                }} 
                            
                                plugins={[ timeGridPlugin, interactionPlugin ]}
                                selectable={true}
                                selectMirror={true}
                                selectOverlap={false}
                                nowIndicator={true}
                                style={classes.calendar}
                                editable={true}
                                eventClick={(info)=>this.getApptInfo(info)}
                                eventDrop={(info)=>this.updateAppt(info)}
                                //   select={(info)=>addDate(info)}
                                events={{url: 'http://localhost:5000/appts'}}
                />
               
            </React.Fragment>
                )
    }

}
/**SIDE NOTES***/
export const Notes = () =>{
    return(
        <div className="schedule-options">
            <h3>Notes</h3>
            

        </div>
    )
}
