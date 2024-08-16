import React from 'react';
import { Link } from "react-router-dom";

function NewEmployeeView({ handleSubmit }) {
    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a New Employee</h2>
            <label>
                First Name:
                <input type="text" name="firstname" required />
            </label>
            <br />
            <label>
                Last Name:
                <input type="text" name="lastname" required />
            </label>
            <br />
            <label>
                Department:
                <input type="text" name="department" />
            </label>
            <br />
            <button type="submit">Add Employee</button>
            <Link to={`/employees`}><button style={{margin: "8px"}}>Back to All Employees</button></Link>
        </form>
    );
}

export default NewEmployeeView;
