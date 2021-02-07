import axios from 'axios'

// Import getInstance from the auth wrapper
import { Auth0Plugin, getInstance } from '../../auth';

export const state = {
account: []
}

export const getters = {
    userAccount: state => state.account
}

export const actions = {
    async fetchAccount({commit}, vendor){
       console.log('checking if transfer dey transfer')
// Calling Auth0      
const instance = getInstance();
const accessToken = await instance.getTokenSilently();
                console.log("this is th emain akpab "+ vendor)
        // getting necessities from the database              
              await axios({
                        method: 'get',
                        url:`/api/account/${vendor}`,
                        headers: {
                        Authorization: `Bearer ${accessToken}`
                             },
                      
        }).then( res => {
             ;
             console.log('this is the real account' + JSON.stringify(res.data.account))
             commit('setAccount', res.data.account[0])
        })
            .catch( e => {
                    console.log(e);
            }) ;
       
    },

async postAccount ({commit}, account){

    // Calling Auth0      
    const instance = getInstance();
    const accessToken = await instance.getTokenSilently();
          
    console.log(account)
          // Use Axios to make a call to the API
      const response = await axios({
      method: 'post',
      url:"/api/account",
      headers: {
                Authorization: `Bearer ${accessToken}`,
               //'Content-Type': 'multipart/form-data'
              },
      data: account, 
   

       // Check this, whether or not to use res.data
     
    }).catch(err => {
        // what now?
        console.log('this' + err);
    })
 },


async updAccount({commit}, account){
    // make a put request here
        // Calling Auth0      
        const instance = getInstance();
        const accessToken = await instance.getTokenSilently();
              
              // Use Axios to make a call to the API
         const response = await axios({
          method: 'put',
          url:`/api/account/${account.vendor}`,
          headers: {
                    Authorization: `Bearer ${accessToken}`
                  },
         data: account
         
        });
        console.log('this is the main account stuffy' + response.data)
   
   commit('updateAccount', response.data);
   }

};

   

export const mutations = {
    setAccount: (state, account) => (state.account = account),
    updateAccount:(state, updAccount) => (state.account = updAccount)
}


