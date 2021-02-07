<template>
  <!-- Footer Start -->
  <div>
  <footer  v-if="window.width < 600" class="footer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
        <nav class="navigation navigation--inline">
    <ul>
      <li>
      <router-link to="/" class="a">
         
              <vue-fontawesome icon="home" size="1" ></vue-fontawesome>
             <p> Home</p>
      </router-link>
      </li>
      <li>
      <router-link to="/orders" class="a">
          <vue-fontawesome icon="shopping-cart" size="1" ></vue-fontawesome>
            <p> Orders</p>
      </router-link>
      </li>
      <li>
      <router-link to="/payments" class="a">
<vue-fontawesome icon="credit-card-alt" size="1" ></vue-fontawesome>
           <p> Payments</p>
      </router-link>
      </li>
      <li>
      <router-link to="/logistics" class="a">
            <vue-fontawesome icon="motorcycle (bike)" size="1" ></vue-fontawesome>
            <p> Logistics</p>
      </router-link>
      </li>
    
    </ul>
  </nav>
        </div>
      </div>
    </div>
  </footer>



 <!-- <footer  v-if="!isMobile()" class="footer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          2020 &copy; Divo Logistics.. All Rights Reserved. 
        </div>
      </div>
    </div>
  </footer> -->


 <footer  v-if="window.width > 600" class="footer">


  </footer>
  <!-- end Footer -->

  </div>
</template>

<style scoped>

.footer{
  position: fixed;
  display: block;

  /* check this  */
}


.router-link-active{
  color: rgb(24, 46, 46)
}

.invisible {
  left: -999px;
  overflow: hidden;
  position: absolute;
  top: -999px;
}

/* helpers/align.css */

.align {
  justify-content: center;
  align-items: center;
  display: flex;
}

/* layout/base.css */

:root {
  --body-background-color: #82a8ee;
}

html {
  height: 100%;
}

body {
  background-color: white;
  margin: 0;
  min-height: 100%;
}

/* modules/anchor.css */

a {
  outline: 0;
}

/* modules/icon.css */

:root {
  --icon-fill-color: #c6b997;
}

.icons {
  display: none;
}

.icon {
  display: inline-block;
  fill: var(--icon-fill-color);
  font-size: 1rem;
  height: 1em;
  vertical-align: middle;
  width: 1em;
}

.icon--2x {
  font-size: 2rem;
}

/* modules/image.css */

svg {
  max-width: 100%;
}

/* modules/navigation.css */

:root {
  --navigation-background-color: white;
  --navigation-border-radius: 0.25rem;

  --navigation-anchor-padding: 0;
  --navigation-anchor-text-decoration: none;
}

.navigation {
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
  height: 90px
}

.navigation ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.navigation .a {
  display: block;
  padding-top: 1.5rem;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  position: relative;
  text-decoration: none;
}

.navigation .a:focus::after,
.navigation .a:hover::after {
  opacity: 1;
}

.navigation .a::after {
  /* box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3); */
  content: '';
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  /* transition: opacity 0.3s; */
  width: 100%;
  font-size: 1.5em;
}

.navigation--inline ul {
  display: flex;
}

.fas{
  font-size: 1.5em;
}

.navigation .a:active::after{
color: black
}
</style>


<script>
export default {
 data(){
   return{
    window: {
            width: 0,
            height: 0
        }
   }
 },

methods: {
  handleResize() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
        }
},

created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
  destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },

}
</script>



