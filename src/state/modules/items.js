import axios from 'axios'

// // Import getInstance from the auth wrapper
import { Auth0Plugin, getInstance } from '../../auth';

export const state = {
items: [],
cat_filter: ''
}

export const getters = {
    allItems: state => state.items
}

export const actions = {

    async fetchItems({commit, cat}){
       
        // Calling Auth0      
        const instance = getInstance();
        const accessToken = await instance.getTokenSilently();
        console.log(accessToken);
                        
                // getting necessities from the database              
                      await axios({
                                method: 'get',
                                url:`/api/invent`,
                                headers: {
                                Authorization: `Bearer ${accessToken}`
                                     },
                              
                }).then( res => {
                     ;
                     commit('setItems', res.data.items.reverse());
                     state.cat_filter = cat,
                     console.log('this is the cat filter' + cat)
                     console.log('this is the cat filter' + state.cat_filter)
                     console.log(res.data)
                })
                    .catch( e => {
                            console.log(e);
                    }) ;
               
            },




async addItem ({commit}, item){

    // Calling Auth0      
    const instance = getInstance();
    const accessToken = await instance.getTokenSilently();
          
    console.log(item.form_data)
          // Use Axios to make a call to the API
      const response = await axios({
      method: 'post',
      url:"/api/itemv",
      headers: {
                Authorization: `Bearer ${accessToken}`,
               // 'Content-Type': 'multipart/form-data'
              },
      data: item, 
   

       // Check this, whether or not to use res.data
     
    });
    

console.log('cghreck' + response.data.item)
commit('newItem', response.data.item)
 },


 // posting form data to the server (no commit here)
 async postItem ({commit}, form_data){

    // Calling Auth0      
    const instance = getInstance();
    const accessToken = await instance.getTokenSilently();
          
    console.log(form_data)
          // Use Axios to make a call to the API
      const response = await axios({
      method: 'post',
      url:"/api/invent",
      headers: {
                Authorization: `Bearer ${accessToken}`,
               //'Content-Type': 'multipart/form-data'
              },
      data: form_data, 
   

       // Check this, whether or not to use res.data
     
    }).catch(err => {
        // what now?
        console.log('this' + err);
    })
 },

 async deleteItem({ commit }, id) {

    console.log('my nameis usi the man')
     // Calling Auth0      
const instance = getInstance();
const accessToken = await instance.getTokenSilently();
      
      // Use Axios to make a call to the API
  await axios({
  method: 'delete',
  url:`/api/invent/${id}`,
  headers: {
            Authorization: `Bearer ${accessToken}`
          },
 
});
commit('removeItem', id)

},

async editItem ({commit}, item_e){
    commit('updItem', item_e)
    console.log('and the award goes to' + item_e.item_name)
    console.log('checking if the vuex stuff is working')
 },

 // there is no commit here
 async updateItem ({commit}, form_data){

    // Calling Auth0      
    const instance = getInstance();
    const accessToken = await instance.getTokenSilently();
          
    console.log(form_data)
          // Use Axios to make a call to the API
      const response = await axios({
      method: 'put',
      url:"/api/itemput",
      headers: {
                Authorization: `Bearer ${accessToken}`,
               //'Content-Type': 'multipart/form-data'
              },
      data: form_data, 
   

       // Check this, whether or not to use res.data
     
    }).catch(err => {
        // what now?
        console.log('this' + err);
    })
 },

 async setCatId({commit}, cat_id){
     state.cat_filter = cat_id
 }


}

   
export const mutations = {
    newItem: (state, item) => state.items.unshift(item),  
    setItems: (state, items) => (state.items = items.filter(item => item.cat === state.cat_filter )),
    removeItem: (state, id) => (
        state.items = state.items.filter(item => item._id !== id)),
    updItem:(state, Item_e) => {
            const index = state.items.findIndex(item => item._id === Item_e._id);
            if(index !== -1) {
                state.items.splice(index, 1, Item_e);
                // cross-check this again for more understanding 
            }
            console.log('checking if the vuex stuff is working mutate')
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
