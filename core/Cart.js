import React,{useEffect, useState} from 'react'
import "../styles.css"
// import {API} from "../user/backend"
import Base from "./Base"
import Card from './Card'
import { loadingAllCart } from './helper/cartHelper'
import Payment from './Payment'


const Cart = () => {
    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setProducts(loadingAllCart())
    }, [reload])

    const loadCart = (products) =>{
        return(
            <div>
            <h1 className="text-white"> Load Carts are...</h1>
                {products.map((product, index)=>(
                    <Card 
                    key={index}
                    product = {product}
                    addToCart= {false}
                    removeFromCart = {true}
                    setReload = {setReload} 
                    reload = {reload}
                    />                    
                ))}
            </div>
            )
        }

    
    const checkCart = () =>{
        return(
        <h1 className="text-white"> Check Cart here...</h1>
        )
    }

    return (
        <Base>
           <div className="row text-center">
                <div className="col-6">
                {products.length >0 ? loadCart(products) : (<h3> No Products </h3>) }
                </div>
                <div className="col-6">
                <Payment products= {products} setReload = {setReload}/>
                </div>
           </div>
        </Base>
    )
}

export default Cart