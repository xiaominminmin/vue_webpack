import Vue from 'vue'
import Router from 'vue-router'
import Home from '../home/indexs.vue'

Vue.use(Router)

export default new Router({
    routers: [{
        path: '/',
        name: 'home',
        component: Home
    }]
})
