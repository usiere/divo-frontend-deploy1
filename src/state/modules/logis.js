import axios from 'axios'

// Import getInstance from the auth wrapper
import { Auth0Plugin, getInstance } from '../../auth';

export const state = {
logis: []
}

export const getters = {
    userLogis: state => state.logis
}

export const actions = {
    async fetchLogis({commit}, vendor){
       
// Calling Auth0      
const instance = getInstance();
const accessToken = await instance.getTokenSilently();
                console.log("this is th emain akpab "+ vendor)
        // getting necessities from the database              
              await axios({
                        method: 'get',
                        url:`/api/logi/${vendor}`,
                        headers: {
                        Authorization: `Bearer ${accessToken}`
                             },
                      
        }).then( res => {
             ;
             console.log('this is the real logis' + JSON.stringify(res.data.logis))
             commit('setLogis', res.data.logis)
        })
            .catch( e => {
                    console.log(e);
            }) ;
       
    },

async postLogis ({commit}, logis){

    // Calling Auth0      
    const instance = getInstance();
    const accessToken = await instance.getTokenSilently();
          
    console.log(logis)
          // Use Axios to make a call to the API
      const response = await axios({
      method: 'post',
      url:"/api/logi",
      headers: {
                Authorization: `Bearer ${accessToken}`,
               //'Content-Type': 'multipart/form-data'
              },
      data: logis, 
   

       // Check this, whether or not to use res.data
     
    }).catch(err => {
        // what now?
        console.log('this' + err);
    })
 },


async updLogis({commit}, logis){
    // make a put request here
        // Calling Auth0      
        const instance = getInstance();
        const accessToken = await instance.getTokenSilently();
              
              // Use Axios to make a call to the API
         const response = await axios({
          method: 'put',
          url:`/api/logi/${logis.vendor}`,
          headers: {
                    Authorization: `Bearer ${accessToken}`
                  },
         data: logis
         
        });
        console.log('this is the response data oo' + response.data)
   
   commit('updateLogis', response.data.logi);
   }

};

   

export const mutations = {
    setLogis: (state, logis) => (state.logis = logis),
    updateLogis:(state, updLogis) => (state.logis = updLogis)
    }



