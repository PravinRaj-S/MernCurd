import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./templates/user/Main";
import CreateUser from "./templates/user/CreateUser";
import UpdateUser from "./templates/user/UpdateUser";

const App = () =>{
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/createuser" element={<CreateUser />}></Route>
      <Route path="/updateuser/:id" element={<UpdateUser />}></Route>
      <Route path="*" element={<h1>Page Not Found</h1>}></Route>
    </Routes>
  )
}

export default App