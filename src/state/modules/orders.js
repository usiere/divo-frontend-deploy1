import axios from 'axios'

// Import getInstance from the auth wrapper
import { Auth0Plugin, getInstance } from '../../auth';

export const state = {
orders: []
}

export const getters = {
    allOrders: state => state.orders
    
}

export const actions = {
    async fetchOrders({commit, rootState}, user){
       
// Calling Auth0      
const instance = getInstance();
const accessToken = await instance.getTokenSilently();
console.log(accessToken);
                
        // getting necessities from the database              
              await axios({
                        method: 'get',
                        url:`/api/order/${user}`,
                        headers: {
                        Authorization: `Bearer ${accessToken}`
                             },
                      
        }).then( res => {
            console.log(res.data.orders)
             commit('setOrders', res.data.orders.reverse())
        })
            .catch( e => {
                    console.log(e);
            }) ;
       
    },

    async sortPending({commit, rootState}, user){

                  // Calling Auth0      
const instance = getInstance();
const accessToken = await instance.getTokenSilently();
console.log(accessToken);
                
        // getting necessities from the database              
              await axios({
                        method: 'get',
                        url:`/api/order/${user}`,
                        headers: {
                        Authorization: `Bearer ${accessToken}`
                             },
                      
        }).then( res => {
            console.log(res.data.orders)
             commit('sortPending', res.data.orders)
        })
            .catch( e => {
                    console.log(e);
            }) ;
            },

    async sortDelivered({commit, rootState}, user){

               // Calling Auth0      
const instance = getInstance();
const accessToken = await instance.getTokenSilently();
console.log(accessToken);
                
        // getting necessities from the database              
              await axios({
                        method: 'get',
                        url:`/api/order/${user}`,
                        headers: {
                        Authorization: `Bearer ${accessToken}`
                             },
                      
        }).then( res => {
            console.log(res.data.orders)
             commit('sortDelivered', res.data.orders)
        })
            .catch( e => {
                    console.log(e);
            }) ;
       },
    async sortAll({commit, rootState}, user){

        // Calling Auth0      
const instance = getInstance();
const accessToken = await instance.getTokenSilently();
console.log(accessToken);
                
        // getting necessities from the database              
              await axios({
                        method: 'get',
                        url:`/api/order/${user}`,
                        headers: {
                        Authorization: `Bearer ${accessToken}`
                             },
                      
        }).then( res => {
            console.log(res.data.orders)
             commit('sortAll', res.data.orders)
        })
            .catch( e => {
                    console.log(e);
            }) ;
},

};

   

export const mutations = {
    setOrders: (state, orders) => (state.orders = orders),
    sortPending: (state, orders) => (
        state.orders = orders.filter(order => order.delivered == false)),
    sortDelivered: (state, orders) => (
        state.orders = orders.filter(order => order.delivered == true)),
     sortAll: (state, orders) => (
        state.orders = orders)
}


