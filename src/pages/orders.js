import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useStore } from "../store/store";

const Orders = () => {
    const [state, dispatch] = useStore(false);
    const [orders, setOrders] = useState({});
    useEffect(() => {
        axios.get(`https://fashionista-time1.firebaseio.com/orders.json?orderBy="userID"&equalTo="${state.userID}"`)
            .then(response => {
                console.log(response);
                setOrders(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
    let MyOrders = orders && Object.values(orders).map(each => {
        return <p>{each.cardData.cvc}</p>
    })
    return (
        <div>
            { orders && MyOrders}
        </div>
    )
}

export default Orders
