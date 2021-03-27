import axios from "axios";
import {useState} from "react";
export default function Queryform(){
    const [userData,setuserData]=useState(
                                {name:"",email:"",
                                 phoneno:"",feedback:""});

    const [successMessage,setsuccessMessage]=useState("");

    const [errorMessage,seterrorMessage]=useState("");
    const url="https://sheet.best/api/sheets/10f358cd-04fe-4eca-a4f0-3ba0bb72761e";
    //handles form submit
    const submitHandler=async(e)=>{
        e.preventDefault();
        const {name,email,phone,feedback}=userData
        //if form fields are empty
        if(name===""||email===""||phone===""||feedback===""){
            setsuccessMessage('')
            seterrorMessage('Please fill in the fields')
            
        }else{
            axios.post(url,userData
            ).then(()=>{
                seterrorMessage('')
                setsuccessMessage('Feedback Submitted successfully')
                setuserData({name:"",email:"",phoneno:"",feedback:""})
            }).catch((err)=>{
                console.log(err)
            })
        }}

    return(
        <div className="main-container">
            <h1>Query/Feedback Form (using Google sheets)</h1>
            <div className={successMessage?"success":"hidden"}>{successMessage}</div>
            <div className={errorMessage?"error":"hidden"}>{errorMessage}</div>
            <form  className="submit-form" onSubmit={submitHandler}>
                <label htmlFor="name">Name</label>
                <input  id="name" type="text"  value={userData["name"]} onChange={(e)=>{setuserData({...userData,name:e.target.value})}} />
                <label htmlFor="email">Email Address</label>
                <input  id="email" type="text"  value={userData["email"]} onChange={(e)=>{setuserData({...userData,email:e.target.value})}}/>
                <label htmlFor="phno">Contact No</label>
                <input  id="phno" type="text"  value={userData["phoneno"]} onChange={(e)=>{setuserData({...userData,phoneno:e.target.value})}}/>
                <label htmlFor="feedback">Feedback</label>
                <textarea  id="feedback" type="text"  value={userData["feedback"]} onChange={(e)=>{setuserData({...userData,feedback:e.target.value})}}></textarea>
                <input type="submit" value="Submit"/>
            
            </form>
        </div>
    )
}