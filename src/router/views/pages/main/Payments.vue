<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import compPayments from '@src/router/views/pages/main/main-components/comp-payments'

export default {
    data(){
   return{
    window: {
        width: 0,
        height: 0
        },
    showSpinner: true
   }
 },
	page: {
		title: 'Nests',
		meta: [{ name: 'description', content: appConfig.description }],
	},
	components: {
		VuePerfectScrollbar,
        Layout,
        compPayments
	},

    methods: {
        handleResize() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
        }
},
    created() {
        window.addEventListener('resize', this.handleResize);
        setTimeout(() => this.showSpinner = false, 1000);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
}
</script>

<template>
	<Layout>
        <div class="d-flex flex-column">
            <b-spinner style="width: 2rem; height: 2rem;" label="Loading..." variant="primary" v-if="showSpinner" class="spinner" type="grow"></b-spinner> 
            <compPayments/>
        </div>
	</Layout>
</template>

<style scoped>

.heading{
	padding-left: 35%;
	/* padding-top: 5%; */

}

.mb-4 {
	padding-left: 700px;
}

.spinner {
    position: relative;
    left: 500px;
    top: 20px;
}

@media screen and (max-width: 600px){

.spinner{
      position: relative;
    left: 290px;
}

}

</style>







