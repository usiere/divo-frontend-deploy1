<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import axios from "axios"

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
            }
        },

}
</script>

<template>
	<Layout>
	<!-- Navbar-->
    <header class="header">
        <nav class="navbar navbar-expand-lg navbar-light py-3">
        <h1>Logistics</h1>
          <!-- <div class="mb-4">
                  <a v-b-modal.modal-1 hide-backdrop href="#" class="upd btn btn-success ml-2">Update Account Info</a>
                <a v-b-modal.past-orders hide-backdrop href="#" class="past btn btn-success ml-2">View past orders</a>
            </div> -->
        </nav>

    </header>
      
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-4 col-lg-5 col-8">
          <div class="text-center">
            <div>
              <vue-fontawesome  class="btn_cat" icon="truck" size="14" color="green"></vue-fontawesome> 
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 text-center">
          <h3 class="mt-3">This feature is not available in Beta application</h3>
          <p class="text-muted mb-5">
            For more information, visit customer support.
          </p>
          <!-- <router-link to="/" class="btn btn-lg btn-primary mt-4"
            > Message Customer support</router-link
          > -->
        </div>
      </div>
    </div>
 
	</Layout>
</template>


<style scoped>

body{
  font-family: 'Nunito', sans-serif;
  padding: 50px;
}

.row{
  position: relative;
  top: 30px;
  left: 80px;
}
.card{
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05);
      transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
  padding: 14px 80px 18px 36px;
  cursor: pointer;
}

.card:hover{
     transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);
}

.card h3{
  font-weight: 600;
}

.card img{
  position: absolute;
  top: 20px;
  right: 15px;
  max-height: 120px;
}

.card-1{
  background-image: url(https://ionicframework.com/img/getting-started/ionic-native-card.png);
      background-repeat: no-repeat;
    background-position: right;
    background-size: 80px;
}

.card-2{
   background-image: url(https://ionicframework.com/img/getting-started/components-card.png);
      background-repeat: no-repeat;
    background-position: right;
    background-size: 80px;
}

.card-3{
   background-image: url(https://ionicframework.com/img/getting-started/theming-card.png);
      background-repeat: no-repeat;
    background-position: right;
    background-size: 80px;
}

.red{
  background-color: red;
}

.mainsec{
  position: relative;
}

@media(max-width: 990px){
  .card{
    margin: 20px;
  }
} 

@media(max-width: 600px){
  .row{
  position: relative;
  top: 30px;
  left: 0px;
}

.container{
  height: 700px;
}

} 

</style>

