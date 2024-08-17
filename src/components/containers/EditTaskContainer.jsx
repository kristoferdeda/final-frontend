import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, editTask } from '../../store/tasksSlice';
import { fetchEmployees } from '../../store/employeesSlice';
import { useEffect } from 'react';

import EditTaskView from '../views/EditTaskView';

function EditTaskContainer() {
  let { taskId } = useParams(); 
  taskId = parseInt(taskId); 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const task = useSelector(state =>
    state.tasks.find(task => task.id === taskId)
  );
  const employees = useSelector((state) => state.employees);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

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