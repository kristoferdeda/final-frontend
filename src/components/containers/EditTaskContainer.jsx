import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, editTask } from '../../store/tasksSlice';
import { fetchEmployees } from '../../store/employeesSlice';
import { useEffect } from 'react';

import EditTaskView from '../views/EditTaskView';

function EditTaskContainer() {
  let { taskId } = useParams(); //get id from URL
  taskId = parseInt(taskId); //convert to integer

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  //get task from state based on URL parameter
  const task = useSelector(state =>
    state.tasks.find(task => task.id === taskId)
  );
  //get employees for dropdown
  const employees = useSelector((state) => state.employees);

  const handleSubmit = (e) => {
    // Prevent server submission
    e.preventDefault();

    // Get data from form
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    // Create the task object and dispatch the `addTask` thunk
    const updates = {
      ...task,
      content: formJson.taskContent,
      priority: parseInt(formJson.taskPriority),
      completed: formJson.completed==="true" ? true : false,
      employeeId: JSON.parse(formJson.employeeId)
    };

    dispatch(editTask(updates));

    alert("Task updated!");

  }

  return <EditTaskView task={task} employees={employees} handleSubmit={handleSubmit}/>
}

export default EditTaskContainer;