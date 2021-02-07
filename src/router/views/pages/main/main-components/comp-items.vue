<template>
<div>
<!-- Item Edit Modal -->
  <b-modal id="edit_item" title="" size="lg"  hide-header hide-footer>
   <div class="cancel_modal_btn1" @click="$bvModal.hide('edit_item')"> <vue-fontawesome icon="times" size="1.2" color="black"></vue-fontawesome> </div>
     <form v-on:submit=" submitItem_edit">
       <!-- <form v-on:submit.prevent="submitItem"> -->
<div class="addcard-mob">
    <div class="leftadd">
      <div class="main_image_section">
 <input style= "display: none" type="file" ref="fileInput1" />
 <div class="desc_img_upd_lg"> Front view (main) <vue-fontawesome v-b-tooltip.hover title="Main Image for non 3d items. Front view for 3d items" icon="info-circle" size="1" color="green"></vue-fontawesome></div>
  <div class="main_img">
                	<img class="item_image" v-bind:src="img1_place" width="250" height="250" />
                  <div v-b-modal.crop_img1_edit class="overlay_img1"><vue-fontawesome icon="pencil" size="2" color="green"></vue-fontawesome></div>
                  </div>
    </div>
 
 <div class="side_pics">  
<div class="sec1_image_section">
     <div class="sec_img">
       <div class="desc_img_upd_sm"> Rear view <vue-fontawesome v-b-tooltip.hover title="(Optional) Secondary Image/ Rear view for 3d items" icon="info-circle" size="1" color="green"></vue-fontawesome></div>
                	<img class="item_image" v-bind:src="img2_place" width="170" height="170" />
                  <div v-b-modal.crop_img2_edit class="overlay_img2"><vue-fontawesome icon="pencil" size="2" color="green"></vue-fontawesome></div>
                  </div>
                <input style="display:none" type="file"  ref="fileInput2"/>
</div>
            <!-- <img class="img_side" width="50px" height="50px" v-if="img_upd2" :src="img_upd2"/> -->


<div class="sec2_image_section">
  <div class="sec_img">
    <div class="desc_img_upd_sm"> Front view <vue-fontawesome v-b-tooltip.hover title="(Optional) Secondary Image/ Side view for 3d items" icon="info-circle" size="1" color="green"></vue-fontawesome></div>
                	<img class="item_image" v-bind:src="img3_place" width="170" height="170" />
                  <div v-b-modal.crop_img3_edit class="overlay_img3"><vue-fontawesome  icon="pencil" size="2" color="green"></vue-fontawesome></div>
                  
                  </div>
                  <!-- <img class="img_side"  width="50px" height="50px" v-if="img_upd3" :src="img_upd3" /> -->
                      <input style="display:none" type="file" ref="fileInput3" />
               </div>
</div>
       
     
        </div>
          <div class="card-body">

           <div class="form-group">
              <h6>Item name</h6>
                   <b-form-input  :value="name_place" type="text" class="form-control item" id="item_name" name="qty" placeholder="e.g. Black loius shoe" />
            </div>

            <div class="form_input_section">
                 <div class="form-group">
              <h6>Price (₦)</h6>
                 <b-form-input :value="price_place" type="number" class="form-control item" id="item_price" name="qty" placeholder="1000" />
            </div> 
          
                  <div class="form-group">
              <h6>Size (kg, cm,...)</h6>
                 <b-form-input :value="size_place" type="text" class="form-control item" id="item_size" name="qty" placeholder="e.g 4kg" />
            </div>
            </div>
                 
             <p class="modal_notice"> *All deliveries(Beta) are made between 4pm - 6pm daily* </p>

               <div class="form_input_section">
               <div class="form-group">
              <h6>No in stock (units)</h6>
                 <b-form-input  :value="stock_place" type="number" class="form-control item" id="item_stock" name="deli_addy" placeholder=" e.g 15 " />
            </div>
                 <div class="form-group">
              <h6>Process time <vue-fontawesome v-b-tooltip.hover title="Time to get Item ready after notifcation of order" icon="info-circle" size="1" color="green"></vue-fontawesome></h6>
                       <select :value="process_place" id="item_process" name="process" class="form-control item" placeholder="Process time">
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

