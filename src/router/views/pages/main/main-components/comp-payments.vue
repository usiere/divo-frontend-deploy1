<template>
<div>
  <!-- Modal to edit bank details -->
  <b-modal id="bank_info" title="Bank details" hide-footer>
  <div>
    <div class="form-group">
      <select class="form-control item" id="bank" placeholder="Bank" :value="e_bank">
        <option selected>Choose Bank</option>
        <option value="access">Access Bank</option>
        <option value="citibank">Citibank</option>
        <option value="diamond">Diamond Bank</option>
        <option value="ecobank">Ecobank</option>
        <option value="fidelity">Fidelity Bank</option>
        <option value="firstbank">First Bank</option>
        <option value="fcmb">First City Monument Bank (FCMB)</option>
        <option value="gtb">Guaranty Trust Bank (GTB)</option>
        <option value="heritage">Heritage Bank</option>
        <option value="keystone">Keystone Bank</option>
        <option value="polaris">Polaris Bank</option>
        <option value="providus">Providus Bank</option>
        <option value="stanbic">Stanbic IBTC Bank</option>
        <option value="standard">Standard Chartered Bank</option>
        <option value="sterling">Sterling Bank</option>
        <option value="suntrust">Suntrust Bank</option>
        <option value="union">Union Bank</option>
        <option value="uba">United Bank for Africa (UBA)</option>
        <option value="unity">Unity Bank</option>
        <option value="wema">Wema Bank</option>
        <option value="zenith">Zenith Bank</option>
      </select>
            </div>
   <div class="form-group">
                <input type="text" class="form-control item" id="number" placeholder="Account number" :value="e_number" > 
    </div>
    
     <button class="btn btn-success ml-2" @click="updateAccount(), $bvModal.hide('bank_info'), makeToast1()">Save</button>
  </div>
  </b-modal>


<b-modal id="hold_info" hide-footer title="Holding terms" centered>   
  <b-list-group>
    <b-list-group-item variant="success">The period between when a customer pays for an item and delivery is referred to as the <strong>"Holding Period"</strong>. <br/> After a customer orders, the amount paid is transferred to a temporary account until the item has been 
      delivered and necessary validations are made. </b-list-group-item>
  <b-list-group-item>For more on the holding account, visit the Guide.</b-list-group-item>
    
  </b-list-group>
</b-modal>   


<div v-if="window.width < 600">
	  <br/>
      <a v-b-modal.bank_info hide-backdrop href="#" class="upd btn btn-success ml-2">Bank settings</a>
      <a v-b-modal.hold_info hide-backdrop href="#" class="past btn btn-success ml-2">Holding terms</a>
</div>

<div class="container"> 
  <div class="pending" >
     <div class="calendar_header">
      <h1 class = "header_title">Payments</h1>
      
      <div >
            <button  v-b-modal.modal-1 class="btn btn-success ml-2" exact>Total:<br/> <strong class="total">₦{{totalSum}}</strong></button>
           <div class= "search">


  </div>
        </div>
    
      
    </div>
   
   <!-- Main section -->
    <div class="list"  v-if="allPayments && allPayments.length >0">
    <div class="calendar_plan"  v-for="payment in allPayments" v-bind:key="payment._id">
      <div class="cl_plan">
         <div cl_text>
           <div class="cl_copy">Order date: <strong> {{payment.Date}} </strong></div>
          <div class="cl_title"> Item: <strong>{{payment.item}} </strong> </div>
         <div class="cl_title">Total Price (xQty): <strong> ₦{{payment.price * payment.qty}}</strong> ({{payment.qty}}) </div>
        </div>
        <div class="check">
          <div class="remove">    
           <button class="btn btn-success ml-2"  @click="$bvModal.show('bv-modal-example')">Query</button>
           </div>
            <!-- <img class="img" v-bind:src=" order.item_img" width="200" height="200" />  -->
        </div>
      </div>
    </div>
   
   </div>
  </div>

  <div class="delivered">
    <div class="calendar_header">
    
    </div>
    <div class="t">
    <div class="calendar_events">
    
     <section class="sidecont">
    <div class="sidebtn">
        <div  @click="clickBank()">
            <div class=""> <a href="#" v-b-modal.bank_info class="highlight-button btnn btnn-large button xs-margin-bottom-five" data-abc="true"><vue-fontawesome  class="btn_cat" icon="bank" size="1.2" color="black"></vue-fontawesome>   Bank details <br/> 
</a> </div>
        </div>
    </div><br/>
 <div>
        <div class="sidebtn" >
             <div class=""> <a href="#" v-b-modal.hold_info class="highlight-button btnn btnn-large button xs-margin-bottom-five" data-abc="true"><vue-fontawesome  class="btn_cat" icon="info-circle" size="1.2" color="black"></vue-fontawesome> Holding terms </a> </div>
        </div>
    </div>
</section>
     
  
    </div>
  </div>
  
  </div>
</div>
</div>
</template>

<style scoped>
*{
  box-sizing:border-box;
}
.container{
  margin:10px auto;
  width:1000px;
  padding-top: 30px;
    display: grid;
    grid-template-columns: 50% 50% ;
}

.light{
  background-color: #fff;
}
.dark{
  margin-left: 65px;
}

.pending{
  width:520px;
  box-shadow: 0px 0px 35px -16px rgba(0,0,0,0.75);
  font-family: 'Roboto', sans-serif;
  padding: 20px 30px;
  color:#363b41;
  display: inline-block;

   background-color: #fff;
}



.delivered{
  width:350px;
  box-shadow: 0px 0px 35px -16px rgba(0,0,0,0.75);
  font-family: 'Roboto', sans-serif;
   margin-left:  50px;
  color:#363b41;
  display: inline-block;
  background-color: transparent;


}


