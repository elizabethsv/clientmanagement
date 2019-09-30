import React, {useState, useLayoutEffect} from 'react'
// import dayGridPlugin from '@fullcalendar/daygrid'; // for dayGridMonth view
import '../../main.scss'
import CancelAppt from './CancelAppt'
import Popover from '@material-ui/core/Popover';
import DesktopSchedule from './DesktopSchedule'
import MobileSchedule from './MobileSchedule'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
    paper:{
        position: 'absolute',
        padding: '0 10px 10px 10px'
    }
})

const useWindowSize=()=> {
    let [size, setSize] = useState([0, 0]);
    //reads layout from DOM and re-render
    useLayoutEffect(() => {
      const updateSize = ()=> {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }


export const Schedule= (props) => {
    
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null)
    const [xCoords, setxCoords] = useState(null)
    const [yCoords, setyCoords] = useState(null)
    const [selectedAppt, setAppt] = useState({id: null, startdate: null})

    let calendarRef = React.createRef()
    let [width, height] = useWindowSize();

    const refetchEvents=()=>{
        let calendarApi = calendarRef.current.getApi()
        calendarApi.refetchEvents()
        }
    
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
       let start = info.event.start
       console.log(start)
        setAppt({id: info.event.id})
        setxCoords(info.jsEvent.pageX-60)
        setyCoords(info.jsEvent.pageY+10)
        setAnchorEl(info.jsEvent.currentTarget)
        
   }

   const handleClose = ()=>{
       setAnchorEl(null)
   }

   let open = Boolean(anchorEl)
   let id = open ? 'simple-popover' : undefined

    
       
  

    const makeMobile=()=>{
        if(width >900){
            return <DesktopSchedule reference={calendarRef} update={(info)=>updateAppt(info)} handleClick={handleClick} />
        }else{
            return <MobileSchedule reference={calendarRef} update={(info)=>updateAppt(info)} handleClick={handleClick} />
        }
          
        
    }

    // const filterEvents=(id)=>{
    //     let calendarApi = calendarRef.current.getApi()
    //     calendarApi.getEventSourceById( id )
    // }

      
        return (
            <React.Fragment>
                 
                 {makeMobile()}
               
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
                                <h4 id="options">Options</h4>
                               <CancelAppt appt={selectedAppt} refetchEvents={refetchEvents}/>
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
