import React from 'react'

const PublicLayout = (props) =>{
    return(
        <div className="form-container">
        <div className="form-background">
          <h1>title</h1>
        </div>

        {props.children}
      </div>
    )
}
export default PublicLayout