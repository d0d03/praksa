const notificationsReducer = (state,action) => {
    switch(action.type){
        case 'POPULATE_NOTIFICATIONS':  
            return action.notifications;  

        case 'ADD_NOTIFICATION':
        return[
                ...state,
                {
                    notificationId : action.notificationId,
                    notificationCode : action.notificationCode,
                    workdayId : action.workdayId,
                    userId : action.userId,
                    username: action.username,
                    workdayDate : action.workdayDate
                }
            ];
        default:
            return state;
    }
}

export {notificationsReducer as default}