.list{

  height: 520px;
  overflow: scroll;
}


.calendar_header{
  border-bottom: 2px solid rgba(0, 0, 0, 0.08);
}
.calendar_plan{
  margin:20px 0 40px;
}
.cl_plan{
  width:100%;
  height: 150px;
  background-color:#fff;
  box-shadow: 0px 0px 52px -18px rgba(0, 0, 0, 0.75);
  padding:30px;
  color:#fff;
  display: grid;
  grid-template-columns: 300px 100px;
}
.cl_title{
   margin: 0px 0;
   color: black;
   
}
.cl_copy{
  font-size: 15px;
  margin: 0px 0;
  display: inline-block;
  margin: 0px 0;
   color: black;
}

.cl_add{
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius:50%;
  background-color: #fff;
  cursor: pointer;
  margin:0 0 0 300px;
  color:#c2c2c2;
  padding: 11px 13px;
}

.check{
  border-radius:50%;
}

.check img {
   width: 100%;
    border-radius:50%;
     width: 70px;
  height: 70px;
}

.ce_title{
  font-size:14px;
}

.event_item{
  margin: 18px 0;
  padding:5px;
  cursor: pointer;

}

.ei_Dot,.ei_Title{
  display:inline-block;
}

.ei_Dot{
  border-radius:50%;
  width:10px;
  height: 10px;
  box-shadow: 0px 0px 52px -18px rgba(0, 0, 0, 0.75);
}
.dot_active{
  background-color: #FF8494;
}

.ei_Title{
  margin-left:10px;
  color:#363b41;
}

.ei_Copy{
  font-size:12px;
  margin-left:27px;
}

.dark{
  background-image: linear-gradient(-222deg, #646464, #454545);
  color:#fff;
}

.mb-4{
  padding-left: 300px;
}

/* Css for new buttons */
.btnn {
    display: inline-block;
    margin-right: 20px;
    letter-spacing: 2px;
    border: 1px solid transparent
}

.btnn-round {
    border-radius: 4px !important
}

.btnn i {
    margin-right: 5px
}

.btnn.btnn-large i {
    font-size: 24px
}

.button {
    margin-top: 0;
    margin-bottom: 0
}

.btnn.btnn-large {
    font-size: 18px;
    padding: 50px 35px
}

.btnn.btnn-medium {
    font-size: 14px;
    padding: 10px 22px
}

.btnn.btnn-small {
    font-size: 11px;
    padding: 2px 14px;
    letter-spacing: 1px
}

.btnn.btnn-very-small {
    font-size: 9px;
    padding: 1px 12px;
    letter-spacing: 1px
}

.highlight-button {
    border: 2px solid #000;
    display: inline-block;
    padding: 8px 20px 9px;
    font-size: 12px;
    color: green;
    background-color: transparent
}

.highlight-button:hover {
    background-color: green;
    border: 2px solid #000;
    color: #fff
}

.highlight-button i {
    color: #000
}

.highlight-button:hover i {
    color: #fff
}

.search{
  padding-left: 180px
}

.total{
  font-size: 23px;
}

.remove{
  padding-right: 20px
}

.sidebtn{
  margin-left: 40px;
  margin-right: 40px;
}

.sidecont{
  position: relative;
  top: 80px;
}


@media screen and (max-width: 600px) {
.container{
  margin:10px auto;
  width: 850px;
  padding-top: 30px;
    display: grid;
    grid-template-columns: 50% 50% ;
}

.delivered{
  visibility: hidden;
}

.pending{
  width:460px;
  box-shadow: 0px 0px 35px -16px rgba(0,0,0,0.75);
  font-family: 'Roboto', sans-serif;
  padding: 20px 30px;
  color:#363b41;
  display: inline-block;

   background-color: #fff;
}

}




</style>


<script>
import axios from 'axios';
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'nests',
  
  data() {
    return {
      search: '',
      e_bank: '',
      e_number: '79292020',
      window: {
        width: 0,
        height: 0
    },
      totalSum: 0,
      user: this.$auth.user.email
}
  },


  async mounted() {
    await this.fetchPayments(this.user);

    const account = {
      bank: '',
      number: '',
      vendor: this.$auth.user.email,
 }
    this.postAccount(account)
    this.fetchAccount(this.$auth.user.email)
    this.addTotal()
    this.e_bank = await this.userAccount.bank
    this.e_number = await this.userAccount.number
},

  created() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    },


  destroyed() {
      window.removeEventListener('resize', this.handleResize);
    },

  methods:{
    ...mapActions("payments",['fetchPayments']),
    ...mapActions("accounts",['fetchAccount', 'postAccount', 'updAccount']),

    handleResize() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
        },

    updateAccount(){
      console.log('checking if the button is going well')
      const e_account = {
        bank: document.getElementById('bank').value,
        number: document.getElementById('number').value,
        vendor: this.$auth.user.email
  }
      this.updAccount(e_account)
},

    async clickBank(){
   this.e_bank = this.userAccount.bank
this.e_number = this.userAccount.number
console.log('checking the users account number' + this.userAccount.number)
    },

    makeToast1() {
      this.$toasted.show(" Account update saved !!", { 
	    theme: "toasted-primary", 
	    position: "top-right", 
	    duration : 5000
});
      },

    async addTotal(){
      this.allPayments.forEach((payment) => {
      this.totalSum += payment.price * payment.qty;
      });
}
 
},

  computed: {...mapGetters("payments",['allPayments']),
...mapGetters("accounts",['userAccount'])
}


}
</script>





