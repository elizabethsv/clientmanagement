import React from 'react'
const TimeLength = (props)=>{
    return(
        <select onChange={props.getMin} defaultValue="none">
                <option value="none" disabled hidden>
                    Select Length
                </option>
                <option value="30">
                    30 min
                </option>
                <option value="45">
                    45 min
                </option>
                <option value="60">
                    60 min
                </option>
            </select>
    )
}

export default TimeLength