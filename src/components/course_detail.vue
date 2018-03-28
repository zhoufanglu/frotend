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
                                        <el-tab-pane label="评论" name="comments">
                                            <div class="comments">
                                                <div class="panel">
                                                    <div class="item" v-for="i in tab_items.comment_list">
                                                        <div class="rank-head-img item-l"><img :src="i.head_img" width="100%" height="100%" alt=""></div>
                                                        <div class="item-r">
                                                            <div class="row-1">{{i.user_name}}</div>
                                                            <div class="row-2">{{i.comment_text}}</div>
                                                            <div class="row-3">
                                                                <div class="time-and-from">
                                                                    <span>时间:{{i.created_at}}</span>
                                                                    <span>源自:{{i.image_text_name}}</span>
                                                                </div>
                                                                <div class="praise-num">
                                                                    <i class="icon-font">&#xe672;</i><span>{{i.praise_num}}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </el-tab-pane>
                                        <el-tab-pane label="文件" name="file">
                                            <div class="file-table">
                                                <el-row>
                                                    <el-col :span="4">
                                                        <div class="grid-content">所属章节</div>
                                                    </el-col>
                                                    <el-col :span="4">
                                                        <div class="grid-content ">资料名称</div>
                                                    </el-col>
                                                    <el-col :span="8">
                                                        <div class="grid-content "> &nbsp;</div>
                                                    </el-col>
                                                    <el-col :span="4">
                                                        <div class="grid-content ">文件大小</div>
                                                    </el-col>
                                                    <el-col :span="4">
                                                        <div class="grid-content ">下载地址</div>
                                                    </el-col>
                                                </el-row>
                                                <el-row v-for="(i,index) in tab_items.file_list" :key="index">
                                                    <el-col :span="4">
                                                        <div class="grid-content">{{i.file_from}}</div>
                                                    </el-col>
                                                    <el-col :span="4">
                                                        <div class="grid-content ">{{i.file_name}}</div>
                                                    </el-col>
                                                    <el-col :span="8">
                                                        <div class="grid-content ">&nbsp;</div>
                                                    </el-col>
                                                    <el-col :span="4">
                                                        <div class="grid-content ">{{i.file_size}}</div>
                                                    </el-col>
                                                    <el-col :span="4">
                                                        <router-link  to="/course"target="_blank" class="grid-content remove-a-css">{{i.file_address}}</router-link>
                                                    </el-col>
                                                </el-row>
                                            </div>
                                        </el-tab-pane>
                                    </el-tabs>
                                </template>
                            </div>
                            <div class="content-panel">

                            </div>
                        </el-col>
                        <el-col class="content-body-r":span="6">
                            <div class="rank-list">
                                <div class="panel">
                                    <div class="list-title">排行榜</div>
                                    <router-link target="_blank" :to="{path:'/course_detail', query:{id:i.id}}" class="item remove-a-css" v-for="(i,index) in right_data.user_rank" :key="index">
                                        <div>{{index + 1}}</div>
                                        <div>
                                            <div class="rank-head-img"><img :src="i.head_img" height="100%" width="100%"></div>
                                        </div>
                                        <div class="user-name" >{{i.user_name}}</div>
                                        <div>{{i.score}}分</div>
                                    </router-link>
                                    <div class="see-more">
                                        <router-link to="/course" class="remove-a-css" target="_blank">查看更多&nbsp;></router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="similar-course-list">
                                <div class="panel">
                                    <div class="list-title">相似课程推荐</div>
                                    <router-link target="_blank" :to="{path:'/course_detail', query:{id:i.id}}" class="item remove-a-css" v-for="(i,index) in right_data.similar_course" :key="index">
                                        <div class="item-l"><img :src="i.course_img" width="100%" height="100%" alt=""></div>
                                        <div class="item-r">
                                            <div class="list-title">{{i.course_name}}</div>
                                            <div>{{i.course_introduction}}</div>
                                        </div>
                                    </router-link>
                                    <div class="see-more">
                                        <router-link  to="/course" class="remove-a-css" target="_blank">查看更多&nbsp;></router-link>
                                    </div>
                                </div>
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
                    comment_list:[],
                    file_list:[]
                },
                right_data:{
                  user_rank:[],
                  similar_course:[]
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
                   console.log('user_rank',this.right_data.user_rank);
                })
            },
            handleClick(tab, event) {
                console.log( 105,tab, event);
            },
            getSimilarCourse(){
                this.$fetch('http://127.0.0.1/teachep/public/course/getCourseSortList').then((response) => {
                    this.right_data.similar_course = response.course;
                    console.log('similar_course',this.right_data.similar_course);
                })
            },
            getCommentList(){
                this.$fetch('http://127.0.0.1/teachep/public/course/getCommentList').then((response) => {
                    this.tab_items.comment_list = response.comment_list;
                    console.log('comment_list',this.tab_items.comment_list);
                })
            },
            getFileList(){
                this.$fetch('http://127.0.0.1/teachep/public/course/getFileList').then((response) => {
                    this.tab_items.file_list = response.file_list;
                    console.log('file_list',this.tab_items.file_list);
                })
            }
        },
        created(){
            this.getCourseInfo();   //获取课程基本信息
            this.getUserRank();     //获取用户排名列表
            this.getSimilarCourse();//类似课程
            this.getCommentList();  //获取评论
            this.getFileList();
        }
    }
</script>
<style type="text/scss" lang="scss">
    @import "~@/assets/scss/page/course_detail.scss";
</style>
