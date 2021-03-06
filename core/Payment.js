import React,{useState,useEffect} from 'react'
import { loadingAllCart, cartEmpty } from './helper/cartHelper'
import { Link } from 'react-router-dom'
import {getMeToken, processPayment} from "../core/helper/paymentHelper"
import {createOrder} from "../core/helper/orderHelper"
import { isAuthenticated } from '../auth/helper'
import DropIn from "braintree-web-drop-in-react"


const Payment = ({products, setReload = f => f, reload = undefined})  => {
    const [info, setInfo] = useState({
        loading: false,
        success: false, 
        clientToken: null,
        error: "",
        instance: {}
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        console.log("USER",userId)
        console.log("TOKEN",token)

        getMeToken(userId, token).then(info =>{
            console.log("INFO", info)
            if (info.error) {
                setInfo({
                    ...info,
                    error: info.error
                })
            }else{
                const clientToken = info.clientToken
                setInfo({
                    clientToken
                })
            }
        })
    }
    useEffect(() => {
        getToken(userId, token);
      }, []);
   
    const showDropIn = () =>{
        return (
            <div>
                {info.clientToken !== null && products.length > 0 ? (
                        <div>
                        <DropIn
                        options={{ authorization: info.clientToken }}
                        onInstance={(instance) => (info.instance = instance)}
                      />
                      <button className="btn btn-block btn-success" onClick={onPurchase}>Buy</button>
                      </div>
                      ):(<h3> please add products</h3>)
                }

          
        </div>
        )
    }

    const onPurchase = () => {
        setInfo({ loading: true });
        let nonce;
        let getNonce = info.instance.requestPaymentMethod().then(data => {
          nonce = data.nonce;
          const paymentData = {
            paymentMethodNonce: nonce,
            amount: getAmount()
          };
          processPayment(userId, token, paymentData)
            .then(response => {
              setInfo({ ...info, success: response.success, loading: false });
              console.log("PAYMENT SUCCESS");
              const orderData = {
                products: products,
                transaction_id: response.transaction.id,
                amount: response.transaction.amount
              };
              createOrder(userId, token, orderData);
              cartEmpty(() => {
                console.log("Did we got a crash?");
              });
    
              setReload(!reload);
            })
            .catch(error => {
              setInfo({ loading: false, success: false });
              console.log("PAYMENT FAILED");
            });
        });
      };

      
    const getAmount = () => {
        let amount = 0;
        products.map(p => {
          amount = amount + p.price;
        });
        return amount;
      };

    return (
        <div>
            <h3>Your bill is {getAmount()} $</h3>
            {showDropIn()}
        </div>
    )
}

export default Payment