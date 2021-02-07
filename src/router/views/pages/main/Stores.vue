<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import compStores from '@src/router/views/pages/main/main-components/comp-stores'
import axios from 'axios'
import { mapActions, mapGetters} from 'vuex'

export default {
	page: {
		title: 'Nests',
		meta: [{ name: 'description', content: appConfig.description }],
	},
	components: {
		VuePerfectScrollbar,
        Layout,
        compStores
    },

    data() {
     return { 
        cat_name: '',
        cat_field:  '',
        cat_desc: '',
        cat_address: '',
        cat_phone: '',
        cat_unique: '',
        user: this.$auth.user.email,
        uniqueErr: "",
        uniqueSuc: "",
        uniqueErrTrue: false,
        checks: [],
        showSpinner: true

    
}
  },
  
    methods:{
        ...mapActions("cats",['addCat']),
        submitCat(e) {
        e.preventDefault();

        const cat = {
            cat_name : this.cat_name,
            cat_field: this.cat_field,
            cat_desc: this.cat_desc,
            cat_address: this.cat_address,
            cat_phone: this.cat_phone,
            cat_unique: this.cat_unique,
            user: this.user
        }

          console.log("this is cat" + JSON.stringify(cat))
          this.addCat(cat)
          document.getElementById('addForm').reset();// not working

    },

    async uniqueCheck2 (){
        this.checks = this.allCats,
        console.log(this.checks)
    },
    makeToast1() {
        this.$toasted.show("New store added !!", { 
	    theme: "toasted-primary", 
	    position: "top-right", 
	    duration : 5000
});
      }
  },

    watch: {
        cat_unique: function (i) {
        for (i = 0;  i < this.checks.length; i++) {
            if ( this.checks[i].unique == this.cat_unique){
                this.uniqueErr =  "name is not available"
                console.log('dont go there ooh')
            }
            else{
                this.uniqueSuc= 'name is available'
            }

            console.log(this.uniqueErr)

    }
        if (this.cat_unique === ''){
            this.uniqueErr = "",
            this.uniqueSuc = ""
        }
        }
  },

    mounted(){
       setTimeout(() => this.showSpinner = false, 500);
  },

    computed: mapGetters("cats",['allCats'])



}
</script>

<template>
	<Layout>
        <div class="d-flex flex-column">
            <div class= "heading">
                <h1 class="home-title">
                <span><b-spinner style="width: 3rem; height: 3rem;" type="grow" label="Loading..." variant="primary" v-if="showSpinner"></b-spinner> {{$auth.user.given_name}}'s Stores </span>   
                </h1>
                <!-- <router-link to="/store/new" class="fas fa-arrow-left"></router-link >   -->
                <div class="sall"><button v-b-modal.add-cat class=" btn btn-success ml-2" @click="uniqueCheck2()">New Store <vue-fontawesome icon="plus" size="1.5" color="white"></vue-fontawesome> </button> </div>
            </div>
            
    <b-modal id="add-cat" title="Add new store"  hide-header hide-footer>
        <div class="registration-form">
        <form v-on:submit="submitCat" id="addForm">
        <span class="store_icon">
        <vue-fontawesome icon="home" size="2" color="grey"></vue-fontawesome>
        </span>

        <div class="form-group">
            <input v-model="cat_name" type="text" class="form-control item" id="title" placeholder="Store name"> 
        </div>
        <div class="form-group">
            <vue-fontawesome v-b-tooltip.hover title="Unique Identifier that will be embeded in the link for this store.(Should not contain spaces)" icon="info-circle" size="1" color="green"></vue-fontawesome><input v-model="cat_unique" type="text" class="form-control item" id="unique" placeholder="Unique ID">
        <div  v-show="uniqueErr === 'name is not available'" >  <b-alert show  variant="danger">{{uniqueErr}}</b-alert> </div>
        <div v-show="uniqueSuc === 'name is available'"><b-alert show variant="success">{{uniqueErr}}</b-alert> </div>
        </div>
        <div class="form-group">
            <select v-model="cat_field" id="field" name="cars" class="form-control item" placeholder="Category">
            <option value="" selected disabled hidden>Category</option>
            <option value="fashion">Fashion</option>
            <option value="health-beauty">Health & Beauty</option>
            <option value="electronics">Electronics</option>
            <option value="phones">Phones & Tablets</option>
            <option value="agric">Agric products</option>
            <option value="home">Home, furniture & Appliances</option>
            <option value="kids">Babies & Kids</option>
            </select>
         </div>    
        <div class="form-group">
            <input v-model="cat_address" type="text" class="form-control item" id="address" placeholder="Store address">
        </div>
        <div class="form-group">
            <input v-model="cat_phone" type="text" class="form-control item" id="phone" placeholder="Phone contact">
        </div>
        <textarea v-model="cat_desc" type="message" class="form-control item" id="desc" placeholder="Description">
        </textarea>
        <div class="form-group">
            <button type="submit" class="btn btn-success ml-2" @click="$bvModal.hide('add-cat'), makeToast1()">Add Store<vue-fontawesome icon="check" size="1.5" color="white"></vue-fontawesome></button>
        </div>
            </form>
        
        </div>
        
    </b-modal>
            

                    <compStores />
            
        

        

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

.fa-arrow-left{
    font-size: 30px;
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
    display: inline-block;
    line-height: 1.2;
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

.sall{
    margin-left: 700px
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
    border-radius: 50%;
    color: green;
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
    color: #5691ff;
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

.side-pics{
    display: grid;
    grid-template-columns: 30% 30% 30%;
}

.img_side{
    margin: 30%;
    padding: 30%
}

.store_icon{
    position: relative;
    left: 150px;
    bottom: 30px;
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

@media screen and (max-width: 600px) {
.sall{
    margin-left: 300px;
    margin-bottom: 10px
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

