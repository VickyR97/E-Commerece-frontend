import React, {useState,useEffect} from 'react'
import { updateCategory, getCategory } from './helper/adminapicall'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'


const UpdateCategory = ({match}) => {
    const {user, token} = isAuthenticated()

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)


    const preLoad = categoryId =>{
        getCategory(categoryId).then(data =>{
            if (data.error) {
                setError(true)
            }else{
                setError("")
                setName(data.name)
            }
        })
    }

    useEffect(() => {
       
        preLoad(match.params.categoryId)
        
    }, [])

    const handleChange = event =>{
        setError("")
        setName(event.target.value)

    }

    const onSubmit =(event) =>{
        event.preventDefault()
        setError("")
        setSuccess(false);
        
        updateCategory(match.params.categoryId, user._id, token, {name}).then(data =>{
          if (data.error) {
            setError(true)
          }else{
                setError("")
                setSuccess(true)
                setName("")
            
          }
        })
      }

      const successMessage = () =>{
        if(success){
            return <h1 className="text-success">Category has been updated successfully.</h1>
        }
      }

      const errorMessage =() =>{
        if(error){
            return <h1 className="text-danger">Error in category updation</h1>
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
            value= {name}
            autoFocus
            required
            />
            <button className="btn btn-outline-info"
            onClick={onSubmit}
            >
            Update Category
            </button>

        </div>
    </form>
    )

    

    return (
        <Base className="container bg-info p-4" title="Update Category" description="Update Categories here for your products...">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                        {successMessage()}
                        {errorMessage()}
                        {categoryForm()}
                        
                </div>
            </div>
        </Base>
    )
}

export default UpdateCategory