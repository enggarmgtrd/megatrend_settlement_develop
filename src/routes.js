import Login from './components/login.vue';
import Form from './components/form.vue';
import Dashboard from './components/dashboard.vue';
import Profile from './components/profile.vue';
import FormUser from './components/formUser.vue';
import Master from './components/master.vue';
import Val from './components/val.vue';

const routes = [
    { path: '/login',
      name: 'login', 
      component: Login 
    },
    
    
    { path: '/form',
      name: 'form', 
      component: Form
    },
    { path: '/form-user',
      name: 'formUser', 
      component: FormUser
    },

    { path: '/form-update/:dataForm_id',
      name: 'form-update', 
      component: Form
    },

    { path: '/val',
      name: 'val', 
      component: Val
    },

    { path: '/aa',
      alias: '/dashboard',
      name: 'dashboard', 
      component: Dashboard
    },
    
    { path: '/',
      name: 'master', 
      component: Master
    },

    { path: '/profile',
      name: 'profile', 
      component: Profile
    },
    {
      path: '*',
      component: Login
    }
];

export default routes;