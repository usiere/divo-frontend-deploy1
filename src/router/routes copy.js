import store from '@state/store'
import { authGuard } from "@src/auth";
import axios from "axios";


// error pages
const otherPagesRoutes = [

  {
    path: '/success',
    name: 'Success',
    component: require('@views/pages/nests/success').default,
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
  },
  {
    path: '/404',
    name: '404',
    component: require('@views/pages/secondary/error-404').default,
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
  },
  {
    path: '/500',
    name: '500',
    component: require('@views/pages/secondary/error-500').default,
    props: true,
  },
  // Redirect any unmatched routes to the 404 page. This may
  // require some server configuration to work in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  {
    path: '*',
    redirect: '404',
  },
]

// inventory
const inventPagesRoutes = [

  {
    path: '/home/items',
    name: 'items',
    component: require('@views/pages/nests/n-store/Store-cat-items').default,
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
  },

  
  {
    path: '/home/item/edit',
    name: 'Edit-items',
    component: require('@views/pages/nests/n-store/item-edit').default,
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
  },





]


// inventory
const category = [
  {
    path: '/store/new/Katampe',
    name: 'Katampe',
    component: require('@views/pages/nests/Addnew').default,
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
  },

  {
    path: '/account',
    name: ' Account',
    header: '.',
    icon: 'user',
    ficon: 'cart',
    beforeEnter: authGuard,
  
    component: () => lazyLoadView(import('@views/pages/nests/Profile')),
   
  },

 
]

// dashboard
const dashboardRoutes = [
  {
    path: '/',
    name: 'Stores',
    header: '.',
    icon: 'home',
    ficon: 'fas fa-home',
    component: () => lazyLoadView(import('@views/pages/nests/n-store//Store-cat')),
    beforeEnter: authGuard,
    
  },
]


// necessities
const nestsRoutes = [
  // remove this soon
 
  // {
  //   path: '/store/new',
  //   name: ' Add to Store',
  //   header: '.',
  //   icon: 'package',
  //   ficon: 'fas fa-plus',
  //   beforeEnter: authGuard,
  
  //   component: () => lazyLoadView(import('@views/pages/nests/District')),
   
  // },
 
   
 {
    path: '/store/new',
    name: ' Orders',
    header: '.',
    icon: 'shopping-basket',
    ficon: 'fas fa-layer-group',
    beforeEnter: authGuard,
  
    component: () => lazyLoadView(import('@views/pages/nests/District')),
   
  },


  {
    path: '/pending',
    name: ' Payments',
    header: '.',
    icon: 'credit-card-alt',
    ficon: 'fas fa-credit-card', 
    beforeEnter: authGuard,
  
    component: () => lazyLoadView(import('@views/pages/nests/Pending')),
   
  },

 

  {
    path: '/logistics',
    name: ' Logistics',
    header: '.',
    icon: 'motorcycle (bike)',
    ficon: 'cart',
    beforeEnter: authGuard,
  
    component: () => lazyLoadView(import('@views/pages/nests/Logistics-none')),
   
  },


 

  // should be removed soonest
 

  // {
  //   path: '/request',
  //   name: ' Request',
  //   header: '.',
  //   icon: 'package',
  //   ficon: 'fas fa-store',
  //   beforeEnter: authGuard,
  
  //   component: () => lazyLoadView(import('@views/pages/nests/Request')),
   
  // },
 
 
 
  
  // {
  //   path: '/guide',
  //   name: ' Guide',
  //   header: '.',
  //   icon: 'bookmark',
  //   ficon: 'fas fa-store',
   
  //   component: () => lazyLoadView(import('@views/pages/nests/Guide')),
   
  // },
  // {
  //   path: '/logout',
  //   name: 'Logout',
  //   header: '.',
  //   icon: 'bookmark',
   
  //   component: () => lazyLoadView(import('@views/pages/nests/Logout')),
   
  // },
  // {
  //   path: '/store/add',
  //   name: 'Choose Item ',
  //   header: '.',
  //   icon: 'home',
 
  //   //beforeEnter: (to, from, next) => {
  //    // axios.get("api/invent")
  //    // .then(response => {
  //    //   next(vm => (vm.invents = response.data) )
  //    // })
  //  // },
  //   component: () => lazyLoadView(import('@views/pages/nests/Veg')),
   
  // },
]




const authProtectedRoutes = [
  ...dashboardRoutes,
  ...nestsRoutes,
]
const allRoutes = [ ...authProtectedRoutes, ...otherPagesRoutes, ...inventPagesRoutes, ...category]

export { allRoutes, authProtectedRoutes }

// Lazy-loads view components, but with better UX. A loading view
// will be used if the component takes a while to load, falling
// back to a timeout view in case the page fails to load. You can
// use this component to lazy-load a route with:
//
// component: () => lazyLoadView(import('@views/my-view'))
//
// NOTE: Components loaded with this strategy DO NOT have access
// to in-component guards, such as beforeRouteEnter,
// beforeRouteUpdate, and beforeRouteLeave. You must either use
// route-level guards instead or lazy-load the component directly:
//
// component: () => import('@views/my-view')
//
function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    loading: require('@components/_loading').default,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 400,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    // error: require('@views/_timeout').default,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 10000,
  })

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children``
      // to the view component.``
      return h(AsyncHandler, data, children)
    },
  })
}
