import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import lesson from '@/components/lesson'
//top
import lesson_center from '@/components/top/lesson_center'
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
            path: '/lesson',
            name: 'lesson',
            component: lesson
        },
        {
            path: '/lesson_center',
            name: 'lesson_center',
            component: lesson_center
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