<textarea type="text" class="form-control item" id="item_desc" name="item_desc" rows="4" cols="50">
{{desc_place}}
</textarea>
     <br/>
                <div class="form-group">
                  <span>
                    <button type="submit" class="done_btn_1" @click="$bvModal.hide('edit_item'), editSpin(), submitItem_edit() ">
              <vue-fontawesome  class="done_btn_icon1" icon="check" size="2" color="green"></vue-fontawesome>
                    </button>
              <div class="done_btn_2" @click="$bvModal.hide('edit_item'), delItem()">
              <vue-fontawesome  class="done_btn_icon2" icon="trash" size="2" color="red"></vue-fontawesome>
            </div>
                  </span>
                <!-- <button type="submit" class="btn btn-success ml-2" @click="$bvModal.hide('edit_item')">Add <vue-fontawesome icon="check" size="1" color="white"></vue-fontawesome></button>
            <button class="btn btn-success ml-2" @click="$bvModal.hide('edit_item'), delItem()">Delete <vue-fontawesome icon="check" size="1" color="white"></vue-fontawesome></button> -->
            </div>

          
      
          </div>
          </div>
         </form>


  </b-modal>
  <!-- show Item information modal -->

  <b-modal id="item_info" title="Item info" hide-footer centered >   
  
<div class = "item_view_grid">
  <div class = "item_view_images">
<div> 
  <b-img class="main_img" src="https://picsum.photos/1024/400/?image=41" fluid alt="Responsive image"></b-img>
</div>
<div class = "item_sec_images">

<span class="sec_image1">
<b-img class="sec_img1" src="https://picsum.photos/300/150/?image=41" fluid alt="Fluid image"></b-img>
</span>
<span class="sec_image2">
<b-img class="sec_img2" src="https://picsum.photos/300/150/?image=41" fluid alt="Fluid image"></b-img>
</span>
</div>
  </div>

<div class="item_view_content">
  <p> Name: Andrews shoes</p>
  <p> Price: N4000</p>
  <p>  Size: 3cm</p>
    <p> Stock: 15 units</p>
  <p> Process time: 4 mins</p>
  <p>  Description: 3cm</p>
</div>

   </div>
  

  </b-modal>
<!-- End of show Item information modal -->


<!-- Share link -->
 <b-modal id="link_share" title="Copy link" centered hide-footer>
    <b-form-input  value="usiere.divo.ng/marys-shoes"> </b-form-input>
  </b-modal>
<!-- End of share link -->

  
 <!-- Onboarding Modal for application  -->
 <div>
    <b-modal ref="my-modal" hide-footer title="Empty Store" centered>
      <div class="row justify-content-center">
        <div class="col-xl-4 col-lg-5 col-8">
          <div class="text-center">
            <div>
              <img src="@assets/images/not-found.png" alt class="img-fluid" />
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 text-center">
          <h3 class="mt-3">Hey {{$auth.user.given_name}}, it seems your store is empty</h3>
          <p class="text-muted mb-5">
            All items that you add from the Divo inventory
            <br />Will be shown in the your Store.
          </p>
           <router-link to="/store/new" class="btn btn-success ml-2" exact>Add to store</router-link>
        </div>
      </div>
     
    </b-modal>
  </div>


<!-- Delete nest Modal -->

 <b-modal id="del-modal" hide-footer title="Remove from Store" centered>
      <div class="row">
        <div class="col-12 text-center">
          <h3 class="mt-3">Are you sure you want to delete <h4>'{{del_item}} ({{'per ' + del_per}})'</h4>from your store?</h3>
        
           <button @click="deleteNest(), refreshPage()"  class="btn btn-success ml-2" exact>Yes</button>
            <button @click="$bvModal.hide('del-modal')" class="btn btn-success ml-2" exact>No</button>
        </div>
      </div>
     
    </b-modal>

