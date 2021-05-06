const workdaysReducer = (state, action) => {
    switch(action.type){
        case 'POPULATE_WORKDAYS':
            localStorage.setItem('workdays', JSON.stringify(action.workdays));
            return action.workdays;
        case 'ADD_WORKDAY':
            return [
                ...state,
                {
                    id: action.id,
                    date : action.date,
                    start : action.start,
                    end : action.end,
                    hours : action.hours, 
                    note: action.note,
                    isConfirmed: action.isConfirmed
                }
            ];
        case 'REMOVE_WORKDAY':
            return state.filter((workday) => workday.id !== action.id)
        case 'EDIT_WORKDAY':
            return state.map((workday) => {
                if(workday.id === action.id){
                    return {
                        ...workday,
                        ...action.updates
                    };
                }else{
                    return workday;
                };
            });
        default:
            return state;
    }
}

export { workdaysReducer as default }