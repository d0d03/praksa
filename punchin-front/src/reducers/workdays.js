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
                    note: action.note
                }
            ];
        case 'REMOVE_WORKDAY':
            return state.filter((workday) => workday.id !== action.id)
        default:
            return state;
    }
}

export { workdaysReducer as default }