<!-- Order Modal  -->
  <b-modal id="modal-1" title=""  hide-header hide-footer>
 

          <div class="card-body">
     
            <div class="item_info">

   
              <div class="item_img">
                	<img  v-bind:src=" info_img" width="170" height="170" />
                  <div class="overlay_img1"><vue-fontawesome icon="pencil" size="2" color="green"></vue-fontawesome></div>
                  </div>
              
              <div class="item_text"><strong><p>{{info_item}}</p></strong>
              <p>₦{{info_price}}</p>
              <p>Per {{info_per}}</p>
              
              
              </div> 
             
              </div>
            
        
            <form v-on:submit.prevent="submitOrder">

                  <div class="form-group">
              <h6>Quantity</h6>
                <input v-model="qty" type="number" class="form-control item" id="qty" name="qty" placeholder="1" />
            </div>
             <p class="modal_notice"> *All deliveries(Beta) are made between 4pm - 6pm daily* </p>
                <div class="form-group">
              <h6>Set delivery Day</h6>
               
                <b-form-datepicker id="example-datepicker" v-model="deli_time" class="mb-2"></b-form-datepicker>
            </div>
           
       
          
               <div class="form-group">
              <h6>Address (Leave blank if profile address)</h6>
                <input v-model="deli_addy" type="text" class="form-control item" id="deli_addy" name="deli_addy" placeholder="Set delivery location" />
            </div>
     
            <div class="form-group">
                <button class="btn btn-block create-account" @click="$bvModal.hide('modal-1'),  delItem()"  > Delete Item</button>
            </div>
        </form>
          </div>
       


  </b-modal>



<!-- Recurring Modal  -->
   <b-modal id="modal-2" title="" centered hide-header>
 

         <h4>Recurring is not available in BETA </h4>
       
  </b-modal>
  

 <b-modal id="share-modal" title="Link to Item" hide-footer centered>
    <b-form-input  id="cpLinkId" :value="'shoesab.divo.ng/'+set_unique"> </b-form-input>
    </br>
    <button class=" btn btn-success ml-2" @click="copylink()"> Copy <vue-fontawesome  class="btn_cat" icon="copy" size="1.2" color="white"></vue-fontawesome></button>
  </b-modal>

<!-- Modal to crop the first image Edit -->
    <b-modal id="crop_img1_edit" title="Crop and upload" centered hide-footer >
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
  <button class="crop_upload_btn btn-success ml-2 btn" @click="img1_place = croppa.generateDataUrl('image/jpeg', 0.8), $bvModal.hide('crop_img1_edit'), onImg1Edit('image/jpeg')"> 
    Upload image
  </button>
</div>

 </div>
  </b-modal>
<!-- Modal to crop the second image Edit -->
    <b-modal id="crop_img2_edit" title="Crop and upload" centered hide-footer >
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
  <button class="crop_upload_btn btn-success ml-2 btn" @click="img2_place = croppa.generateDataUrl('image/jpeg', 0.8), $bvModal.hide('crop_img2_edit'), onImg2Edit('image/jpeg')"> 
    Upload image
  </button>
</div>

 </div>
  </b-modal>

<!-- Modal to crop the third image Edit -->
    <b-modal id="crop_img3_edit" title="Crop and upload" centered hide-footer >
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
  <button class="crop_upload_btn btn-success ml-2 btn" @click="img3_place = croppa.generateDataUrl('image/jpeg', 0.8), $bvModal.hide('crop_img3_edit'), onImg3Edit('image/jpeg')"> 
    Upload image
  </button>
</div>

 </div>
  </b-modal>

 <!-- Main Section begins  -->
 <!-- Getting Items from User store  -->
  <div class="d-flex justify-content-center mb-2" >
    <b-spinner  v-if="editSpinner" style="width: 3rem; height: 3rem;" label="Loading..." variant="primary"></b-spinner>
  </div>

    <!-- <b-progress :value="percentage" :max="100" show-progress animated v-show="percentage > 0"></b-progress> -->
 
