import React from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
// import dayGridPlugin from '@fullcalendar/daygrid'; // for dayGridMonth view
import '../../main.scss'
import CancelAppt from './CancelAppt'
import Popover from '@material-ui/core/Popover';

const MobileSchedule = () =>{
    return(<FullCalendar defaultView="timeGridDay" 
                                header = {{
                                    left:   'prev',
                                    center: 'title',
                                    right:  'next'
                                }} 
                                height={600}
                                // ref={calendarRef}
                                plugins={[ timeGridPlugin, interactionPlugin ]}
                                selectMirror={true}
                                selectOverlap={false}
                                nowIndicator={true}
                                editable={true}
                                // eventClick={(info)=>handleClick(info)}
                                // eventDrop={(info)=>updateAppt(info)}
                                // eventSources={events}
                />)
}

export default MobileSchedule