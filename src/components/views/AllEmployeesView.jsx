import './styles/all-tasksAndEmployees.css';

let ulStyle = {
  border: "3px solid #0d0",
  width: "70%",
  margin: "0 auto",
  overflow: "auto",
};

let liStyle = {
  padding: "8px 16px",
  borderBottom: "3px solid #0d0",
  backgroundColor: "#e5f0e1",
  textAlign: "center", // Center the content inside each list item
};

let liStyleLastChild = {
  ...liStyle,
  borderBottom: "none",
};

import { Link } from "react-router-dom";

function AllEmployeesView({ employees = [], deleteEmployee }) { // Default to an empty array if employees is undefined
  if (!employees.length) {
    return (
      <>
        <Link to={`/`}><button>Back to Home</button></Link>
        <Link to={`/employees/new`}><button style={{ margin: "8px" }}>Add Employee</button></Link>
        <div>There are no employees.</div>
      </>
    );
  }

  return (
    <div id="bgview" style={{ display: "flex", flexDirection: "column", padding: "8px", minWidth: "500px" }} >
      <Link to={`/`}><button style={{ margin: "8px" }}>Back to Home</button></Link>
      <Link to={`/employees/new`}><button style={{ margin: "8px" }}>Add Employee</button></Link>
      <div style={ulStyle}>
        {employees.map((todo, idx) => {
          let styleBool = idx === employees.length - 1 ? liStyleLastChild : liStyle;
          return (
            <div key={todo.id} style={styleBool}>
              <h4>Employee #{idx + 1}: <Link to={`/employees/${todo.id}`}>{todo.firstname} {todo.lastname}</Link></h4>
              <h5>Department: {todo.department ? todo.department : "None"}</h5>
              <h5>Tasks Assigned: 
                {todo.tasks && todo.tasks.length > 0 ? (
                  todo.tasks.map((task, index) => (
                    <span key={task.id}>
                      <Link to={`/tasks/${task.id}`}> {task.content ? task.content : "None"}</Link>
                      {index < todo.tasks.length - 1 && ", "}
                    </span>
                  ))
                ) : (
                  <span> No tasks assigned</span>
                )}
              </h5>

              <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                <button onClick={() => deleteEmployee(todo.id)}>Delete</button>
                <Link to={`/employees/${todo.id}/edit`}>
                  <button>Edit</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllEmployeesView;