<section class="cards" v-if="allItems && allItems.length >0">
<article class="card card--1" v-for="(item, index) in allItems" v-bind:key="item._id">
  <div class="card__info-hover">
   <vue-fontawesome icon="cube" size="1" ></vue-fontawesome> 
      <div class="card__clock-info">
        <!-- <svg class="card__clock"  viewBox="0 0 24 24"><path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
        </svg><span class="card__time">{{item.item_unique}}</span> -->
      </div>
    
  </div>
  <div class="card__img" v-bind:style="{ backgroundImage: 'url(' + item.img_upd1 + ')' }"></div>
  <a href="#" class="card_link">
     <div class="card__img--hover" v-bind:style="{ backgroundImage: 'url(' + item.img_upd1 + ')' }"></div>
   </a>
  <div class="card__info">
    <h3 class="card__title">{{item.item_name}}</h3>
        <span class="card__category"> ₦{{item.item_price}}</span> </br> 
    <!-- <span class="card__by">by <a href="#" class="card__author" title="author">Celeste Mills</a></span> -->
 


   <button v-b-modal.edit_item class="edit_button" @click="get_item_data(item), setId(item._id)" v-b-tooltip.hover title="Edit"> <vue-fontawesome icon="pencil" size="1" ></vue-fontawesome> </button>
 <button v-b-modal.share-modal class="yiu edit_button_right" @click="tosetUnique(item.item_unique)" v-b-tooltip.hover title="Share"> <vue-fontawesome icon="share" size="1" ></vue-fontawesome> </button>


  </div>
</article>
  </section>


</div>
</div>
</div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab:100,300,400,700');
@import url('https://fonts.googleapis.com/css?family=Raleway:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i');



*{
  box-sizing: border-box;
}

body, html {
   font-family: 'Roboto Slab', serif;
    margin: 0;
  width: 100%;
height: 100%;
    padding: 0;
}

body {
  background-color: #D2DBDD;
  display: flex;
  display: -webkit-flex;
  -webkit-justify-content: center;
  -webkit-align-items: center;
  justify-content: center;
  align-items: center;
}


.row  {margin: 0 -5px;}
.row:after {
  content: "";
  display: table;
  clear: both;
}


.cards {
    width: 100%;
    display: grid;
    grid-template-columns: 30% 30% 30%;
    max-width: 1100px;
}

/* .card--1 .card__img, .card--1 .card__img--hover {
    background-image: url('https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260');
}

.card--2 .card__img, .card--2 .card__img--hover {
    background-image: url('https://images.pexels.com/photos/307008/pexels-photo-307008.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260');
} */

.card__like {
    width: 18px;
}

.card__clock {
    width: 15px;
  vertical-align: middle;
    fill: #AD7D52;
}
.card__time {
    font-size: 12px;
    color: #AD7D52;
    vertical-align: middle;
    margin-left: 5px;
}

.card__clock-info {
    float: right;
}

.card__img {
  visibility: hidden;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 235px;
  border-top-left-radius: 12px;
border-top-right-radius: 12px;
  
}

.card__info-hover {
    position: absolute;
    padding: 16px;
  width: 100%;
  opacity: 0;
  top: 0;
}

.card__img--hover {
  transition: 0.2s all ease-out;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
  position: absolute;
    height: 235px;
  border-top-left-radius: 12px;
border-top-right-radius: 12px;
top: 0;
  
}
.card {
  margin-right: 25px;
  transition: all .4s cubic-bezier(0.175, 0.885, 0, 1);
  background-color: #fff;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 13px 10px -7px rgba(0, 0, 0,0.1);
}
.card:hover {
  box-shadow: 0px 30px 18px -8px rgba(0, 0, 0,0.1);
    transform: scale(1.10, 1.10);
}

.card__info {
z-index: 2;
  background-color: #fff;
  border-bottom-left-radius: 12px;
border-bottom-right-radius: 12px;
   padding: 16px 24px 24px 24px;
}

