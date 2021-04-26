const userReducer = (state, action) =>{
    switch(action.type){
        case 'LOGIN':
            localStorage.setItem('token',action.token);
            localStorage.setItem('username',action.username);
            localStorage.setItem('roles',action.roles);
            return {...state,username: action.username,token:action.token,roles: action.roles};
        case 'LOGOUT':
            localStorage.clear();
            return {...state,username:'',token:'',roles:''};
        default:
            return state;
    }
}

export { userReducer as default }

