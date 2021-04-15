import {history} from '../routers/AppRouter';

const userReducer = (state, action) =>{
    switch(action.type){
        case 'LOGIN':
            localStorage.setItem('token',action.token);
            history.push('/');
            return {...state,username: action.username,token:action.token};
        case 'LOGOUT':
            localStorage.clear();
            history.push('/login');
            return {...state,username:'',token:''};
        default:
            return state;
    }
}


export { userReducer as default }