.card__category {
    font-family: 'Monserat', sans-serif;
    text-transform: uppercase;
    font-size: 13px;
    letter-spacing: 2px;
    font-weight: 1000;
  color: #868686;

}

.card__title {
    margin-top: 5px;
    margin-bottom: 10px;
    font-family: 'Roboto Slab', serif;
    font-size: 20px
}

.card__by {
    font-size: 12px;
    font-family: 'Raleway', sans-serif;
    font-weight: 500;
}

.card__author {
    font-weight: 600;
    text-decoration: none;
    color: #AD7D52;
}

.card:hover .card__img--hover {
    height: 100%;
    opacity: 0.3;
}

.card:hover .card__info {
    background-color: transparent;
    position: relative;
}

.card:hover .card__info-hover {
    opacity: 1;
}


.item_info{
    display: grid;
  grid-template-columns: 200px 180px;
 

}

.item_text{
  background-color:teal;
  color: white;
  opacity: 60%;
  font-size: large;
  padding-left:20%;
  padding-top: 15%;
  border-radius: 20%;  
}

.item_img{
    position: relative;
  width: 50%;
  max-width: 300px;
 
}

.overlay_img1 {
  position: absolute;
  bottom: 0;
  background: rgb(248, 245, 245);
  background: rgba(250, 252, 251, 0.5); /* Black see-through */
  color: #f1f1f1;
  width: 100%;
  transition: .5s ease;
  opacity:1;
  color: white;
  font-size: 20px;
  padding: 20px;
  text-align: center;
}

.done_btn_1{
  width: 50px;
  height: 50px;
  border: 2px solid white;
  background-color: white;
  display: inline-block;
   position: relative;
  left: 30px;
}

.done_btn_2{
  width: 50px;
  height: 50px;
  border: 2px solid white;
  display: inline-block;
  position: relative;
  left: 150px;
  cursor: pointer;
}

.done_btn_1:hover{
border: 2px solid green;
border-radius: 7px;
}

.done_btn_2:hover{
border: 2px solid red;
border-radius: 7px;
}

.done_btn_icon1{
  position: relative;

}

.done_btn_icon2{
  position: relative;
  top: 7px;
left: 10px;
}

.cancel_modal_btn1{
  position: relative;
  left: 750px;
  bottom: 10px;
  cursor: pointer;
}


/* Responsive columns - one column layout (vertical) on small screens */
@media screen and (max-width: 600px) {
  .card {
    width: 90%;
    display: block;
    margin-bottom: 20px;

  }

   .addcard-mob{
    display:inherit;
    grid-template-columns: none;
}

.fa-window-close{
  width: 7px;
  padding-left: 0px;
  outline:none
}

.card__img--hover {
  visibility: hidden;
  transition: 0.2s all ease-out;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
  position: absolute;
    height: 235px;
  border-top-left-radius: 12px;
border-top-right-radius: 12px;
top: 0;
  
}

.card__img .img{
width: 150px;
height: 150px
    
    /* check this */
}

.card__img {
  visibility: visible;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 150px;
  border-top-left-radius: 12px;
border-top-right-radius: 12px;
  
}


.card__info {
z-index: 2;
  background-color: #fff;
  border-bottom-left-radius: 12px;
border-bottom-right-radius: 12px;
   padding: 10px 16px 16px 16px;
}

.card__info h3{

}

.price1{
  font-size: 10px;
}

.state{
  font-size: 7.5px;

}

.fa-window-close{
  width: 7px;
  padding-left: 50px;
  outline:none
}

.cards {
    display: grid;
    grid-template-columns: 50% 50%;
}

.card__info {

   padding: 16px 24px 10px 27px;
}

.cancel_modal_btn1{
  position: relative;
  left: 430px;
  bottom: 10px;
  cursor: pointer;
}



}





.btn{
	transition: all .5s ease;
	width: 70%;
	border-radius: 30px;
	color:#008080;
	font-weight: 700;
	background-color: #fff;
	border: 1px solid #008080;
	margin-top: 0.7em;
	margin-bottom: 0.7em;
}
.btn:hover, .btn:focus{
	background-color: #008080;
	color:#fff;
}

