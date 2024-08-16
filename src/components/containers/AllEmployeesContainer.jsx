import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, deleteEmployee } from '../../store/employeesSlice';
import AllEmployeesView from '../views/AllEmployeesView';

function AllEmployeesContainer() {
    const dispatch = useDispatch();
    const employees = useSelector(state => state.employees);

    const deleteDispatch = (employeeId) => dispatch(deleteEmployee(employeeId));

    useEffect(() => {
        dispatch(fetchEmployees());
      }, [dispatch]);
    
    return (
       <AllEmployeesView employees={employees} deleteEmployee={deleteDispatch} />
    );
}

export default AllEmployeesContainer;
