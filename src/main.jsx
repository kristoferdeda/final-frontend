import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import AllEmployeesContainer from './components/containers/AllEmployeesContainer.jsx';
import AllTasksContainer from './components/containers/AllTasksContainer.jsx';
import SingleTaskContainer from './components/containers/SingleTaskContainer.jsx';
import NewTaskContainer from './components/containers/NewTaskContainer.jsx';
import EditTaskContainer from './components/containers/EditTaskContainer.jsx';
import SingleEmployeeContainer from './components/containers/SingleEmployeeContainer.jsx';

import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/employees",
    element: <AllEmployeesContainer />,
  },
  {
    path: "/employees/:employeeId",
    element: <SingleEmployeeContainer />,
  },
  {
    path: "/tasks",
    element: <AllTasksContainer />,
  },
  {
    path: "/tasks/new",
    element: <NewTaskContainer />,
  },
  {
    path: "/tasks/:taskId/edit",
    element: <EditTaskContainer />,
  },
  {
    path: "/tasks/:taskId",
    element: <SingleTaskContainer />,
  },

]);

//Redux
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
