<template>
    <div class="content-body">
        <el-row>
            <el-col class="content-body-l" :span="16">
                <div class="introduction">
                    简介: {{course.course_introduction}}
                </div>
                <div class="router-link-c">
                    <template>
                        <el-tabs class="content-tab" v-model="activeName" type="card" @tab-click="handleClick">
                            <el-tab-pane label="章节" name="chapter">
                                <div class="chapter-list" v-for=" (i,index) in tab_items.chapter_list">
                                    <i class="icon-font">&#xe60a;</i><span>第{{index + 1}}章&nbsp;&nbsp;&nbsp;{{i.chapter_name}}</span>
                                    <router-link  :to="{name:'chapter',params:{chapter_child_id:i.id}}"  class="detail-list remove-a-css "v-for="(j,index) in i.detail_list" :key="index">
                                        <div class="row">
                                            <i class="icon-font">&#xe6b7;</i><span>{{j.name}}</span>
                                        </div>
                                    </router-link>
                                </div>
                                <template v-if="tab_items.chapter_list.length == 0">
                                    <no-data-panel tip="暂无相关章节"></no-data-panel>
                                </template>
                            </el-tab-pane>
                            <el-tab-pane label="评论" name="comments">
                                <div class="comments">
                                    <div class="panel">
                                        <!--如果是course下的评论-->
                                        <div class="item" v-for="i in tab_items.comment_list" v-if="router_type == 'course_detail'">
                                            <div class="rank-head-img item-l"><img :src="$imgPath+i.headimg" width="100%" height="100%" alt=""></div>
                                            <div class="item-r">
                                                <div class="row-1">{{i.user_name}}</div>
                                                <div class="row-2">{{i.comment_text}}</div>
                                                <div class="row-3">
                                                    <div class="time-and-from">
                                                        <span>时间:{{i.created_at}}</span>
                                                        <span>源自:{{i.image_text_name}}</span>
                                                    </div>
                                                    <div class="praise-num" @click="praise(i.id)">
                                                        <i class="icon-font">&#xe672;</i><span>{{i.praise_num}}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!--如果是chapter下的评论-->
                                        <div class="item" v-for="(i,index) in tab_items.comment_list" v-if="router_type == 'chapter'">
                                            <div class="rank-head-img item-l"><img :src="$imgPath+i.headimg" width="100%" height="100%" alt=""></div>
                                            <div class="item-r">
                                                <div class="row-1">
                                                    <!--点赞-->
                                                    <span>{{i.user_name}}</span>
                                                    <div class="praise-num" @click="praise(i.id)">
                                                        <i class="icon-font">&#xe672;</i><span>{{i.praise_num}}</span>
                                                    </div>
                                                </div>
                                                <div class="row-2">{{i.comment_text}}</div>
                                                <div class="row-3">
                                                    <div class="time-and-from">
                                                        <span>时间:{{i.created_at}}</span>
                                                        <span>源自:{{i.image_text_name}}</span>
                                                    </div>
                                                    <!--回复评论-->
                                                    <span class="reply-btn">
                                                        <el-popover placement="bottom" width="400" trigger="click" @show="reply.comment_text=''">
                                                            <div class="reply-panel">
                                                                <span><span>{{i.user_name}}</span></span>
                                                                <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="reply.comment_text"></el-input>
                                                                <el-button type="success" size="mini" @click="">发表</el-button>
                                                            </div>
                                                                <el-button slot="reference" size="mini">{{reply.btn_name}}</el-button>
                                                        </el-popover>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <template v-if="tab_items.comment_list.length == 0">
                                            <no-data-panel tip="暂无评论"></no-data-panel>
                                        </template>
                                    </div>
                                </div>
                                <div class="comment-textarea" v-if="router_type == 'chapter'">
                                    <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="reply.comment_text"></el-input>
                                    <div class="out-btn">
                                        <el-button type="success" >发表评论</el-button>
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
                                            <div class="grid-content" :title="i.chapter_name">{{i.chapter_name}}</div>
                                        </el-col>
                                        <el-col :span="4">
                                            <div class="grid-content " :title="i.file_name">{{i.file_name}}</div>
                                        </el-col>
                                        <el-col :span="8">
                                            <div class="grid-content ">&nbsp;</div>
                                        </el-col>
                                        <el-col :span="4">
                                            <div class="grid-content" v-if="i.file_size" :title="i.file_size">{{i.file_size}}</div>
                                            <div class="grid-content" v-else>--</div>
                                        </el-col>
                                        <el-col :span="4">
                                            <router-link  to="/course"target="_blank" class="grid-content remove-a-css" :title="i.file_address">{{i.file_address}}</router-link>
                                        </el-col>
                                    </el-row>
                                    <template v-if="tab_items.file_list.length == 0">
                                        <no-data-panel tip="暂无文件"></no-data-panel>
                                    </template>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </template>
                </div>
                <div class="content-panel">

                </div>
            </el-col>
            <el-col class="content-body-r":span="8">
                <div class="rank-list">
                    <div class="panel">
                        <div class="list-title">排行榜</div>
                        <router-link target="_blank" :to="{path:'/course_detail', query:{id:i.id}}" class="item remove-a-css" v-for="(i,index) in right_data.user_rank" :key="index">
                            <div>{{index + 1}}</div>
                            <div>
                                <div class="rank-head-img"><img :src="$imgPath+i.head_img" height="100%" width="100%"></div>
                            </div>
                            <div class="user-name" :title="i.user_name">{{i.user_name}}</div>
                            <div>{{i.score}}分</div>
                        </router-link>
                        <template v-if="right_data.user_rank.length == 0">
                            <no-data-panel tip="暂无用户信息"></no-data-panel>
                        </template>
                        <div class="see-more">
                            <router-link to="/user_rank" class="remove-a-css" target="_blank">查看更多&nbsp;></router-link>
                        </div>
                    </div>
                </div>
                <div class="similar-course-list">
                    <div class="panel">
                        <div class="list-title">相似课程推荐</div>
                        <router-link target="_blank" :to="{path:'/course', query:{id:i.id}}" class="item remove-a-css" v-for="(i,index) in right_data.similar_course" :key="index">
                            <div class="item-l"><img :src="$imgPath+i.course_img" width="100%" height="100%" alt=""></div>
                            <div class="item-r">
                                <div class="list-title">{{i.course_name}}</div>
                                <div>{{i.course_introduction}}</div>
                            </div>
                        </router-link>
                        <template v-if="right_data.similar_course.length == 0">
                            <no-data-panel tip="暂无相关课程"></no-data-panel>
                        </template>
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
    import { mapMutations } from 'vuex'
    export default {
        name: '',
        props: ['course_info'],
        data(){
            return{
                course: {
                    id: this.$state.current.course_id,
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
                router_type:'course_detail',//是哪个类别 course_detail和chapter
                paging:{
                    page_all_num:30,//一页多少数据
                    now_page:1,     //当前页码
                    data_number:0 //一共多少数据
                },
                //回复
                reply:{
                    btn_name:'回复',
                    comment_text:'',//外层回复
                    comment_text_child:''//内层回复
                }
            }
        },
        methods: {
            ...mapMutations({
                setCourseId: 'setCourseId',
            }),
            getCourseInfo(){
                this.$fetch('/course/getHomeCourseDetail',{id:this.$state.current.course_id}).then((response) => {
                    this.types = response;
                    //console.log(45,response);
                    this.course = response.course;
                    this.$emit('transferCourse',response.course);//把课程信息传输给course_detail路由
                    this.tab_items.chapter_list = response.chapter_list;
                })
                    .catch(err =>{
                        console.log(err);
                    });
            },
            getUserRank(){
                this.$fetch('course/getUserSortList',{num:5,type:1,pagenow:1}).then((response) => {
                    this.right_data.user_rank = response.user;
                    //console.log('user_rank',this.right_data.user_rank);
                })
            },
            handleClick(tab, event) {
                //console.log( 105,tab, event);
            },
            getSimilarCourse(){
                this.$fetch('/course/getCourseSortList',{num:5,id:this.course.id}).then((response) => {
                    this.right_data.similar_course = response.course;
                    //console.log('similar_course',this.right_data.similar_course);
                })
            },
            getCommentList(){
                //course和chapter的评论格式不一样
                let post_data= {
                    num: this.paging.page_all_num,
                    pagenow: this.paging.now_page
                },url;
                if(this.router_type === 'course_detail'){
                    post_data.id= this.course.id;
                    url = "/course/getCommentList";
                }else if(this.router_type === 'chapter'){
                    post_data.id = this.$state.current.chapter_child_id;
                    url = "/course/getCommentDetailList";
                }
                this.$fetch(url, post_data)
                    .then((response) => {
                        this.tab_items.comment_list = response.comment_list;
                        //初始化下数组
                        let comments = this.tab_items.comment_list;
                        for(let i in comments){
                            Object.assign(comments[i],{'btn_name':'回复'});
                        }
                        this.paging.data_number = response.pageallnum;
                        this.tab_items.comment_list=comments;
                        //console.log('comment_list',this.tab_items.comment_list);
                    })
            },
            getFileList(){
                this.$fetch('/course/getFileList',{ id:this.course.id}).then((response) => {
                    this.tab_items.file_list = response.file_list;
                    //console.log('file_list',this.tab_items.file_list);
                })
            },
            praise(comment_id){
                if(this.$state.user.is_login === false){
                    this.$message.warning('请先登陆！');
                    return false;
                }
                this.$fetch('/course/praise',{comment_id:comment_id,user_id:this.$state.user.user_id}).then((response) => {
                    this.$message.success('点赞成功！');
                }).catch((err)=>{
                    this.$message.warning('您已经点赞过了！');
                });
                console.log(218,comment_id);
            },
        },
        created(){
            if(this.$route.params.course_id){
                this.setCourseId(this.$route.params.course_id);
            }
            //console.log(197,'course_id:',this.$state.current.course_id);
            //console.log(this.router_type);
            this.router_type = this.$route.path.substring(1);
            this.getCourseInfo();   //获取课程基本信息
            //this.getUserRank();     //获取用户排名列表
            this.getSimilarCourse();//类似课程
            this.getCommentList();  //获取评论
            this.getFileList();
        },
        computed:{

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
                            padding: 10px 10px 20px 0;
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
                                    display: flex;
                                    justify-content: space-between;
                                    .praise-num{
                                        cursor: pointer;
                                        font-size: 14px;
                                    }
                                    i{
                                        padding-right: 6px;
                                        font-size: 14px;
                                    }
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
                                        font-size: 14px;
                                    }
                                    i{
                                        padding-right: 6px;
                                        font-size: 14px;
                                    }
                                    display: flex;
                                    justify-content: space-between;
                                }
                            }
                        }
                    }
                }
                .comment-textarea{
                    margin: 30px 0;
                    display: flex;
                    justify-content: flex-end;
                    flex-direction: column;
                    .out-btn{
                        display: flex;
                        justify-content: flex-end;
                        .el-button{
                            margin-top: 30px;
                            width: 30%;
                        }
                    }
                }
                .file-table{
                    border: solid 1px $light;
                    border-bottom: none;
                    .remove-a-css{
                        color: $darker;
                    }
                    .grid-content{
                        @include ellipsis(1);
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
                            white-space: nowrap;
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
<style lang="scss" type="text/scss">
    //element 样式重置
    .reply-panel{
        display: flex;
        flex-direction: column;
        justify-content: flex-end!important;
        padding: 6px;
        >span{
            padding-bottom: 6px;
            >span{
                font-weight: 600;
            }
        }
        .el-button{
            margin-top: 16px;
        }
    }
</style>
