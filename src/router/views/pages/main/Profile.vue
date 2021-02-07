<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import axios from "axios";
import {mapGetters, mapActions} from 'vuex'

export default {
	page: {
		title: 'Nests',
		meta: [{ name: 'description', content: appConfig.description }],
	},
	components: {
		VuePerfectScrollbar,
        Layout,
    },
  data: function() {
    return {
      userid:  this.$auth.user.email,
      address: '',
      district: '',
      city: '',
      phone1: '',
      phone2: '',
      email: '',
      name: '',
      user_main:[],
      couts:[],
      user_couts:[],
      showSpinner: true       
            }
        },
       
  methods: {
    ...mapActions("user",['fetchUser', 'updUser', 'postUser']),


    onSubmit:  async function() {
      const user = {
        address: document.getElementById('address').value,
        district: document.getElementById('district').value,
        city: document.getElementById('city').value,
        phone1: document.getElementById('phone1').value,
        phone2: document.getElementById('phone2').value,
        email: this.$auth.user.email,
        name: this.$auth.user.name
    }
        this.updUser(user)
  },

    showModal() {
       if (this.user_main === 'none'){
         return this.$refs['prof-upd'].show();
       }
       else {
         console.log('Profile exists')
       }
      },

    makeToast1() {
      this.$toasted.show(" Profile update saved !!", { 
      theme: "toasted-primary", 
      position: "top-right", 
      duration : 5000
     });
    }
  },
  

    async mounted() {
      this.postUser(this.$auth.user.email)
      this.fetchUser(this.$auth.user.email)
      setTimeout(() => this.showSpinner = false, 2000);

},
    computed: mapGetters("user",['currentUser']),

}
</script>

<template>
	<Layout>
	<!-- Navbar-->
<header class="header">
  <nav class="navbar navbar-expand-lg navbar-light py-3">
    <h1>My Profile</h1>
    <div class="mb-4">
            <a v-b-modal.modal-1 hide-backdrop href="#" class="upd btn btn-success ml-2">Update info</a>
      </div>
  </nav>
</header>
      
<div class="container">
    <div class=" row py-5 mt-4 align-items-center">
        <!-- For Demo Purpose -->
      <div class="col-md-5 pr-lg-5 mb-5 mb-md-0">
          <vue-fontawesome  class="btn_cat" icon="user" size="8" color="black"></vue-fontawesome> <br/>
            <!-- <strong> <p>Account:</p> </strong> -->
          <h1>{{$auth.user.name}}</h1>
          <h4>{{$auth.user.email}}</h4>
        
      </div>

      <b-spinner style="width: 2rem; height: 2rem;" type="grow" label="Loading..." variant="primary" v-if="showSpinner"></b-spinner> 

        <!-- Registeration Form -->
      <div class="col-md-7 col-lg-6 ml-auto">
        <div class="row">
        <strong> <h3>Account details:</h3> </strong> <br/> <br/>            
  <div class="container">
  <div>
  <div class="col"><br>
    <strong><p>City <vue-fontawesome  class="btn_cat" icon="map-marker-alt" size="1" color="black"></vue-fontawesome>:</p></strong>
    <h3 class="seller">{{currentUser.city}}</h3>
     <strong><p>District <vue-fontawesome  class="btn_cat" icon="map-marked-alt" size="1" color="black"></vue-fontawesome>:</p></strong>
    <h3 class="seller">{{currentUser.district}}</h3>
    </div>
    <div class="col">
     <br/>
       <strong><p>Address  <vue-fontawesome  class="btn_cat" icon="address-card" size="1" color="black"></vue-fontawesome>:</p> </strong>
      <p class="bought-items description">{{currentUser.address}}</p>
     <br>
       <strong><p>Phone Number <vue-fontawesome  class="btn_cat" icon="phone" size="1" color="black"></vue-fontawesome>:</p> </strong>
      
      <p class="bought-items description">1 - {{currentUser.phone1}}</p>
      <p class="bought-items description">2 - {{currentUser.phone2}}</p><br>
    </div>
  
  </div>
</div>         
</div>
 </div>
</div>
</div>

 <b-modal id="modal-1" title="Update Account Information" hide-footer >
 <div>
   <form v-on:submit.prevent="onSubmit">
     <b-form-input  type="text" class="form-control item" id="address" name="address" placeholder="Address*" :value="currentUser.address"></b-form-input>
      <b-form-input type="text" class="form-control item" id="district" name="district" placeholder="District* " :value="currentUser.district"></b-form-input>
       <b-form-input type="text" class="form-control item" id="city" name="city" placeholder="City" :value="currentUser.city"></b-form-input>

        <b-form-input type="text" class="form-control item" id="phone1" name="phone1" placeholder="Phone Number1* " :value="currentUser.phone1"></b-form-input>
     <b-form-input  type="text" class="form-control item" id="phone2" name="phone2" placeholder="Phone Number2* " :value="currentUser.phone2"></b-form-input>
         <b-button type="submit" @click="$bvModal.hide('modal-1'), makeToast1()" variant="primary">Save</b-button>
        
        </form>
  </div>
  </b-modal> 
	</Layout>
</template>


