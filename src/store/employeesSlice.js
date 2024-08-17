const initialState = [];


export function employeesReducer(state = initialState, action) {
  switch (action.type) {
      case 'employees/employeesLoaded':
          return action.payload;
      case 'employees/employeeCreated':
          return [...state, action.payload];
      case 'employees/employeeDeleted':
          return state.filter(employee => employee.id !== action.payload);
      case 'employees/employeeUpdated':
          return state.map(employee => 
            employee.id === action.payload.id ? action.payload : employee
          );
      default:
          return state;
  }
}



import axios from "axios";
const PATH = "http://localhost:5001/api/employees";

export const fetchEmployees = () => async dispatch => {
  try {
      let res = await axios.get(`${PATH}`);
      dispatch({ type: 'employees/employeesLoaded', payload: res.data });
  } catch (err) {
      console.error("Error fetching employees:", err);
  }
};


export const deleteEmployee = employeeId => async dispatch => {
  try {
    await axios.delete(`${PATH}/${employeeId}`);
    dispatch({type: 'employees/employeeDeleted', payload: employeeId});
  } catch(err) {
    console.error(err);
  }
};

export const addEmployee = employee => async dispatch => {
  try {
    const res = await axios.post(`${PATH}`, employee);
    const newEmployee = { ...res.data, tasks: res.data.tasks || [] };
    dispatch({ type: 'employees/employeeCreated', payload: newEmployee });
  } catch (err) {
    console.error("Error adding employee:", err);
  }
};

export const editEmployee = (employee) => async dispatch => {
  try {
      const res = await axios.put(`${PATH}/${employee.id}`, employee);
      dispatch({ type: 'employees/employeeUpdated', payload: res.data });
      return res.data; 
  } catch (err) {
      console.error("Error editing employee:", err);
      throw err; 
  }
};