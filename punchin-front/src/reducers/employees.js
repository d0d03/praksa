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
        case 'GET_EMPLOYEE':
                return state.map((employee) => {
                    if(employee.id === action.id){
                        return {
                            ...employee
                        };
                    }
                });
        default:
            return state;
    }
}

export { employeesReducer as default }