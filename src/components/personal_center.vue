<template>
    <div class="personal-center">
        <teach-head :nickName="nickName" :headSrcLink="headSrcLink" :show_hide_vis="show_hide_vis" ></teach-head>
        <div class="content">
            <div class="content-top">
                <div class="top-l">
                    <div class="head-img">
                        <img :src="user_data.user_headimg" height="100%" width="100%" alt="">
                    </div>
                    <div class="personal-info">
                        <span>{{user_data.user_name}}</span>
                        <span>{{user_data.user_sex}}&nbsp;&nbsp;{{user_data.user_city}}</span>
                    </div>
                </div>
                <div class="top-r">
                    <div>
                        <span>{{user_data.user_learning_course_num}}</span>
                        <span>学习课程</span>
                    </div>
                    <div>
                        <span>{{user_data.user_score}}</span>
                        <span>学习积分</span>
                    </div>
                </div>
            </div>
            <div class="content-main">
                <div class="main">
                    <div class="left-nav">
                        <el-tabs v-model="activeName" tab-position="left">
                            <el-tab-pane label="我的课程" name="course">
                                <div class="nav-content">
                                    <el-row class="nav-course-row" v-for="(i,index) in course_list" :key="index">
                                        <el-col :span="6"><div class="grid-content item-left "><img :src="i.course_img" width="100%" height="100%" alt=""></div></el-col>
                                        <el-col :span="12"><div class="grid-content item-mid ">
                                            <span class="title">{{i.course_name}}</span>
                                            <span class="introduction">{{i.course_introduction}}</span>
                                            <!--<span>-人名</span>-->
                                            <div class="study-state">
                                                <span>已学{{i.course_progress}}</span>
                                                <span>学习至{{i.chapter_name}}</span>
                                            </div>
                                        </div></el-col>
                                        <el-col :span="6"><div class="grid-content item-right ">
                                            <div class="start-time">学习时间：{{i.created_at}}</div>
                                            <router-link  to="/course"target="_blank" class="grid-content continue-study  remove-a-css-darker">继续学习</router-link>
                                        </div></el-col>
                                    </el-row>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="我的收藏" name="book_marks">我的收藏</el-tab-pane>
                            <el-tab-pane label="个人信息" name="personal_info">个人信息</el-tab-pane>
                            <el-tab-pane label="实名认证" name="real_name">实名认证</el-tab-pane>
                            <el-tab-pane label="其它设置" name="other_set">其它设置</el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'personal-center',
        data(){
            return{
                nickName:'tog',
                headSrcLink:require('@/assets/images/dogHead.jpg'),
                //css
                show_hide_vis:'show-vis',
                //用户信息
                user_data:{},
                //left_nav
                activeName:'course',
                course_list:[]
            }
        },
        methods:{
            getCommentList(){
                this.$fetch('http://127.0.0.1/teachep/public/course/getFileList').then((response) => {
                    this.user_data = response.user_data;
                    console.log('user_data',this.user_data);
                })
            },
            getMyCourseList(){
                this.$fetch('http://127.0.0.1/teachep/public/user/getMyCourseList').then((response) => {
                    this.course_list = response.course_list;
                    console.log('course_list',this.course_list);
                })
            },
        },
        created(){
            this.getCommentList();
            this.getMyCourseList();
        }
    }
</script>
<style type="text/scss" lang="scss">
    @import "~@/assets/scss/page/personal_center.scss";
</style>
