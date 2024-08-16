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
        <Link to="../tasks">Back to all tasks</Link>
        <section>
          <article>
            <h2>{task.content}</h2>
            <p>Priority: {priorities[task.priority-1]}</p>
            <p>Assigned to: {employeeAssigned}</p>
          </article>
        </section>
        <hr/>
        <Link to={`edit/`}><h3>Edit task information</h3></Link>
      
        </div>

      );
}

export default SingleTaskView;