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
};

let liStyleLastChild = {
  ...liStyle,
  borderBottom: "none",
};

import { Link } from "react-router-dom";

function AllEmployeesView({employees, deleteEmployee}) {
  if (!employees.length) {
    return (
      <>
      <Link to={`/`}><button>Back to Home</button></Link>
      <Link to={`/employees/new`}><button style={{margin: "8px"}}>Add Employee</button></Link>
      <div>There are no employees.</div>
      </>
    );
  }
  return (
    <div id="bgview" style={{display: "flex", flexDirection: "column", padding: "8px", minWidth: "500px"}} >
      <Link to={`/`}><button style={{margin: "8px"}}>Back to Home</button></Link>
      <Link to={`/employees/new`}><button style={{margin: "8px"}}>Add Employee</button></Link>
      <div style={ulStyle}>
        {employees.map((todo, idx) => {
          let styleBool = idx === employees.length - 1 ? liStyleLastChild : liStyle;
          return (
            <div key={todo.id} style={styleBool}>
              <h4>Employe #{idx+1}: <Link to={`/employees/${todo.id}`}>{todo.firstname} {todo.lastname}</Link></h4>
              <h5>Department: {todo.department ? todo.department : "None"}</h5>
              <h5>Tasks Assigned: 
                {todo.tasks.map(task => (
                    <Link to={`/tasks/${task.id}`}> {task.content ? task.content : "None"}</Link>
                ))}
              </h5>
              <button onClick={() => deleteEmployee(todo.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllEmployeesView;