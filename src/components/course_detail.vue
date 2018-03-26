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
                                <template>
                                    <el-tabs class="content-tab" v-model="activeName" type="card" @tab-click="handleClick">
                                        <el-tab-pane label="章节" name="chapter">
                                            <div class="chapter-list" v-for=" (i,index) in tab_items.chapter_list">
                                                <i class="icon-font">&#xe60a;</i><span>第{{index + 1}}章&nbsp;&nbsp;&nbsp;{{i.chapter_name}}</span>
                                                <a href="#" class="detail-list remove-a-css ">
                                                    <div class="row" v-for="j in i.detail_list">
                                                        <i class="icon-font">&#xe6b7;</i><span>{{j.name}}</span>
                                                    </div>
                                                </a>
                                            </div>
                                        </el-tab-pane>
                                        <el-tab-pane label="评论" name="comments">评论</el-tab-pane>
                                        <el-tab-pane label="文件" name="file">文件</el-tab-pane>
                                    </el-tabs>
                                </template>
                            </div>
                            <div class="content-panel">
                                <!--<router-view></router-view>-->
                            </div>
                        </el-col>
                        <el-col class="content-body-r":span="6">
                            <div class="rank-list">
                                <table cellspacing="0" cellpadding="8">
                                    <tr>
                                        <td colspan="5">排行榜</td>
                                    </tr>
                                    <tr v-for="(i,index) in right_data.user_rank">
                                        <td>{{index + 1}}</td>
                                        <td>img</td>
                                        <td>{{i.user_name}}</td>
                                        <td>{{i.score}}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="5">
                                            <a href="" class="remove-a-css">查看更多&nbsp;></a>
                                        </td>
                                    </tr>
                                </table>
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
                tab_items:{
                    chapter_list:[],
                },
                right_data:{
                  user_rank:[]
                },
                activeName:'chapter'
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
                    this.tab_items.chapter_list = response.chapter_list;
                })
                    .catch(err =>{
                        console.log(err);
                    });
            },
            getUserRank(){
                this.$fetch('/api/course_detail/user_rank').then((response) => {
                   this.right_data.user_rank = response.user;
                })
            },
            handleClick(tab, event) {
                console.log( 105,tab, event);
            }
        },
        created(){
            this.getCourseInfo();
            console.log(this.course);
            this.getUserRank();
        }
    }
</script>
<style type="text/scss" lang="scss">
    @import "~@/assets/scss/page/course_detail.scss";
</style>
