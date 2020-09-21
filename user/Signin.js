import React, {useState} from "react"
import {Link, Redirect} from "react-router-dom"
import Base from "../core/Base"
import {isAuthenticated, signin, authenticate} from "../auth/helper"

const Signin = () =>{
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false
    })
 
// DESTRUCTUREING 
    const {email, password, error, loading, didRedirect} = values
    const {user} = isAuthenticated()

// METHOD FOR HANDLE THE ONCHANGE EVENT
const handleChange = name => event =>{
    setValues({...values, error:false, [name]:event.target.value})
}
// SUCCESS MESSAGE
const loadingMessage = () =>{
    return(
     loading && (<div className='alert alert-info'>
        <h2>Loading...</h2>
     </div>)   
    )} 

// ERROR MESSAGE
const errorMessage = () =>{
    return(
        <div className="row">
        <div className="col-6 offset-sm-3 text-left">
            <div className="alert alert-danger"
                style={
                    {display: error ? "" : "none"}
                }
            >
            {error}
            </div>
        </div>
        </div>
    )} 


 // METHOD FOR HANDLE SUBMIT BUTTON
 const onSubmit = event =>{
    event.preventDefault()
    setValues({...values, error:false, loading: true})
    signin({email, password})
    .then( data =>{
        if(data.error){
            setValues({...values, error: data.error, loading: false})
        }else{
            authenticate(data, ()=>{
                setValues({
                    ...values,
                    didRedirect: true
                   })    
            })
            
        }
    })
    .catch(console.log("Error in signin"))
}   

// RE-DIRECT 
    const reDirect =() =>{
        if(didRedirect){
        if(user && user.role === 1){
            return <Redirect to="/admin/dashboard"/>
        }else{
            return <Redirect to="/user/dashboard"/>
        }      
    }
    if(isAuthenticated()){
      return <Redirect to="/" />
    }
    }
    const signInForm = () =>{
        return (
            <div className="row">
                <div className="col-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input onChange={handleChange("email")} value={email} className="form-control" type="text" name="email">
                            </input>
                        </div>
                        <div className="form-group">        
                            <label className="text-light">Password</label>
                            <input className="form-control" type="password" name="password" onChange={handleChange("password")} value={password}>
                            </input>
                        </div>
                        <button className="btn btn-success btn-block" onClick={onSubmit}> Sign In </button>
                    </form>
                </div>
            </div>
        )
    }
   
    return (
    <Base title="Signin Page" description="This is Signin Page">
        {loadingMessage()}
        {errorMessage()}
        {signInForm()}
        {reDirect()}
        <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
    )}

export default Signin