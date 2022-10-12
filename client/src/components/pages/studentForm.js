import React, { useState } from "react";

import Card from "../UI/Card";
import "./studentForm.css";
import LoadingIndicator from '../UI/LoadingIndicator'
import Cookies from 'universal-cookie';
const StudentForm = React.memo((props) => {
  const cookies = new Cookies();

  const [enteredtitle, setenteredtitle] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
   
     console.log("dfd");
     let data={
      "name":enteredtitle,
      "email":cookies.get('email')
     }

    fetch("http://localhost:3000/api/v1/users/add", {
      method: "POST",
      body: JSON.stringify({data}),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((responsedata) => {
        console.log(responsedata);
      });
  };
    // ...
 

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={enteredtitle}
              onChange={(event) => {
                const newtitle = event.target.value;
                setenteredtitle(newtitle);
              }}
            />
          </div>
         
          <div className="ingredient-form__actions">
            <button type="submit">Add Teacher</button>
            {props.loading && <LoadingIndicator></LoadingIndicator>}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default StudentForm;
