import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import course from '@/components/course'
//top
import course_center from '@/components/top/course_center'
import study_data from '@/components/top/study_data'
import study_data_detail from '@/components/top/study_data_detail'
import user_rank from '@/components/top/user_rank'
import course_detail from '@/components/course_detail'
import personal_center from '@/components/personal_center'
import chapter from '@/components/chapter'

import login from '@/components/login'

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
            path: '/study_data',
            name: 'study_data',
            component: study_data
        },
        {
            path: '/study_data_detail',
            name: 'study_data_detail',
            component: study_data_detail
        },
        {
            path: '/user_rank',
            name: 'user_rank',
            component: user_rank
        },
        {
            path: '/course_detail',
            name: 'course_detail',
            component: course_detail,
        },
        {
            path: '/personal_center',
            name: 'personal_center',
            component: personal_center,
        },
        {
            path: '/login',
            name: 'login',
            component: login,
        },
        {
            path: '/chapter',
            name: 'chapter',
            component: chapter,
        }
    ]
})
