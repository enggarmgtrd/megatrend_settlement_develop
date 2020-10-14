import Login from './components/login.vue';
import FormSettlement from './components/form-settlement.vue';
import DataSettlement from './components/data-settlement.vue';
import FormUser from './components/form-user.vue';
import DataUser from './components/data-user.vue';
import Master from './components/master.vue';
import DataTrip from './components/data-trip.vue';
import FinalizeTrip from './components/finalize-trip.vue';
import DataComponent from './components/data-component.vue';

const routes = [
    { path: '/login',
      name: 'login', 
      component: Login 
    },
    
    
    { path: '/',
      name: 'master', 
      component: Master,
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: '/data-settlement',
          component: DataSettlement
        },
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: '/data-component',
          component: DataComponent
        },
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: '/data-trip',
          component: DataTrip
        },
        {
          // UserPosts will be rendered inside User's <router-view>
          // when /user/:id/posts is matched
          path: '/form-settlement',
          component: FormSettlement
        },
        {
          // UserPosts will be rendered inside User's <router-view>
          // when /user/:id/posts is matched
          path: '/finalize-trip',
          component: FinalizeTrip
        },
        {
          path: '/form-settlement-update/:dataForm_id',
          name: 'form-settlement-update', 
          component: FormSettlement
        },
        {
          path: '/form-user',
          component: FormUser
        },
        {
          path: '/data-user',
          component: DataUser
        }
        
      ]
    },

    {
      path: '*',
      component: Login
    },
    
];

export default routes;