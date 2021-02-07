<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import  compItems from '@src/router/views/pages/main/main-components/comp-items'
import axios from 'axios'
import { mapActions, mapGetters} from 'vuex'
 import Croppa from 'vue-croppa'  

// Using Vue-croppa
import 'vue-croppa/dist/vue-croppa.css'
 import Vue from 'vue'
 Vue.use(Croppa) 



export default {
	page: {
		title: 'Nests',
		meta: [{ name: 'description', content: appConfig.description }],
    },
    
	components: {
		VuePerfectScrollbar,
        Layout,
        compItems
    },
    
     data() {
    return {
                 cat_n: '',
                 cat_id: '',
                 img_upd1: "https://divo-ven.s3-ap-southeast-1.amazonaws.com/pic_clipart.png",
                 img_upd2: "https://divo-ven.s3-ap-southeast-1.amazonaws.com/pic_clipart.png",
                 img_upd3: "https://divo-ven.s3-ap-southeast-1.amazonaws.com/pic_clipart.png",
                 item_name: '',
                 item_price: '',
                 item_size: '',
                 item_stock:'',
                 item_process:'',
                 item_desc:'',
                 item_unique:'',
                 upd1: null,
                 upd2: null,
                 upd3: null,
                 upd4: null,
                 photos: [],
                 info_img: "https://divo1-items-pics.s3.us-east-2.amazonaws.com/camera2.png",
                 toastCount: 0,
                 showSpinner: true,
                 user: this.$auth.user.email

  }},

  created(){
      this.cat_n = this.$route.params.cat_picked
      this.cat_id = this.$route.params.id
      this.setCatId(this.cat_id)

    console.log(this.cat_n)
    console.log(this.cat_id)
  setTimeout(() => this.showSpinner = false, 500);
  },

methods: {
      // const file = e.target.files[0];
      // this.img_upd1 = URL.createObjectURL(file);
      // this.upd1 = file
       onImg1Change(type, compressionRate) {
         console.log('i dey check amina')
      this.croppa.generateBlob((blob) => {
          this.upd1 = blob
           console.log('bguihih' + this.upd1)
      }, type, compressionRate);
      console.log('bguihih')
    },


    onImg2Change(type, compressionRate) {
         console.log('i dey check amina')
      this.croppa.generateBlob((blob) => {
          this.upd2 = blob
           console.log('bguihih' + this.upd2)
      }, type, compressionRate);
      console.log('bguihih')
    },
    
        onImg3Change(type, compressionRate) {
         console.log('i dey check amina')
      this.croppa.generateBlob((blob) => {
          this.upd3 = blob
           console.log('bguihih' + this.upd3)
      }, type, compressionRate);
      console.log('bguihih')
    },
 
    //   onImg4Change(e) {
    //   const file = e.target.files[0];
    //   this.img_upd4 = URL.createObjectURL(file);
    //   this.upd4 = file
    // },


// bringing in vuex for items
 ...mapActions("items",['addItem', 'postItem', 'setCatId']),
        submitItem(e) {
          e.preventDefault();
this.photos = [this.upd1, this.upd2, this.upd3]
// Using form data to upload pictures
      const form_data = new FormData();
    form_data.append("img1", this.upd1);
    form_data.append("img2", this.upd2);
    form_data.append("img3", this.upd3);
      form_data.append("name", this.item_name);
      form_data.append("price", this.item_price);
       form_data.append("size", this.item_size);
        form_data.append("stock", this.item_stock);
       form_data.append("process", this.item_process);
       form_data.append("desc", this.item_desc);
       form_data.append("unique", this.item_unique);
        form_data.append("cat", this.cat_id);
         form_data.append("vendor", this.user)




//
        const item = {
            img_upd1: this.img_upd1,
                 img_upd2: this.img_upd2,
                 img_upd3: this.img_upd3,
                 item_name: this.item_name,
                 item_price: this.item_price,
                 item_size: this.item_size,
                 item_stock:this.item_stock,
                 item_process:this.item_process,
                 item_desc:this.item_desc,
                 item_unique:this.item_unique,
                 cat: this.cat_id,
                 vendor: this.user
                //  form_data
        }
          this.addItem(item)
          this.postItem(form_data)

// Vuex ends here
    },

generateRandomString (length=6){
return Math.random().toString(20).substr(2, length)
},

saveRandom(){
const unique1 = this.generateRandomString()
     for (const i = 0;  i < this.allItems.length; i++) {
        if ( this.allItems[i].unique !== unique1){
            this.item_unique = unique1
            console.log(this.item_unique)
        }
        else{
            this.saveRandom() // cross check this
        }

}
  },
       makeToast1() {
   this.$toasted.show("Item added !!", { 
	 theme: "toasted-primary", 
	 position: "top-right", 
	 duration : 5000
});
      }

  },

 computed: mapGetters("items",['allItems']),


}

