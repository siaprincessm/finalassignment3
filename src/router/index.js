import { createRouter, createWebHistory } from 'vue-router';

import LoginView from '../views/LoginView.vue';
import CreateUserView from '../views/CreateUserView';
import RoutinesView from '../views/RoutinesView';
import CreateRoutineView from '../views/CreateRoutineView';
import UpdateRoutineView from '../views/UpdateRoutineView';
import AddCommentToRoutine from '../views/AddCommentToRoutineView';
import ViewRoutine from '../views/ViewRoutineView';

function guardMyroute(to, from, next) {
  var isAuthenticated = false;

  if (localStorage.getItem('LoggedInUser')) {
    isAuthenticated = true;
  }
  else
    isAuthenticated = false; 

    if (isAuthenticated) {
      next(); // allow to enter route
    } else {
    next('/login'); // go to '/login';
  }

}

const routes = [
  {
    path: '/',
    name: 'home',
    component: LoginView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/create-user',
    name: 'createUser',
    beforeEnter : guardMyroute,
    component: CreateUserView
  },
  {
    path: '/routines',
    name: 'routines',
    beforeEnter : guardMyroute,
    component: RoutinesView
  },
  {
    path: '/routines/create',
    name: 'createRoutine',
    beforeEnter : guardMyroute,
    component: CreateRoutineView
  },
  {
    path: '/routines/update/:id',
    name: 'updateRoutine',
    beforeEnter : guardMyroute,
    component: UpdateRoutineView
  },
  {
    path: '/routines/add-comment/:id',
    name: 'addCommentToRoutine',
    beforeEnter : guardMyroute,
    component: AddCommentToRoutine
  },
  {
    path: '/routines/:id',
    name: 'viewRoutine',
    beforeEnter : guardMyroute,
    component: ViewRoutine
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
