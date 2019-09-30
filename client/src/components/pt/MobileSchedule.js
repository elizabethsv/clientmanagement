import React from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
// import dayGridPlugin from '@fullcalendar/daygrid'; // for dayGridMonth view
import '../../main.scss'
import CancelAppt from './CancelAppt'
import Popover from '@material-ui/core/Popover';
import { isPropsEqual } from '@fullcalendar/core';

const MobileSchedule = (props) =>{


    return(<FullCalendar defaultView="timeGridDay" 
                                header = {{
                                    left:   'prev',
                                    center: 'title',
                                    right:  'next'
                                }} 
                                height={550}
                                ref={props.reference}
                                plugins={[ timeGridPlugin, interactionPlugin ]}
                                selectMirror={true}
                                selectOverlap={false}
                                nowIndicator={true}
                                editable={true}
                                eventClick={(info)=>props.handleClick(info)}
                                eventDrop={(info)=>props.update(info)}
                                eventSources={[{url: 'http://localhost:5000/appts'},
                                {url: 'http://localhost:5000/appts/cancelled',
                                    backgroundColor: '#f73859'}]}
                />
                
                
                
                )
}

export default MobileSchedule