</script>

<template>
	<Layout>
	<div class="d-flex flex-column">
		<div class= "heading">
       <h1 class="home-title">
  <div class="oneline"><div class="user_title">
    <router-link to="/" v-b-tooltip.hover title="Go to Stores"><vue-fontawesome icon="arrow-left" size="1.5" color="black"></vue-fontawesome></router-link>
    &nbsp {{$auth.user.given_name}}'s Stores</div> / {{cat_n}}   
    <button  v-b-modal.add-modal v-b-tooltip.hover title="Add Item" class="btn_add btn btn-success ml-2" @click="saveRandom()"><vue-fontawesome icon="plus" size="1.5" color="white"></vue-fontawesome>
    </button> 
    </div> </br>
  <!-- <div class="sall"><button  v-b-modal.add-modal  class=" btn btn-success ml-2" @click="saveRandom()">Add Item <vue-fontawesome icon="plus" size="1.5" color="white"></vue-fontawesome></button> </div> -->
</h1>
   <div class="d-flex justify-content-center mb-3">
       <b-spinner style="width: 2rem; height: 2rem;" type="grow" label="Loading..." variant="primary" v-show="showSpinner"></b-spinner>  
  </div>

 

	    </div>
		 <hr/>
	
				<compItems v-bind:cat="cat_id"/>
		


      

    </div>

  <b-modal id="add-modal" title="" size="lg"  hide-header hide-footer>
    <div class="cancel_modal_btn1" @click="$bvModal.hide('add-modal')"> <vue-fontawesome icon="times" size="1.2" color="black"></vue-fontawesome> </div>
   <form v-on:submit.prevent="submitItem">
       <!-- <form v-on:submit.prevent="submitItem"> -->
<div class="addcard">
    <div class="leftadd">

      <div class="main_image_section">
 <input style= "display: none" type="file" @change="onImg1Change" ref="fileInput1" />
 <div class="desc_img_upd_lg"> Main Image <vue-fontawesome v-b-tooltip.hover title="Main Image for non 3d items. Front view for 3d items" icon="info-circle" size="1" color="green"></vue-fontawesome> </div>
  <div class="main_img">
                	<img class="item_image1" v-bind:src=" img_upd1"  />
                  <div v-b-modal.crop_img1 class="overlay_img1"><vue-fontawesome icon="pencil" size="2" color="green"></vue-fontawesome></div>
                  </div>
    </div>
 

 <div class="side_pics">  
<div class="sec1_image_section">
     <div class="sec_img">
       <div class="desc_img_upd_sm"> Image 2 <vue-fontawesome v-b-tooltip.hover title="(Optional) Secondary Image/ Rear view for 3d items" icon="info-circle" size="1" color="green"></vue-fontawesome></div>
                	<img class="item_image2"  v-bind:src=" img_upd2" />
                  <div v-b-modal.crop_img2  class="overlay_img2"><vue-fontawesome icon="pencil" size="2" color="green"></vue-fontawesome></div>
                  </div>
                <input style="display:none" type="file" @change="onImg2Change" ref="fileInput2"/>
</div>
            <!-- <img class="img_side" width="50px" height="50px" v-if="img_upd2" :src="img_upd2"/> -->
           

