import React,{useState} from 'react'
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper'
import { Link } from 'react-router-dom'
import { createCategory } from './helper/adminapicall'

const AddCategory = () => {
    
    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {user, token} = isAuthenticated()

    const goBack = () =>(
        <div className="mt-5">
            <Link className="btn btn-success mb-3"
            to="/admin/dashboard"
            >Admin Home</Link>
        </div>
    )

    const handleChange = (event) =>{
        setError("")
        setName(event.target.value)
    }    

    const onSubmit = (event) =>{
        event.preventDefault()
        setError("")
        setSuccess(false);
        
        createCategory(user._id, token, {name})
        .then(res =>{
            if(res.error){
                setError(true)

            }else{
                setError("")
                setSuccess(true)
                setName("")

            }
        })
    }

    const successMessage =() =>{
        if(success){
            return <h1 className="text-success">Category has been created successfully.</h1>
        }
    }


    const errorMessage =() =>{
        if(error){
            return <h1 className="text-danger">Error in category creation</h1>
        }
    }

    const categoryForm = () =>(
        <form>
            <div className="form-group">
                <p className="lead">
                    Enter the category
                </p>
                <input type="text" className="form-control my-3" 
                onChange={handleChange}
                value={name}
                autoFocus
                required
                placeholder="For Ex. Summer"
                />
                <button className="btn btn-outline-info"
                onClick={onSubmit}
                >
                Create Category
                </button>

            </div>
        </form>
    )    

    const isAuthenticated1 = () =>{
                isAuthenticated()
    }
    


       return (
        <Base className="container bg-info p-4" title="Create Category" description="Create Categories here for your products...">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                        {isAuthenticated1}
                        {successMessage()}
                        {errorMessage()}
                        {categoryForm()}
                        {goBack()}
                </div>
            </div>
        </Base>
    )
}

export default AddCategory