<style scoped>
.border-md {
    border-width: 2px;
}

.btn-facebook {
    background: #405D9D;
    border: none;
}

.btn-facebook:hover, .btn-facebook:focus {
    background: #314879;
}

.btn-twitter {
    background: #42AEEC;
    border: none;
}

.btn-twitter:hover, .btn-twitter:focus {
    background: #1799e4;
}



/*
*
* ==========================================
* FOR DEMO PURPOSES
* ==========================================
*
*/

.form-control:not(select) {
    padding: 1.5rem 0.5rem;
}

select.form-control {
    height: 52px;
    padding-left: 0.5rem;
}

.form-control::placeholder {
    color: #ccc;
    font-weight: bold;
    font-size: 0.9rem;
}
.form-control:focus {
    box-shadow: none;
}


.cardtext{
     color: #ccc;
    font-weight: bold;
    font-size: 0.9rem;
    font-size: 30px;
}




.registration-form{
	padding: 10px 0;
}

.registration-form form{
    background-color: #fff;
    max-width: 600px;
    margin: auto;
    padding: 50px 70px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
}

.registration-form .form-icon{
	text-align: center;
    
    color: white;
    width: 50px;
    height: 50px;
    margin: auto;
    margin-bottom: 50px;
    line-height: 100px;
}

.registration-form .item{
	border-radius: 20px;
    margin-bottom: 25px;
    padding: 10px 20px;
}

.registration-form .create-account{
    border-radius: 30px;
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bold;
    background-color: #5791ff;
    border: none;
    color: white;
    margin-top: 20px;
}

.registration-form .social-media{
    max-width: 600px;
    background-color: #fff;
    margin: auto;
    padding: 35px 0;
    text-align: center;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    color: #9fadca;
    border-top: 1px solid #dee9ff;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
}

.registration-form .social-icons{
    margin-top: 30px;
    margin-bottom: 16px;
}

.registration-form .social-icons a{
    font-size: 23px;
    margin: 0 3px;
    color: green;
    border: 1px solid;
    border-radius: 50%;
    width: 45px;
    display: inline-block;
    height: 45px;
    text-align: center;
    background-color: #fff;
    line-height: 45px;
}

.registration-form .social-icons a:hover{
    text-decoration: none;
    opacity: 0.6;
}

.mb-4{
    padding-left: 400px;
}

.past-orders{
  height: 200px;
  overflow: scroll
  
}
.fa-user{
  font-size: 250px;
  color: green;
 
}

.cout{
  border-left: 1px solid green;
  border-right: 1px solid green;
  
}


@media (max-width: 576px) {
    .registration-form form{
        padding: 50px 20px;
    }

    .registration-form .form-icon{
        width: 70px;
        height: 70px;
        font-size: 30px;
        line-height: 70px;
    }
}

/* New Profile Card */
/* If you like this, please check my blog at codedgar.com.ve */
@import url('https://fonts.googleapis.com/css?family=Work+Sans');


.card{
  background:black;  border-radius:14px; max-width: 300px; display:block; margin:auto;
  padding:60px; padding-left:20px; padding-right:20px;box-shadow: 2px 10px 40px black; z-index:99;
}

.logo-card{max-width:50px; margin-bottom:15px; margin-top: -19px;}

label{display:flex; font-size:10px; color:white; opacity:.4;}

input{font-family: 'Work Sans', sans-serif;background:transparent; border:none; border-bottom:1px solid transparent; color:#dbdce0; transition: border-bottom .4s;}
input:focus{border-bottom:1px solid #1abc9c; outline:none;}

.cardnumber{display:block; font-size:20px; margin-bottom:8px; }

.name{display:block; font-size:15px; max-width: 200px; float:left; margin-bottom:15px;}

.toleft{float:left;}
.ccv{width:50px; margin-top:-5px; font-size:15px;}

.receipt{background: #dbdce0; border-radius:4px; padding:5%; padding-top:200px; max-width:600px; display:block; margin:auto; margin-top:-180px; z-index:-999; position:relative;}

.col{width:50%; float:left;}
.bought-item{background:#ffffff00; padding:2px;}
.bought-items{margin-top:-3px;}

.cost{color:black;}
.seller{color: black;}
.description{font-size: 13px;}
.price{font-size:12px;}
.comprobe{text-align:center;}
.proceed{position:absolute; transform:translate(300px, 10px); width:50px; height:50px; border-radius:50%; background:#1abc9c; border:none;color:white; transition: box-shadow .2s, transform .4s; cursor:pointer;}
.proceed:active{outline:none; }
.proceed:focus{outline:none;box-shadow: inset 0px 0px 5px white;}
.sendicon{filter:invert(100%); padding-top:2px;}

/* 
scroll bar test */

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

@media (max-width: 600px){
  .proceed{transform:translate(250px, 10px);}
  .col{display:block; margin:auto; width:100%; text-align:center;}

  .mb-4{
    padding-left: 40px;
}

.past,.upd{
  margin: 20px
}

.space1{
   visibility: hidden;
   /* check this */
}

.fa-user{
  font-size: 50px;
  color: green;
  padding-left: 100px;
 
}
}



</style>

