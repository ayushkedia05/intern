import React, { useEffect, useState } from "react";
import StudentForm from "./studentForm";
import StudentList from "./studentlist";

import ErrorModal from "../UI/ErrorModal";
const Display = () => {
  const [teachers, setteacher] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [error, setiserror] = useState();

  useEffect(()=>{
fetch("").then((response)=>{
  return response.json();
}).then((responseData)=>{

  const loadingteachers = [];
  console.log(responseData);
  for (const key in responseData) {
    loadingteachers.push({
      id: key,
      title: responseData[key].items.title,
    });
  }
  setteacher(loadingteachers);
})
  },[]);

  const addingstudenthandler = (items) => {
    fetch("http://localhost:3000/api/v1/users/add", {
      method: "POST",
      body: JSON.stringify({ items }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((responsedata) => {
        console.log(responsedata);
      });
  };
  const clearerror = () => {
    setisloading(false);
    setiserror(false);
  };

  return (
    <>
      <div className="App">
        {error && <ErrorModal onClose={clearerror}>{error}</ErrorModal>}
        <StudentForm>
          onaddingedrient={addingstudenthandler}
          loading={isloading}
        </StudentForm>
        <StudentList></StudentList>
       
      </div>
    </>
  );
};

export default Display;
