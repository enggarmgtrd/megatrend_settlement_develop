import Login from './components/login.vue';
import Form from './components/form.vue';
import Dashboard from './components/dashboard.vue';

const routes = [
    { path: '/login',
      name: 'login', 
      component: Login 
    },
    

    { path: '/form',
      name: 'form', 
      component: Form
    },

    { path: '/',
      alias: '/dashboard',
      name: 'dashboard', 
      component: Dashboard
    },
];

export default routes;