<div class="sec2_image_section">
  <div class="sec_img">
    <div class="desc_img_upd_sm"> Image 3 <vue-fontawesome v-b-tooltip.hover title="(Optional) Secondary Image/ Side view for 3d items" icon="info-circle" size="1" color="green"></vue-fontawesome></div>
                	<img class="item_image3"  v-bind:src=" img_upd3"  />
                  <div v-b-modal.crop_img3 class="overlay_img3"><vue-fontawesome  icon="pencil" size="2" color="green"></vue-fontawesome></div>
                  
                  </div>
                  <!-- <img class="img_side"  width="50px" height="50px" v-if="img_upd3" :src="img_upd3" /> -->
                      <input style="display:none" type="file" @change="onImg3Change" ref="fileInput3" />
               </div>
</div>
       
     
        </div>
          <div class="card-body">

           <div class="form-group">
              <h6>Item name</h6>
                <input v-model="item_name" type="text" class="form-control item" id="qty" name="qty" placeholder="e.g. Black loius shoe" />
            </div>

            <div class="form_input_section">
                 <div class="form-group">
              <h6>Price (₦)</h6>
                <input v-model="item_price" type="number" class="form-control item" id="qty" name="qty" placeholder="1000" />
            </div> 
          
                  <div class="form-group">
              <h6>Size (kg, cm,...)</h6>
                <input v-model="item_size" type="text" class="form-control item" id="qty" name="qty" placeholder="e.g 4kg" />
            </div>
            </div>
                 
             <p class="modal_notice"> *All deliveries(Beta) are made between 4pm - 6pm daily* </p>

               <div class="form_input_section">
               <div class="form-group">
              <h6>No in stock (units)</h6>
                <input v-model="item_stock" type="number" class="form-control item" id="deli_addy" name="deli_addy" placeholder=" e.g 15 " />
            </div>
              <div class="form-group">
              <h6>Process time <vue-fontawesome v-b-tooltip.hover title="Time to get Item ready after notifcation of order" icon="info-circle" size="1" color="green"></vue-fontawesome></h6>
                       <select v-model="item_process" id="field" name="process" class="form-control item" placeholder="Process time">
 <option value="" selected disabled hidden>Pick time</option>
  <option value="none">None</option>
  <option value="30 mins">30 Minutes</option>
  <option value="1 hour">1 Hour</option>
  <option value="2 hours">2 Hours</option>
  <option value="3 hours">3 Hours</option>
  <option value="4 hours">4 Hours</option>
  <option value="5 hours">5 Hours</option>
</select>
            </div>
               </div>
              
            <label for="w3review"> <h6>Description</h6></label>

<textarea v-model="item_desc" type="text" class="form-control item" id="deli_addy" name="deli_addy" rows="4" cols="50">
At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.
</textarea>
     <br/>
                <div class="form-group">
                <button type="submit" class="btn btn-success ml-2" @click="$bvModal.hide('add-modal'), makeToast1()">Add <vue-fontawesome icon="check" size="1" color="white"></vue-fontawesome></button>
            </div>
      
          </div>
          </div>
         </form>


  </b-modal>

  <b-modal id="crop_img1" title="Crop and upload" centered hide-footer >
<div class="crop_modal">
  <croppa v-model="croppa"
         :width="250"
         :height="250"
         placeholder="Add image here"
         placeholder-color="#000"
         :placeholder-font-size="16"
         canvas-color="white"
         :show-remove-button="true"
         remove-button-color="black"
         :show-loading="true"
         :loading-size="50"
         >
 </croppa>

<div>

  <div class="fit_image_info"> Kindly fit imege properly before upload</div>
  <button class="crop_upload_btn btn-success ml-2 btn" @click="img_upd1 = croppa.generateDataUrl('image/jpeg', 0.8), $bvModal.hide('crop_img1'), onImg1Change('image/jpeg')"> 
    Upload image
  </button>
</div>

 </div>
  </b-modal>

<!-- Modal to crop the second image -->
    <b-modal id="crop_img2" title="Crop and upload" centered hide-footer >
