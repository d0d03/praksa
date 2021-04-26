const employeesReducer = (state,action) => {
    switch(action.type){
        case 'ADD_EMPLOYEE':
            return[
                ...state,
                {
                    id:action.id,
                    firstName:action.firstName,
                    lastName: action.lastName,
                    maxHours: action.maxHours,
                    username: action.username 
                }
            ];
        case 'REMOVE_EMPLOYEE':
            return state.filter((employee)=>(
                employee.id !== action.id
            ));
        default:
            return state;
    }
}

export { employeesReducer as default }