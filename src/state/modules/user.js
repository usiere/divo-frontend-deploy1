import axios from 'axios'

// Import getInstance from the auth wrapper
import { Auth0Plugin, getInstance } from '../../auth';

export const state = {
user: []
}

export const getters = {
    currentUser: state => state.user
}

export const actions = {
    async fetchUser({commit}, vendor){
       console.log('checking if transfer dey transfer')
// Calling Auth0      
const instance = getInstance();
const accessToken = await instance.getTokenSilently();
                console.log("this is th emain akpab "+ vendor)
        // getting necessities from the database              
              await axios({
                        method: 'get',
                        url:`/api/user/${vendor}`,
                        headers: {
                        Authorization: `Bearer ${accessToken}`
                             },
                      
        }).then( res => {
             ;
             console.log('this is the real account' + JSON.stringify(res.data.user))
             commit('setUser', res.data.user)
        })
            .catch( e => {
                    console.log(e);
            }) ;
       
    },

async postUser ({commit}, vendor){

    // Calling Auth0      
    const instance = getInstance();
    const accessToken = await instance.getTokenSilently();

          // Use Axios to make a call to the API
      const response = await axios({
      method: 'post',
      url:`/api/user/${vendor}`,
      headers: {
                Authorization: `Bearer ${accessToken}`,
               //'Content-Type': 'multipart/form-data'
              }

       // Check this, whether or not to use res.data
     
    }).catch(err => {
        // what now?
        console.log('this' + err);
    })
 },


async updUser({commit}, user){
    // make a put request here
        // Calling Auth0      
        const instance = getInstance();
        const accessToken = await instance.getTokenSilently();
              
              // Use Axios to make a call to the API
         const response = await axios({
          method: 'put',
          url:`/api/user`,
          headers: {
                    Authorization: `Bearer ${accessToken}`
                  },
         data: user
         
        });
        console.log('this is the main account stuffy' + response.data)
   
   commit('updateUser', response.data);
   }

};

   

export const mutations = {
    setUser: (state, user) => (state.user = user),
    updateUser:(state, updUser) => (state.user = updUser)
}


