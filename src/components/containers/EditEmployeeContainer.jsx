import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees, editEmployee } from '../../store/employeesSlice';
import { fetchTasks, addTask, deleteTask, editTask } from '../../store/tasksSlice'; // Import task actions
import { useEffect } from 'react';
import EditEmployeeView from '../views/EditEmployeeView';

function EditEmployeeContainer() {
  const { employeeId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchTasks()); // Fetch tasks to ensure all data is up to date
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

    // Handle existing tasks: update or delete
    for (let task of employee.tasks) {
      if (!updatedTasks.some(t => t.id === task.id)) {
        // Task is not in the updated list, so remove it
        await dispatch(deleteTask(task.id));
      } else {
        // Task is in the updated list, update it
        const updatedTask = updatedTasks.find(t => t.id === task.id);
        await dispatch(editTask({ ...task, content: updatedTask.content }));
      }
    }

    // Handle new tasks: add them to the database
    const newTasks = updatedTasks.filter(t => !t.id);
    for (let task of newTasks) {
      await dispatch(addTask({ ...task, employeeId: employee.id }));
    }

    // Dispatch the action to edit the employee
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
