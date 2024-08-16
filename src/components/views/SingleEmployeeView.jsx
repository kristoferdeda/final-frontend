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
                {employee.tasks.length > 0 ? (
                    employee.tasks.map(task => (
                        <h5 key={task.id}>Tasks Assigned: {task.content}</h5>
                    ))
                ) : (
                    <p>None</p>
                )}
            <Link to={`/employees`}><button style={{margin: "8px"}}>Back to All Employees</button></Link>
          </article>
        </section>
      );
}

export default SingleEmployeeView;