.edit_button{
  background-color: white;
  border: 3px solid white ;
  width: 50px;
  border-radius: 100%;
  padding: 10px;
  color: green;
  position: relative;
  left: 20px
}


.edit_button:hover{
  color: white;
  background-color: green;

}

.edit_button_right{
  background-color: white;
  border: 3px solid white;
  width: 50px;
  border-radius: 70%;
  padding: 10px;
  color: green;
  position: relative;
  left: 70px;
}
/* modal card */

.edit_button_right:hover{
  color: white;
  background-color: green;

}


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

.btn-primary{
  width: 120px
}

.item_view_grid{
  display: grid;
  grid-template-columns: 40% 40%;
}

.item_sec_images{
    display: grid;
  grid-template-columns: 50% 50%;
  margin: 10%;
  padding-top: 10%;
}

.sec_image1{

}

.sec_image2{
  margin-left: 10px;
}

.main_img{
  border-radius: 20%;
  width: 150px;
  height:150px
}

.sec_img1{
  border-radius: 20%;
  width: 70px; 
  height: 70px;
}

.sec_img2{
  border-radius: 20%;
  width: 70px; 
  height: 70px;
}

.item_view_content{
  margin: 10%
}

.img{
  border-radius: 30%
}

/* Edit card css */
.addcard-mob{
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


.item_image{

  border-radius: 30%;
 box-shadow: 25px 25px 50px 0 white inset, -25px -25px 50px 0 white inset; 
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
  color: grey

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

/* Croppa style sheet */
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

 .sec1_image_section{
   position: relative;
   top: 60px; 
 }
 .sec2_image_section{
   position: relative;
   top: 60px; 
 }


/* Fallback for Edge
-------------------------------------------------- */

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












</style>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import axios from 'axios'
import {mapGetters, mapActions} from 'vuex'
 import Croppa from 'vue-croppa'  

// Using Vue-croppa
import 'vue-croppa/dist/vue-croppa.css'
 import Vue from 'vue'
 Vue.use(Croppa) 


export default {
	page: {
		title: 'Items',
		meta: [{ name: 'description', content: appConfig.description }],
  },
  props: ['cat'],
	components: {
		VuePerfectScrollbar,
        Layout,
    },

     data() {
    return { 
        cat_name: '',
        cat_field:  '',
        cat_desc: '',
        cat_address: '',
        cat_phone: '',
        user: this.$auth.user.email,
        info_img: "https://divo1-items-pics.s3.us-east-2.amazonaws.com/camera2.png",
        Id: null,
        image: 'https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        img1_place_main: '',
        img2_place_main: '',
        img3_place_main: '',
        img1_place: '',
        img2_place: '',
        img3_place: '',
        e_upd1: '',
        e_upd2: '',
        e_upd3: '',
        name_place: '', 
        price_place: '',
        size_place: '',
        stock_place: '',
        process_place: '',
        desc_place: '',
        item_id: '',
        set_unique: '',
        allItems_cat: [],
        showSpinner: true,
        editSpinner: '',
        percentage: 0
    
}
  },
   async mounted(){
    this.fetchItems(this.cat),

    setTimeout(() => this.showSpinner = false, 1000);
  },
  
    methods:{
        ...mapActions("items",['fetchItems', 'deleteItem', 'editItem', 'updateItem']),

        submitCat(e) {
          e.preventDefault();

        const cat = {
             cat_name : this.cat_name,
        cat_field: this.cat_field,
        cat_desc: this.cat_desc,
        cat_address: this.cat_address,
        cat_phone: this.cat_phone,
        user: this.user
        }



          console.log("this is cat" + JSON.stringify(cat))
          this.addCat(cat)

    },

// deleting Item from vuex state and database

setId: async function(id){
  this.Id = id
},
    delItem:  async function(){
      this.deleteItem(this.Id)
      console.log('usiere is the main man here')
      console.log(this.Id)
},

tosetUnique(unique){
  this.set_unique = unique
  console.log('this is the unique' +unique)
},

get_item_data(item){
   console.log( "this one sabi item sha" + item.item_name)
   this.img1_place_main = item.img_upd1;
   this.img2_place_main = item.img_upd2;
   this.img3_place_main = item.img_upd1;
   this.img1_place = item.img_upd1;
   this.img2_place = item.img_upd2;
   this.img3_place = item.img_upd3;
   this.name_place = item.item_name;
   this.price_place = item.item_price;
   this.size_place = item.item_size;
   this.stock_place = item.item_stock;
   this.process_place = item.item_process;
   this.desc_place = item.item_desc;
   this.item_id = item._id
},

  onImg1Edit(type, compressionRate) {
         console.log('i dey check amina')
      this.croppa.generateBlob((blob) => {
          this.e_upd1 = blob
           console.log('bguihih' + this.e_upd1)
      }, type, compressionRate);
    },

    onImg2Edit(type, compressionRate) {
         console.log('i dey check amina')
      this.croppa.generateBlob((blob) => {
          this.e_upd2 = blob
           console.log('bguihih' + this.e_upd2)
      }, type, compressionRate);
    },

    onImg3Edit(type, compressionRate) {
         console.log('i dey check amina')
      this.croppa.generateBlob((blob) => {
          this.e_upd3 = blob
           console.log('bguihih' + this.e_upd3)
      }, type, compressionRate);
    },

// Submitting Item Edit form
        submitItem_edit(e) {
          e.preventDefault();
          console.log(document.getElementById('item_name').value)

// Using form data to upload pictures
      const form_data = new FormData();
      form_data.append("name", document.getElementById('item_name').value);
      form_data.append("price", document.getElementById('item_price').value);
       form_data.append("size", document.getElementById('item_size').value);
        form_data.append("stock", document.getElementById('item_stock').value);
       form_data.append("process", document.getElementById('item_process').value);
       form_data.append("desc",  document.getElementById('item_desc').value);
      form_data.append("id",  this.item_id);
// appending only if value is avalable
       if(this.e_upd1 !== ''){
            form_data.append("img1", this.e_upd1);
}
      if(this.e_upd2 !== ''){
            form_data.append("img2", this.e_upd2);
}
      if(this.e_upd3 !== ''){
            form_data.append("img3", this.e_upd3);
}
// end of form data append
       console.log(form_data + 'checking if this is it')


        const item_e = {
                    item_name: document.getElementById('item_name').value,
                 item_price: document.getElementById('item_price').value,
                 item_size: document.getElementById('item_size').value,
                 item_stock: document.getElementById('item_stock').value,
                 item_process: document.getElementById('item_process').value,
                 item_desc: document.getElementById('item_desc').value,
                 img_upd1: this.img1_place_main,
                 img_upd2: this.img2_place_main,
                  img_upd3: this.img3_place_main,
                  _id: this.item_id
                //  form_data
        }
        if(this.img1_place !== this.img1_place_main){
          item_e.img_upd1 = this.img1_place
  }
       if(this.img2_place !== this.img2_place_main){
         item_e.img_upd2 = this.img2_place
  }
       if(this.img3_place !== this.img3_place_main){
          item_e.img_upd3 = this.img3_place
  }


          this.editItem(item_e)
          this.updateItem(form_data)
    },
  copylink(){
      /* Get the text field */
  var cplink = document.getElementById("cpLinkId");

  /* Select the text field */
  cplink.select();
  cplink.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");

  },

updProgress() {
  // for evaluating the percentage for progress bar
const intperc = setInterval(() => {
  if(this.percentage<100)
  this.percentage += 1;
  else
  clearInterval(intperc)
}, 50);
this.percentage = 0
console.log('the percentage is now' + this.percentage)
    },

// spinner to show after the edit button has been clicked
  editSpin(){
    this.editSpinner = true
     setTimeout(() => this.editSpinner = false, 1000);
  }

    },

    computed: mapGetters("items",['allItems']),

}
</script>