<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import NestCard1 from '@src/router/views/pages/nests/NestCard1'
import axios from "axios"
import {mapGetters, mapActions} from 'vuex'

export default {
	page: {
		title: 'Nests',
		meta: [{ name: 'description', content: appConfig.description }],
	},
	components: {
		VuePerfectScrollbar,
        Layout,
        NestCard1
    },
  data: function() {
    return {
      vendor:  '', 
      divo_hand: '',
      self_hand: '' 
            }
        },
       
   methods: {
    ...mapActions("logis",['postLogis', 'fetchLogis', 'updLogis']),

    changeStatus(){
      const logis = {
        divo_hand: !this.divo_hand,
        self_hand: !this.self_hand,
        vendor: this.$auth.user.email
   }
 
      this.updLogis(logis)
 }

  },
  

  async created() {

    const logis = {
      divo_hand: true,
      self_hand: false,
      vendor: this.$auth.user.email
 }
    this.postLogis(logis)
    await this.fetchLogis(this.$auth.user.email )
    this.divo_hand = this.userLogis[0].divo_hand,
    this.self_hand = this.userLogis[0].self_hand

},
  computed: mapGetters("logis",['userLogis'])

}
</script>

<template>
	<Layout>
	<!-- Navbar-->
    <header class="header">
        <nav class="navbar navbar-expand-lg navbar-light py-3">
        <h1>Logistics</h1>
        </nav>
    </header>
      
    <div class="container">
          <div class="row">

      <div class="mainsec col-md-4">
          <div class="card card-3">
            <h3>Divo Handling (default)</h3> 
            <p>Learn how to easily customize and modify your app’s design to fit your
              brand across all mobile platform styles.</p>
              <br/>
              <br/>
              <br/>
              <b-spinner label="Loading..." v-if="!self_hand & !divo_hand"></b-spinner>
        <a v-b-modal.modal-1 hide-backdrop href="#" class="green btn btn-success ml-2" v-if="self_hand" @click="changeStatus()">Enable</a>
        <a v-b-modal.modal-1 hide-backdrop href="#" class="red btn btn-success ml-2" v-if="divo_hand" @click="changeStatus()">Disable</a>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card card-1">
            <h3> I manage my Logistics</h3>
            <p> For vendors that have their own dispatch riders or a dedicated dispatch company. Tou need 5 orders to require for validation of your logistics service.</p>
                  <br/>
          <b-spinner label="Loading..." v-if="!self_hand & !divo_hand"></b-spinner>
        <a v-b-modal.modal-1 hide-backdrop href="#" class="green btn btn-success ml-2" v-if="divo_hand">Enable</a>
        <a v-b-modal.modal-1 hide-backdrop href="#" class="red btn btn-success ml-2" v-if="self_hand">Disable</a>
              <!-- <a v-b-modal.modal-1 hide-backdrop href="#" class="upd btn btn-success ml-2">Update Account Info</a> -->
          </div>
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

