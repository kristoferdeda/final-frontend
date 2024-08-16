import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees, editEmployee } from '../../store/employeesSlice';
import { useEffect } from 'react';
import EditEmployeeView from '../views/EditEmployeeView';

function EditEmployeeContainer() {
  let { employeeId } = useParams(); // Get the employee ID from the URL
  employeeId = parseInt(employeeId); // Convert to integer

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees()); // Fetch employees when the component mounts
  }, [dispatch]);

  // Get the employee from the state based on the URL parameter
  const employee = useSelector(state =>
    state.employees.find(emp => emp.id === employeeId)
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const updates = {
      ...employee,
      firstname: formJson.firstname,
      lastname: formJson.lastname,
      department: formJson.department,
    };

    dispatch(editEmployee(updates));
    dispatch(fetchEmployees()); // Refetch employees to ensure the state is up-to-date

    alert("Employee updated!");
  }

  return <EditEmployeeView employee={employee} handleSubmit={handleSubmit} />;
}

export default EditEmployeeContainer;
