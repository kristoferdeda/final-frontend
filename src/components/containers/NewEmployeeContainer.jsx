import React from 'react';
import NewEmployeeView from "../views/NewEmployeeView";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../store/employeesSlice";

function NewEmployeeContainer() {
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        const newEmployee = {
          firstname: formJson.firstname,
          lastname: formJson.lastname,
          department: formJson.department,
        };

        dispatch(addEmployee(newEmployee));
        
        e.currentTarget.reset();
    }

    return <NewEmployeeView handleSubmit={handleSubmit} />;
}

export default NewEmployeeContainer;
