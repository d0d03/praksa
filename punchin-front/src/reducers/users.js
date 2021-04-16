const userReducer = (state, action) =>{
    switch(action.type){
        case 'LOGIN':
            localStorage.setItem('token',action.token);
            return {...state,username: action.username,token:action.token};
        case 'LOGOUT':
            localStorage.clear();
            return {...state,username:'',token:''};
        case 'SET_USER_DATA':
            return {...state, email:action.email };
        default:
            return state;
    }
}


export { userReducer as default }

