import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import course from '@/components/course'
//top
import course_center from '@/components/top/course_center'
import find from '@/components/top/find'
import help from '@/components/top/help'
import course_detail from '@/components/course_detail'
//children
/*import chapter from '@/commponents/children/chapter'
import comments from '@/commponents/children/comments'
import course_file from '@/commponents/children/course_file'*/

import  chapter from '../components/children/chapter'
import  comments from '../components/children/comments'
import  course_file from '../components/children/course_file'

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
        },
        {
            path: '/course_detail',
            name: 'course_detail',
            component: course_detail,
            /*children:[
                {
                    path:'/course_detail/chapter',
                    name:'chapter',
                    component: chapter
                },
                {
                    path:'/course_detail/comments',
                    name:'comments',
                    component: comments
                },
                {
                    path:'/course_detail/course_file',
                    name:'course_file',
                    component: course_file
                }
            ]*/
        }
    ]
})
