const workdaysReducer = (state, action) => {
    switch(action.type){
        case 'ADD_WORKDAY':
            return [
                ...state,
                {
                    date : action.date,
                    start : action.start,
                    end : action.end,
                    hours : action.start-action.end, 
                    note: action.note
                }
            ];
        default:
            return state;
    }
}

export { workdaysReducer as default }