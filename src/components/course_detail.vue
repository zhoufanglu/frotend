<template>
    <div class="course_detail">
        <teach-head :nickName="nickName" :headSrcLink="headSrcLink" :show_hide_vis="show_hide_vis" ></teach-head>
        <div>
            <div class="content">
                <div class="content-top">
                    <!--面包屑-->
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/course' }">课程中心</el-breadcrumb-item>
                        <el-breadcrumb-item>{{course.course_name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="title">
                        <div>
                            {{course.course_name}}
                        </div>
                        <div class="title-b">
                            <div class="start">
                                <el-button class="start-btn" type="danger">开始学习</el-button>
                            </div>
                            <div class="course-info">
                                <div>
                                    <span>学习人数</span>
                                    <span>{{course.course_learn_people}}</span>
                                </div>
                                <div>
                                    <span>难度级别</span>
                                    <span>{{course.course_difficult}}</span>
                                </div>
                                <div>
                                    <span>综合评分</span>
                                    <span>{{course.course_difficult}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-body">
                    <el-row>
                        <el-col class="content-body-l" :span="18">
                            <div class="introduction">
                                简介: {{course.course_introduction}}
                            </div>
                            <div class="router-link-c">
                                <router-link class="remove-a-css" to="/course_detail/chapter">章节</router-link>
                                <router-link class="remove-a-css" to="/course_detail/comments">评论</router-link>
                                <router-link class="remove-a-css" to="/course_detail/course_file">文件</router-link>
                            </div>
                            <router-view></router-view>
                        </el-col>
                        <el-col class="content-body-r":span="6">
                            <div class="list">
                                排行榜
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <teach-foot></teach-foot>
    </div>
</template>
<script>
    export default {
        name: '',
        data(){
            return{
                nickName:'tog',
                headSrcLink:require('@/assets/images/dogHead.jpg'),
                //css
                show_hide_vis:'show-vis',
                course: {
                    id: this.$route.query.id,
                },
                chapter_list:{

                }
            }
        },
        methods: {
            getCourseInfo(){
                let data = {
                    id:this.course.id
                }
                this.$fetch('/api/course_detail/course').then((response) => {
                    this.types = response;
                    console.log(45,response);
                    this.course = response.course;
                    this.chapter_list = response.chapter_list;
                })
                    .catch(err =>{
                        console.log(err);
                    });
            }
        },
        created(){
            this.getCourseInfo();
            console.log(this.course);
        }
    }
</script>
<style scoped type="text/scss" lang="scss">
    @import "~@/assets/scss/page/course_detail.scss";
</style>
