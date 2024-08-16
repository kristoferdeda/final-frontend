import React from 'react';
import { Link } from "react-router-dom";

function EditEmployeeView({ employee, handleSubmit }) {
    if (!employee) {
        return (
          <section>
            <h2>Employee not found!</h2>
          </section>
        );
    }

    return (
        <div>
            <h3>Edit Employee Information:</h3>
            <form onSubmit={handleSubmit} id="editemployeeform">
                <label> First Name:
                    <input name="firstname" defaultValue={employee.firstname} required />
                </label>
                <br />
                <label> Last Name:
                    <input name="lastname" defaultValue={employee.lastname} required />
                </label>
                <br />
                <label> Department:
                    <input name="department" defaultValue={employee.department} />
                </label>
                <br />
                <button type="submit">Save Employee</button>
                <Link to={`/employees`}><button style={{margin: "8px"}}>Back to All Employees</button></Link>
            </form>
        </div>
    );
}

export default EditEmployeeView;
