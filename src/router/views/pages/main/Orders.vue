<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import compOrders from '@src/router/views/pages/main/main-components/comp-orders'
import {mapActions} from 'vuex'

export default {
	page: {
		title: 'Nests',
		meta: [{ name: 'description', content: appConfig.description }],
	},
	components: {
		VuePerfectScrollbar,
        Layout,
        compOrders
    },

       data(){
     return{
        clickedAll: true,
        clickedDel: false,
        clickedPend: false,
         user: this.$auth.user.email
     }
   },
    
    methods: {
        ...mapActions("orders",['sortPending', 'sortDelivered', 'sortAll'])
},
}
</script>

<template>
	<Layout>

	<div class="d-flex flex-column">
	    <div class= "heading">
            <h1 class="home-title"> 
                <span> Orders</span> 
            </h1> 
    <div class="buttons_sort">
    <!-- find a better method for changing the colours in the future -->
        <button :class=" {grey: clickedAll, 'btn':true, 'btn-success':true, 'ml-2':true}" @click="sortAll(user), clickedAll = true, clickedDel = false, clickedPend = false"> All</button>  
        <button :class=" {grey: clickedDel, 'btn':true, 'btn-success':true, 'ml-2':true}" @click="sortPending(user), clickedAll = false, clickedDel = true, clickedPend = false"> Pending</button>  
        <button :class=" {grey: clickedPend, 'btn':true, 'btn-success':true, 'ml-2':true}" @click="sortDelivered(user), clickedAll = false, clickedDel = false, clickedPend = true"> Delivered</button> 
 </div>

	    </div>

		<compOrders />

    </div>
      
	</Layout>
</template>

<style scoped>

 .mb-4 {
      padding-left: 85%

 }

.heading {
	
    padding-left: 3% ;
	padding-top: 2%;
	

}

/* Basic styles */
*,
*::before,
*::after {
  box-sizing: border-box;
}

:root{
    --bg-color: #D8D8D8;
}


h1{
    font-size: 3em;
    font-weight: normal;
}

/* title styles */
.home-title span{
    position: relative;
    overflow: hidden;
    display: block;
    line-height: 1.2;
    padding-left: 35%
}

.home-title span::after{
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: white;
    animation: a-ltr-after 2s cubic-bezier(.77,0,.18,1) forwards;
    transform: translateX(-101%);
}

.home-title span::before{
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-color);
    animation: a-ltr-before 2s cubic-bezier(.77,0,.18,1) forwards;
    transform: translateX(0);
}

.home-title span:nth-of-type(1)::before,
.home-title span:nth-of-type(1)::after{
    animation-delay: 1s;
}

.home-title span:nth-of-type(2)::before,
.home-title span:nth-of-type(2)::after{
    animation-delay: 1.5s;
}

h6{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: forestgreen;
    font-size: 15px;
    margin-left: 310px
}

.buttons_sort{
    margin-left: 60%;
}

.btn:active {
  background-color: red;
  border: 2px black solid
}

.grey {
       background-color: grey;
   }

@media (max-width: 600px){
.home-title span{
    position: relative;
    overflow: hidden;
    display: block;
    line-height: 1.2;
    padding-left: 18%
}

.buttons_sort{
    margin-left: 45%;
}

}

@keyframes a-ltr-after{
    0% {transform: translateX(-100%)}
    100% {transform: translateX(101%)}
}

@keyframes a-ltr-before{
    0% {transform: translateX(0)}
    100% {transform: translateX(200%)}
}
</style>