<div class="crop_modal">
  <croppa v-model="croppa"
         :width="250"
         :height="250"
         placeholder="Add image here"
         placeholder-color="#000"
         :placeholder-font-size="16"
         canvas-color="white"
         :show-remove-button="true"
         remove-button-color="black"
         :show-loading="true"
         :loading-size="50"
         >
 </croppa>

<div>

  <div class="fit_image_info"> Kindly fit imege properly before upload</div>
  <button class="crop_upload_btn btn-success ml-2 btn" @click="img_upd2 = croppa.generateDataUrl('image/jpeg', 0.8), $bvModal.hide('crop_img2'), onImg2Change('image/jpeg')"> 
    Upload image
  </button>
</div>

 </div>
  </b-modal>

<!-- Modal to crop the third image -->
    <b-modal id="crop_img3" title="Crop and upload" centered hide-footer >
<div class="crop_modal">
  <croppa v-model="croppa"
         :width="250"
         :height="250"
         placeholder="Add image here"
         placeholder-color="#000"
         :placeholder-font-size="16"
         canvas-color="white"
         :show-remove-button="true"
         remove-button-color="black"
         :show-loading="true"
         :loading-size="50"
         >
 </croppa>

<div>

  <div class="fit_image_info"> Kindly fit imege properly before upload</div>
  <button class="crop_upload_btn btn-success ml-2 btn" @click="img_upd3 = croppa.generateDataUrl('image/jpeg', 0.8), $bvModal.hide('crop_img3'), onImg3Change('image/jpeg')"> 
    Upload image
  </button>
</div>

 <b-tooltip target="tooltip-target-1" triggers="hover">
   Upload main Image here
  </b-tooltip>

 </div>
  </b-modal>
    
    
	</Layout>
</template>

<style lang="scss">
$b-toast-background-opacity: 10
</style>


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
}

/* .home-title span::after{
//     content: '';
//     position: absolute;
//     top: 0;
//     right: 0;
//     width: 100%;
//     height: 100%;
//     background: white;
//     animation: a-ltr-after 2s cubic-bezier(.77,0,.18,1) forwards;
//     transform: translateX(-101%);
 }*/

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
    padding-left: 700px;
}

.cancel_modal_btn1{
  position: relative;
  left: 750px;
  bottom: 10px;
  cursor: pointer;
}

hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

@keyframes a-ltr-after{
    0% {transform: translateX(-100%)}
    100% {transform: translateX(101%)}
}

@keyframes a-ltr-before{
    0% {transform: translateX(0)}
    100% {transform: translateX(200%)}
}

/* modal card */


:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: .75rem;
}


.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signin {
  width: 100%;
}

.form-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: .1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: auto;
  border-radius: 2rem;
}

.form-label-group>input,
.form-label-group>label {
  padding: var(--input-padding-y) var(--input-padding-x);
}

.form-label-group>label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: .25rem;
  transition: all .1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown)~label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}

.btn-google {
  color: white;
  background-color: #ea4335;
}

.btn-facebook {
  color: white;
  background-color: #3b5998;
}

.modal_notice{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 13px;
  font-style: initial;
  color: #008080;
}


.price1{
  font-size: 20px;
}

.state{
  font-size: 15px;

}

.delete{
  padding-left: 30px;
}

.fa-window-close{
  width: 7px;
  padding-left: 200px;
  outline:none
}
/* Fallback for Edge
-------------------------------------------------- */

.addcard{
    display: grid;
    grid-template-columns: 50% 50%;
}

.leftadd{
    border-right: 2px solid rgb(221, 220, 220);
}

.addinfo{
    width: 300px;
    height: 50px;
    background-color: green;
    border-radius: 30%;
    color: white;
}

.side_pics{
    display: grid;
    grid-template-columns: 45% 45%;
}

.img_side{
    margin: 30px;
  
}

.main_img{
    position: relative;
  width: 50%;
  max-width: 300px;
  left: 30px;
}

.sec_img{
    position: relative;
  max-width: 300px;
}


