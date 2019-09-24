const initialState = {
    isAuthenticated: false
}

const reducer = (state = initialState, action)=>{
    console.log(action.type)
    switch(action.type){
        case 'ON_LOGIN':
            return{
                ...state,
                isAuthenticated: action.token ? true:false
            }
    }
    return state
}

export default reducer