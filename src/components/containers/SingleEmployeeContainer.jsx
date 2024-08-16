import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";

import SingleEmployeeView from '../views/SingleEmployeeView';

function SingleEmployeeContainer() {
  let { employeeId } = useParams(); // Get the employee ID from the URL
  employeeId = parseInt(employeeId); // Convert to integer

  // Get the employee from the state based on the URL parameter
  const employee = useSelector(state =>
    state.employees.find(employee => employee.id === employeeId)
  );

  return <SingleEmployeeView employee={employee} />;
}

export default SingleEmployeeContainer;
