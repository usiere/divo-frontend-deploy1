<template>
<div class="main">


 <!-- Section if there is no category available --> 
 <div v-if="showEmpty"> 
   <div class="container" v-show="checks === '[]'">
      <div class="row">
        <div class="col-12 text-center">
          <h3 class="mt-3">Hey {{$auth.user.given_name}}</h3>
          <p class="text-muted mb-5">
            You haven't had an order yet,
            <br />Any order made will be notified in this window.
          </p>
          <!-- <router-link to="/" class="btn btn-lg btn-primary mt-4"
            >Add Store</router-link
          > -->
        </div>
      </div>
    </div>
 </div>

  <!-- Modal to display the information of the order -->
  <b-modal id="order-info" title="Order" hide-footer > 
   <div class="order_info_grid">
     <div class="order_info_image">
       <div class="order_info_item">
         <h5 class="item_heading"> Item:</h5>
          <b-img class="order_image" src="https://divoitemsupd.s3.eu-west-2.amazonaws.com/1608383124686-blob" fluid alt="Responsive image"></b-img>
         <div> <strong>Name: </strong> {{sh_item_name}} </div>
         <div> <strong>Price: </strong> {{sh_item_price}} </div>
         <div> <strong>Size: </strong> {{sh_item_size}} </div>
       </div>
     </div>
     <div class="order_info_text">
       <p>  <h5 class="order_heading"> Order:</h5>
         <br/>
         <div> <strong>Date: </strong> {{sh_order_date}} </div>
         <div> <strong>Qty: </strong> {{sh_order_qty}} </div>
         <div> <strong> Buyer: </strong> {{sh_order_cust}} </div>
         <div> <strong>Phone: </strong> {{sh_order_phone}}</div>
         <div> <strong>District: </strong>{{sh_order_district}}</div>
         <div> <strong>Address: </strong> {{sh_order_address}}</div>
         </p>
    
       <br/>
       <button class="btn btn-success ml-2"> Query</button> 
     </div>
   </div>
  </b-modal>

  <div class="d-flex justify-content-center mb-2" >
    <b-spinner  v-if="showSpinner" style="width: 3rem; height: 3rem;" label="Loading..." variant="primary"></b-spinner>
  </div> 

<!-- Main section for displaying the orders -->
<div class="container" v-if="allOrders && allOrders.length >0">
  <div v-for="order in allOrders" v-bind:key="order._id" v-b-modal.order-info @click="get_order_info(order)" >
 
  <div id="color1" class="section" >
    <div class="content" v-b-tooltip.hover title="Click for details">
      <h6 class="text_order_date"> {{order.order_date}} </h6>
      <!-- <h1> {{order.item_name}} </h1> -->
      <div class="text_item_name">{{order.item_name}} </div>
      <h4 class="text_order_qty"> {{order.order_qty}} units</h4>
      <!-- <h6> ({{order.order_district}})</h6> -->
      <h6 v-show="!order.delivered" class="text_pend"> Pending <vue-fontawesome icon="exclamation-triangle" size="1" color="red"></vue-fontawesome></h6>
      <h6 v-show="order.delivered" class="text_pend"> Delivered  <vue-fontawesome icon="check" size="2" color="green"></vue-fontawesome></h6>
    </div>
    <div class="overlay"></div>
    </div>
  </div> 
 </div>
</div>
</template>



<style scoped>
@import url('https://fonts.googleapis.com/css?family=Quicksand:300,500');
* {
  box-sizing: border-box;
  outline: none;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
}

.main{
  padding-top: 50px
}

  .container {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%
}

.section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  color: #fff;
  transition: flex .4s ease;
  position: relative;
  margin-bottom: 30px;
  margin-left: 10px;
  outline: none;
   border: 5px solid white;
   padding: 30px;
}

.section .overlay {
 
  width: 100%;
  height: 100%;
  position: absolute;
  transition: background-color .8s ease;

}

.section .content {
  z-index: 2;
 
}

.section:hover {
  flex: 2;

}

.section:hover .overlay {
  background-color: green;
  opacity: 40%;

  
}

#color1 {
 background-color:white;

}

#color2 {
  background-color:white;
 
}

h1{
  color: black
}

.order_info_grid{
  display: grid;
  grid-template-columns: 50% 50%;
}

.order_image{
   border-radius: 20%;
   height: 120px;
   width: 120px;
}

.order_info_item{
  padding: 10px;
}

.text_item_name{
  color: black;
  font-size: 25px;
  font-weight: 550;
  font-family: 'Quicksand', sans-serif;

}

.text_order_date{
color: black;
 font-family: 'Quicksand', sans-serif;

}

.text_order_qty{
  color: darkgrey;
}

.item_heading{
  border-bottom: 1px dotted grey;
  width: 70px;
}

.order_heading{
  border-bottom: 1px solid grey;
  width: 100px;
}


/* Responsive columns - one column layout (vertical) on small screens */
@media screen and (max-width: 600px) {
  .card {
    width: 44%;
    display: block;
    margin-bottom: 20px;
  }

  .container {
  display: grid;
  grid-template-columns: 50% 50%
}


.text_item_name{
  color: black;
  font-size: 20px;
  font-weight: 550;
  font-family: 'Quicksand', sans-serif;
}

.text_order_qty{
  font-size: 17px;
}

.text_order_date{
font-size: 13px;
}
  
}
</style>


<script>
import axios from 'axios'
import {mapGetters, mapActions} from 'vuex'

export default {  
   
   data(){
     return{
       orders: [],
       sh_item_name: '',
       sh_item_price: '',
       sh_item_size: '', 
       sh_item_stock: '',
       sh_item_process: '',
       sh_item_desc: '',
       sh_order_id: '',
       sh_order_cust: '',
       sh_order_phone: '',
       sh_order_qty:'',
       sh_order_date:'',
       sh_order_district: '',
       sh_order_address: '',
       sh_delivered: '',
       showSpinner: true,
       checks: '',
       showEmpty: false,
       user: this.$auth.user.email
     }
   },


  async mounted() {
    setTimeout(() => this.showSpinner = false, 1000);
    setTimeout(() => this.showEmpty = true, 1500);
    
  this.fetchOrders(this.$auth.user.email);
      this.checks = await JSON.stringify(this.allOrders)
  console.log('i am checking if this is coming out' + this.allOrders)

  },

  methods: {
    ...mapActions("orders",[
      'fetchOrders', 'sortPending', 'sortDelivered', 'sortAll'
    ]),
    get_order_info(order){
    console.log('this is the name of bao' + order.order_cust_name)
      this.sh_item_name = order.item_name,
        this.sh_item_price = order.item_price,
        this.sh_item_size = order.item_size,
        this.sh_item_stock = order.item_stock,
        this.sh_item_process = order.item_process,
        this.sh_item_desc = order.item_desc,
        this.sh_order_id = order.order_id,
        this.sh_order_cust = order.order_cust_name,
        this.sh_order_qty = order.order_qty,
        this.sh_order_phone = order.order_cust_phone,
        this.sh_order_date = order.order_date,
        this.sh_order_district = order.order_district,
        this.sh_order_address = order.order_address,
        this.sh_delivered = order.delivered
  }
  },

  computed: mapGetters("orders",['allOrders']),

  watch: {
    allOrders: function () {
      this.checks = JSON.stringify(this.allOrders)
    }
  }


}
</script>