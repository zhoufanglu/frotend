<template>
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
                                <!--分页-->
                                <div class="paging">
                                    <el-pagination background layout="prev, pager, next"@current-change="getCommentList()" :page-size="paging.page_all_num" :current-page.sync="paging.now_page"  :total="paging.data_number"></el-pagination>
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
</template>
<script>
    export default {
        name: '',
        data(){
            return{
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
                activeName:'chapter',  //tab选中页面
                paging:{
                    page_all_num:30,//一页多少数据
                    now_page:1,     //当前页码
                    data_number:300 //一共多少数据
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
<style scoped lang="scss" type="text/scss">
    .content-body{
        .el-row{
            width: 100%;
        }
        .content-body-l{
            padding: 10px;
            .introduction{
                min-height: 50px;
            }
            .router-link-c{
                .chapter-list:first-child{
                    border-top: none;
                }
                .chapter-list {
                    font-size: 18px;
                    border-top: solid 1px $light;
                    padding: 20px 0;
                    span {
                        margin-left: 10px;
                    }
                    .remove-a-css {
                        color: $darker !important;
                    }
                    .detail-list {
                        cursor: pointer;
                        padding-left: 30px;
                        .row {
                            padding-left: 20px !important;
                            height: 46px;
                            line-height: 46px;
                            border-radius: 6px;
                            padding: 6px;
                            background-color: #F6F7FB;
                            margin-top: 16px;
                            i {
                                font-size: 20px !important;
                            }
                        }
                    }
                }
                .chapter-list:last-child {
                    border-bottom: solid 1px $light;
                }
                .comments {
                    .panel{
                        width: 100%;
                        .rank-head-img{
                            height: 60px;
                            width: 60px;
                            border-radius: 50%;
                            overflow: hidden;
                        }
                        .item{
                            display: flex;
                            align-items: center;
                            border-bottom: solid 1px $light;
                            padding: 10px 10px 10px 0;
                            height: 100px;
                            .item-l{
                                margin-top: -30px;
                            }
                            .item-r{
                                display: flex;
                                flex-direction:column;
                                justify-content: space-between;
                                height: 100%;
                                margin-left: 30px;
                                width: 100%;
                                .row-1{
                                    font-size: 18px;
                                }
                                .row-2{
                                    font-size: 16px;
                                }
                                .row-3{
                                    font-size: 14px;
                                    .time-and-from{
                                        span:last-child{
                                            margin-left: 30px;
                                        }
                                    }
                                    .praise-num{
                                        cursor: pointer;
                                    }
                                    i{
                                        padding-right: 6px;
                                    }
                                    display: flex;
                                    justify-content: space-between;
                                }
                            }
                        }
                    }
                }
                .file-table{
                    border: solid 1px $light;
                    .remove-a-css{
                        color: $darker;
                    }
                    .grid-content{
                        height: 66px;
                        line-height: 66px;
                        border-bottom: solid 1px $light;
                        padding: 0 20px;
                    }
                }
            }
            .content-panel{
                padding: 30px;
            }
        }
        .content-body-r{
            display: flex;
            flex-direction: column;
            .list-title{
                font-size: 20px;
                height:44px;
                line-height: 44px;
                padding-left: 16px;
                font-weight: 600;
                @include ellipsis(1);
            }
            .remove-a-css{
                color: $darker!important;
            }
            padding: 10px;
            .rank-list{
                display: flex;
                justify-content: flex-end;
                .panel{
                    width: 90%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    min-height: 400px;
                    border: solid 1px $light;
                    padding-bottom: 20px;
                    >div:first-child{
                        border-bottom: solid 1px $light;
                    }
                    .item{
                        >div{
                            padding: 0 20px;
                        }
                        @include vertical-center;
                        .rank-head-img{
                            height: 32px;
                            width: 32px;
                            border-radius: 50%;
                            overflow: hidden;
                        }
                        >div:first-child{
                            width: 5%;
                        }
                        >div:nth-child(2){
                            width: 5%;
                        }
                        >div:nth-child(3){
                            width: 55%;
                            @include ellipsis(1);
                        }
                        >div:nth-child(4){
                            width: 35%;
                        }
                    }
                    .see-more{
                        width: 100%;
                        text-align: center;
                    }
                }
            }
            .similar-course-list{
                display: flex;
                justify-content: flex-end;
                margin-top: 60px;
                .panel{
                    border: solid 1px $light;
                    width: 90%;
                    .see-more{
                        width: 100%;
                        text-align: center;
                        padding-bottom: 20px;
                    }
                    .item{
                        @include vertical-center;
                        padding: 16px 10px;
                        border-top: solid 1px $light ;
                        .item-l{
                            width: 100%;
                            height: 100px;
                        }
                        .item-r{
                            width:100%;
                            display: flex;
                            flex-direction: column;
                            margin-left: 10px;
                            @include ellipsis(3);
                            div:first-child{
                                padding-left: 0;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
