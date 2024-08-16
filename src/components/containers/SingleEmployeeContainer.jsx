import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees } from '../../store/employeesSlice';
import { useEffect, useState } from 'react';
import SingleEmployeeView from '../views/SingleEmployeeView';

function SingleEmployeeContainer() {
  const { employeeId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchEmployees());
      setLoading(false);
    };
    loadData();
  }, [dispatch]);

  const employee = useSelector(state =>
    state.employees.find(emp => emp.id === parseInt(employeeId))
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!employee) {
    return <div>Employee not found!</div>;
  }

  return (
    <SingleEmployeeView employee={employee} />
  );
}

export default SingleEmployeeContainer;
