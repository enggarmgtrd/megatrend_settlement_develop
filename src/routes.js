import Login from './components/login.vue';
import Form from './components/form.vue';

const routes = [
    { path: '/login',
      name: 'login', 
      component: Login 
    },

    { path: '/form',
      name: 'form', 
      component: Form
    },
];

export default routes;