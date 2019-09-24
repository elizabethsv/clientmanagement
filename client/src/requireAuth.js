import React from 'react'
import {connect} from 'react-redux'

export default (ComposedComponent)=>{
    const Authenticate = (props) =>{
        if(!props.isAuthenticated){
            props.history.push('/login')
        }

        return(
            <ComposedComponent {...props}/>
        )
    }
    const mapStateToProps = (state)=>{
        return{
            isAuthenticated: state.isAuthenticated
        }
    }
    return connect(mapStateToProps)(Authenticate)
}

