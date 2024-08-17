import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees, editEmployee } from '../../store/employeesSlice';
import { fetchTasks, addTask, deleteTask, editTask } from '../../store/tasksSlice'; 
import { useEffect } from 'react';
import EditEmployeeView from '../views/EditEmployeeView';

function EditEmployeeContainer() {
  const { employeeId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchTasks()); 
  }, [dispatch]);

  const employee = useSelector(state =>
    state.employees.find(emp => emp.id === parseInt(employeeId))
  );

  const handleSubmit = async (updatedTasks) => {
    if (!employee) return;

    const form = document.getElementById('editemployeeform');
    const formData = new FormData(form);
    const updatedEmployee = {
      ...employee,
      firstname: formData.get('firstname'),
      lastname: formData.get('lastname'),
      department: formData.get('department')
    };

    for (let task of employee.tasks) {
      if (!updatedTasks.some(t => t.id === task.id)) {
        await dispatch(deleteTask(task.id));
      } else {
        const updatedTask = updatedTasks.find(t => t.id === task.id);
        await dispatch(editTask({ ...task, content: updatedTask.content }));
      }
    }

    const newTasks = updatedTasks.filter(t => !t.id);
    for (let task of newTasks) {
      await dispatch(addTask({ ...task, employeeId: employee.id }));
    }

    await dispatch(editEmployee(updatedEmployee));
    alert("Employee and tasks updated successfully!");
  };

  return (
    <EditEmployeeView
      employee={employee}
      handleSubmit={handleSubmit}
    />
  );
}

export default EditEmployeeContainer;
