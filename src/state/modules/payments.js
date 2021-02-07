import axios from 'axios'

// Import getInstance from the auth wrapper
import { Auth0Plugin, getInstance } from '../../auth';

export const state = {
payments: []
}

export const getters = {
    allPayments: state => state.payments
    
}

export const actions = {
    async fetchPayments({commit, rootState}, user){
       
// Calling Auth0      
const instance = getInstance();
const accessToken = await instance.getTokenSilently();
console.log(accessToken);
                
        // getting necessities from the database              
              await axios({
                        method: 'get',
                        url:`/api/payment/${user}`,
                        headers: {
                        Authorization: `Bearer ${accessToken}`
                             },
                      
        }).then( res => {
            console.log(res.data.payments)
             commit('setPayments', res.data.payments)
        })
            .catch( e => {
                    console.log(e);
            }) ;
       
    },

};

   

export const mutations = {
    setPayments: (state, payments) => (state.payments = payments)
}


