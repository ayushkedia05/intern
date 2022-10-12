import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './Studentlist.css';
import Cookies from 'universal-cookie';
const StudentList = props => {
  const [names, setnames] = useState();
  const cookies = new Cookies();

  useEffect(()=>{
    let dd={
      "email":cookies.get('email')
    }
  
    fetch(
      "http://localhost:3000/api/v1/users/getdata", {
        method: "POST",
        body: JSON.stringify({ dd }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
    
        // console.log(response.json())
       return response.json();
      })
      .then((responseData) => {
        console.log("jj",responseData)

        const loadingedrients = [];
        console.log(responseData.data);
        for (const key in responseData.data) {
          loadingedrients.push(responseData.data[key]);
        }
        setnames(loadingedrients);
        console.log("fs",loadingedrients)
      });
      },[]);




  return (
    <section className="ingredient-list">
      <h2>Loaded list</h2>
      <ul>
        {names?.map(ig => (
          <li >
            <span>{ig}</span>
            {/* <span>Rs{ig.amount}</span> */}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default StudentList;
