import React, {useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
// import dayGridPlugin from '@fullcalendar/daygrid'; // for dayGridMonth view
import '../../main.scss'
import CancelAppt from './CancelAppt'
import Popover from '@material-ui/core/Popover';

import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
    paper:{
        position: 'absolute',
        padding: '20px 10px'
    }
})


export const Schedule= () => {
    
    const classes = useStyles()

    const [anchorEl, setAnchorEl] = useState(null);
    const [xCoords, setxCoords] = useState(null)
    const [yCoords, setyCoords] = useState(null)
    const [selectedAppt, setAppt] = useState(null)
    
    
    const updateAppt = (info) =>{
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
    

   const handleClick = (info) =>{
        setAppt(info.event.id)
        setxCoords(info.jsEvent.pageX-60)
        setyCoords(info.jsEvent.pageY+10)
        setAnchorEl(info.jsEvent.currentTarget)
        
   }

   const handleClose = ()=>{
       setAnchorEl(null)
   }

   let open = Boolean(anchorEl)
   let id = open ? 'simple-popover' : undefined

   
      
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
                                eventClick={(info)=>handleClick(info)}
                                eventDrop={(info)=>updateAppt(info)}
                                //   select={(info)=>addDate(info)}
                                events={{url: 'http://localhost:5000/appts'}}
                />
                            <Popover
                                id={id}
                                open={open}
                                classes={{paper:classes.paper}}
                                anchorEl={anchorEl}
                                anchorPosition={{left: xCoords, top: yCoords}}
                                anchorReference='anchorPosition'
                                onClose={handleClose}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                                }}
                                transformOrigin={{
                                vertical: 'center',
                                horizontal: 'center',
                                }}
                            >
                               <CancelAppt apptid={selectedAppt}/>
                </Popover>
               
            </React.Fragment>
                )
}


/**SIDE NOTES***/
export const Notes = () =>{
    return(
        <div className="schedule-options">
            <h3>Notes</h3>
            

        </div>
    )
}
