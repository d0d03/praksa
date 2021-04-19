const userReducer = (state, action) =>{
    switch(action.type){
        case 'LOGIN':
            localStorage.setItem('token',action.token);
            localStorage.setItem('username',action.username);
            return {...state,username: action.username,token:action.token};
        case 'LOGOUT':
            localStorage.clear();
            return {...state,username:'',token:''};
        default:
            return state;
    }
}

export { userReducer as default }

