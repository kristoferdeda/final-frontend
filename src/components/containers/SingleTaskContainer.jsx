import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from '../../store/tasksSlice';
import { useEffect, useState } from 'react';
import SingleTaskView from '../views/SingleTaskView';

function SingleTaskContainer() {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchTasks());
      setLoading(false);
    };
    loadData();
  }, [dispatch]);

  const task = useSelector(state =>
    state.tasks.find(task => task.id === parseInt(taskId))
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return <div>Task not found!</div>;
  }

  return (
    <SingleTaskView task={task} />
  );
}

export default SingleTaskContainer;