.item_image1{
  border-radius: 30%;
 box-shadow: 25px 25px 50px 0 white inset, -25px -25px 50px 0 white inset; 
 height: 250px;
 width: 250px;
}

.item_image2{
  border-radius: 30%;
 box-shadow: 25px 25px 50px 0 white inset, -25px -25px 50px 0 white inset; 
 height: 170px;
 width: 170px;
}

.item_image3{
  border-radius: 30%;
 box-shadow: 25px 25px 50px 0 white inset, -25px -25px 50px 0 white inset; 
 height: 170px;
 width: 170px;
}


.overlay_img1 {
  position: absolute;
  bottom: 70px;
  left: 70px;
  background: rgb(248, 245, 245);
  background: rgba(250, 252, 251, 0.5); /* Black see-through */
  color: #f1f1f1;
  width: 60%;
  transition: .5s ease;
  opacity:90%;
  color: white;
  font-size: 20px;
  padding: 20px;
  text-align: center;
  border-radius: 30%;
  cursor: pointer;
}


.overlay_img2, .overlay_img3 {
  position: absolute;
  bottom: 38px;
  left: 43px;
  background: rgb(248, 245, 245);
  background: rgba(250, 252, 251, 0.5); /* Black see-through */
  color: #f1f1f1;
  width: 50%;
  transition: .5s ease;
  opacity:90%;
  color: white;
  font-size: 20px;
  padding: 20px;
  text-align: center;
  border-radius: 30%;
  cursor: pointer;
}


.overlay_img1:hover, .overlay_img2:hover, .overlay_img3:hover{
 background-color: aquamarine;
}

.form_input_section{
  display: grid;
  grid-template-columns: 50% 50%;
  
}

.desc_img_upd_sm{
  position: relative;
  left: 10px;
  margin: 20px;
  border-bottom: 3px solid green;
  padding: 5px;
  color: black;
  font-weight: bold;

}

.desc_img_upd_lg{
  position: relative;
  left: 50px;
  margin: 20px;
  border-bottom: 3px solid green;
  padding: 5px;
  color: black;
  width: 180px;
  font-weight: bold;

}

.croppa-container {
   background-color: white;
   border: 1px solid black;
   border-radius: 8px;
 }
 
 .croppa-container:hover {
   opacity: 1;

 }

 .crop_modal{
   display: grid;
   grid-template-columns: 54.5% 30%;
 }

 .crop_upload_btn{
   position: relative;
   left: 30px;
   top: 30px
 }

 .fit_image_info{
   border: 2px dotted green;
   background-color: white;
   position: relative;
   left: 30px;
   top: 10px;
   padding: 5px;
   color: black;
 }

 .user_title{
   font-size: 20px;
 }

 .btn_add{
   position: relative;
   left: 550px;
 }

 .oneline{
   display:inline-block
 }

 @media screen and (max-width: 600px) {
.sall{
    padding-left: 150px;
}

 .btn_add{
   position: relative;
   left: 30px;
 }

 .addcard{
    display:inherit;
    grid-template-columns: none;
}

 .main_image_section{
   position: relative;
   left: 45px;
 }

 .side_pics{
    display: grid;
    grid-template-columns: 45% 45%;
    position: relative;
    left: 25px;
}

.item_image1{
 height: 230px;
 width: 230px;
}

.cancel_modal_btn1{
  position: relative;
  left: 430px;
  bottom: 10px;
  cursor: pointer;
}


.overlay_img1 {
  position: absolute;
  bottom: 70px;
  left: 50px;

}


.overlay_img2, .overlay_img3 {
  position: absolute;
  bottom: 38px;
  left: 35px;

}


}



@supports (-ms-ime-align: auto) {
  .form-label-group>label {
    display: none;
  }
  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
}

/* Fallback for IE
-------------------------------------------------- */

@media all and (-ms-high-contrast: none),
(-ms-high-contrast: active) {
  .form-label-group>label {
    display: none;
  }
  .form-label-group input:-ms-input-placeholder {
    color: #777;
  }
}

/* Checking file upload */
#app {
  padding: 20px;
}

#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
</style>

