import Login from './components/login.vue';
import FormSettlement from './components/form-settlement.vue';
import Dashboard from './components/dashboard.vue';
import FormUser from './components/form-user.vue';
import DataUser from './components/data-user.vue';
import Master from './components/master.vue';

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
          path: '/dashboard',
          component: Dashboard
        },
        {
          // UserPosts will be rendered inside User's <router-view>
          // when /user/:id/posts is matched
          path: '/form-settlement',
          component: FormSettlement
        },
        {
          path: '/form-update/:dataForm_id',
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