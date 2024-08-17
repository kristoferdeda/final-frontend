import React, { useState } from 'react';
import { Link } from "react-router-dom";

function EditEmployeeView({ employee, handleSubmit }) {
    const [tasks, setTasks] = useState(employee?.tasks || []);
    const [newTasks, setNewTasks] = useState([""]); 

    if (!employee) {
        return (
            <section>
                <h2>Employee not found!</h2>
            </section>
        );
    }

    const handleTaskChange = (e, index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = { ...updatedTasks[index], content: e.target.value };
        setTasks(updatedTasks);
    };

    const handleNewTaskChange = (e, index) => {
        const updatedNewTasks = [...newTasks];
        updatedNewTasks[index] = e.target.value;
        setNewTasks(updatedNewTasks);
    };

    const handleAddNewTaskField = () => {
        setNewTasks([...newTasks, ""]);
    };

    const handleRemoveTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const handleRemoveNewTaskField = (index) => {
        const updatedNewTasks = newTasks.filter((_, i) => i !== index);
        setNewTasks(updatedNewTasks);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const updatedTasks = [
            ...tasks,
            ...newTasks.filter(task => task.trim() !== "").map(taskContent => ({ content: taskContent }))
        ];
        handleSubmit(updatedTasks);
    };

    return (
        <div>
            <h3>Edit Employee Information:</h3>
            <form onSubmit={handleFormSubmit} id="editemployeeform">
                <label> First Name:
                    <input name="firstname" defaultValue={employee.firstname} required />
                </label>
                <br />
                <label> Last Name:
                    <input name="lastname" defaultValue={employee.lastname} required />
                </label>
                <br />
                <label> Department:
                    <input name="department" defaultValue={employee.department} required/>
                </label>
                <br />

                <h3>Assigned Tasks:</h3>
                {tasks.map((task, index) => (
                    <div key={index}>
                        <label> Task {index + 1}:
                            <input
                                type="text"
                                value={task.content}
                                onChange={(e) => handleTaskChange(e, index)}
                                required
                            />
                        </label>
                        <button type="button" onClick={() => handleRemoveTask(index)} style={{ marginLeft: "10px" }}>
                            Remove Task
                        </button>
                        <br />
                    </div>
                ))}

                <h3>Add New Tasks:</h3>
                {newTasks.map((taskContent, index) => (
                    <div key={index}>
                        <label> New Task {index + 1}:
                            <input
                                type="text"
                                value={taskContent}
                                onChange={(e) => handleNewTaskChange(e, index)}
                            />
                        </label>
                        <button type="button" onClick={() => handleRemoveNewTaskField(index)} style={{ marginLeft: "10px" }}>
                            Remove New Task
                        </button>
                        <br />
                    </div>
                ))}
                <button type="button" onClick={handleAddNewTaskField} style={{ marginTop: "10px" }}>
                    Add Another Task
                </button>
                <br />

                <button type="submit" style={{ marginTop: "20px" }}>Save Employee</button>
                <Link to={`/employees`}><button style={{ marginLeft: "10px" }}>Back to All Employees</button></Link>
            </form>
        </div>
    );
}

export default EditEmployeeView;
