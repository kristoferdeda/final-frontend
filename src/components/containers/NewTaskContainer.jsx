import NewTaskView from "../views/NewTaskView";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addTask } from "../../store/tasksSlice";
import { fetchEmployees } from "../../store/employeesSlice";

function NewTaskContainer() {
    const employees = useSelector((state) => state.employees);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEmployees());
      }, [dispatch]);

    const handleSubmit = (e) => {
        // Prevent server submission
        e.preventDefault();

        // Get data from form
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        // Create the task object and dispatch the `addTask` thunk
        const newTask = {
          content: formJson.taskContent,
          priority: parseInt(formJson.taskPriority),
          employeeId: JSON.parse(formJson.employeeId)
        };

        dispatch(addTask(newTask));
        
        // Reset the form so another task can be added
        e.currentTarget.reset();
      }

    return (
        <NewTaskView handleSubmit={handleSubmit} employees={employees}/>
    );

}

export default NewTaskContainer;