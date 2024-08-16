import { Link } from "react-router-dom";

function SingleEmployeeView({employee}) {
    if (!employee) {
        return (
          <section>
            <h2>Employee not found!</h2>
          </section>
        );
      }
    
      return (
        <section>
          <article>
            <h2>Name: {employee.firstname} {employee.lastname}</h2>
            <h5>Department: {employee.department ? employee.department : "None"}</h5>
            <h5>Tasks Assigned: 
              {employee.tasks && employee.tasks.length > 0 ? (
                employee.tasks.map((task, index) => (
                  <span key={task.id}>
                    <Link to={`/tasks/${task.id}`}> {task.content ? task.content : "None"}</Link>
                    {index < employee.tasks.length - 1 && ", "}
                  </span>
                ))
              ) : (
                <span> No tasks assigned</span>
              )}
            </h5>
            <Link to={`/employees`}><button style={{margin: "8px"}}>Back to All Employees</button></Link>
            <Link to={`edit/`}><button style={{margin: "8px"}}>Edit Employee information</button></Link>

          </article>
        </section>
      );
}

export default SingleEmployeeView;
