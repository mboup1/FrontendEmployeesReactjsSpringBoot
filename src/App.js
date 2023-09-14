import { Route, Routes } from "react-router-dom";

import CreateEmployee from './components/CreateEmployee';
import NavEmployer from './components/NavEmployer';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateEmployee from "./components/UpdateEmployee";
import EmployeesList from "./components/EmployeesList";

function App() {
  return (
    <div className="App">
      <NavEmployer />
      <Routes>
        <Route path="/employers" element={<EmployeesList />} />
        <Route path="/employer" element={<CreateEmployee />} />
        <Route path="/employer/:id" element={<UpdateEmployee />} />
      </Routes>
    </div>

  );
}

export default App;
