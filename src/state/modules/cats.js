import axios from 'axios'

// Import getInstance from the auth wrapper
import { Auth0Plugin, getInstance } from '../../auth';

export const state = {
cats: []
}

export const getters = {
    allCats: state => state.cats,
    // getting one cat to display
    oneCat: (state)=> (id) => {
        return state.cats.find(cat => cat._id === id)
      }
}

export const actions = {
    async fetchCats({commit, rootState}, user){
       console.log('chuuui'+ user)
// Calling Auth0      
const instance = getInstance();
const accessToken = await instance.getTokenSilently();
console.log(accessToken);
                
        // getting necessities from the database              
              await axios({
                        method: 'get',
                        url:`/api/cat/${user}`,
                        headers: {
                        Authorization: `Bearer ${accessToken}`
                             }
                        
                      
        }).then( res => {
             ;
             commit('setCats', res.data.cats.reverse())
        })
            .catch( e => {
                    console.log(e);
            }) ;
       
    },

async addCat ({commit}, cat){

    // Calling Auth0      
const instance = getInstance();
const accessToken = await instance.getTokenSilently();

       console.log("this is the new cat"+JSON.stringify(cat))
      
      // Use Axios to make a call to the API
  const response = await axios({
  method: 'post',
  url:"/api/cat",
  headers: {
            Authorization: `Bearer ${accessToken}`
          },
  data: cat,  // Check this, whether or not to use res.data
 
});

console.log(response.data.cat)

commit('newCat', response.data.cat)
    },

async deleteCat({ commit }, id) {

    console.log('my nameis usi the man')
     // Calling Auth0      
const instance = getInstance();
const accessToken = await instance.getTokenSilently();
      
      // Use Axios to make a call to the API
  await axios({
  method: 'delete',
  url:`/api/cat/${id}`,
  headers: {
            Authorization: `Bearer ${accessToken}`
          },
 
});
commit('removeCat', id)

},

async updateCat({commit}, updCat){
 // make a put request here
     // Calling Auth0      
     const instance = getInstance();
     const accessToken = await instance.getTokenSilently();
           
           // Use Axios to make a call to the API
      const response = await axios({
       method: 'put',
       url:`/api/cat/${updCat._id}`,
       headers: {
                 Authorization: `Bearer ${accessToken}`
               },
      data: updCat
      
     });
     console.log(response.data)

commit('updateCat', response.data);
}

};

   

export const mutations = {
    setCats: (state, cats) => (state.cats = cats),
    newCat: (state, cat) => state.cats.unshift(cat),
    removeCat: (state, id) => (
     state.cats = state.cats.filter(cat => cat._id !== id)),
    updateCat:(state, updCat) => {
        const index = state.cats.findIndex(cat => cat._id === updCat._id);
        if(index !== -1) {
            state.cats.splice(index, 1, updCat);
            // cross-check this again for more understanding 
        }
    }
}




// check this out for future use

// // Import getInstance from the auth wrapper
// import { Auth0Plugin, getInstance } from './auth';

// // ...

// const instance = getInstance();

// instance.$watch("loading", async loading => {
//   if (!loading && instance.isAuthenticated) {
//     const token = await instance.getTokenSilently();
//     console.log(token);
//   }
// });
