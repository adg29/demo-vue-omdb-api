import Vue from 'vue';
import VueRouter from 'vue-router';
import LatestMovie from '@/components/LatestMovie'
import Movie from '@/components/Movie';
import SearchMovie from '@/components/SearchMovie'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'LatestMovie',
    component: LatestMovie
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    props: true,
    component: Movie
  },
  {
    path: '/search/:name',
    name: 'SearchMovie',
    props: true,
    component: SearchMovie
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
