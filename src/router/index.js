import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import course from '@/components/course'
//top
import course_center from '@/components/top/course_center'
import find from '@/components/top/find'
import help from '@/components/top/help'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/home',
            name: 'home',
            component: home
        },
        {
            path: '/course',
            name: 'course',
            component: course
        },
        {
            path: '/course_center',
            name: 'course_center',
            component: course_center
        },
        {
            path: '/find',
            name: 'find',
            component: find
        },
        {
            path: '/help',
            name: 'help',
            component: help
        }
    ]
})
