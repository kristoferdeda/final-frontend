import { Link } from "react-router-dom";

function SingleTaskView({ task, employees, handleSubmit}) {
    if (!task) {
        return (
          <section>
            <h2>Task not found!</h2>
          </section>
        );
      }

      let priorities = ["Low", "Medium", "High"];
      let employeeAssigned = task.employee ? 
        <Link to={`../employees`}>{task.employee.firstname + " " + task.employee.lastname}</Link>
        : "None";

      
    
      return (
        <div>
        <Link to="../tasks"><button style={{margin: "8px"}}>Back to all tasks</button></Link>
        <section>
          <article>
            <h2>{task.content}</h2>
            <p>Priority: {priorities[task.priority-1]}</p>
            <p>Assigned to: {employeeAssigned}</p>
          </article>
        </section>
        <hr/>
        <Link to={`edit/`}><button style={{margin: "8px"}}>Edit task information</button></Link>
      
        </div>

      );
}

export default SingleTaskView;