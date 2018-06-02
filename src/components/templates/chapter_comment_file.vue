<template>
    <div class="content-body chapter-comment-file">
        <el-row>
            <el-col class="content-body-l" :span="16">
                <!--<div class="introduction">
                    简介: {{course.course_introduction}}
                </div>-->
                <div class="router-link-c">
                    <template>
                        <el-tabs class="content-tab" v-model="activeName"  @tab-click="handleClick">
                            <el-tab-pane label="章节" name="chapter" v-show="isLoad">
                                <div class="chapter-list" v-for=" (i,index) in tab_items.chapter_list">
                                    <i class="icon-font">&#xe60a;</i><span>第{{index + 1}}章&nbsp;&nbsp;&nbsp;{{i.chapter_name}}</span>
                                    <router-link  :to="{name:'chapter',params:{chapter_child_id:j.id}}" @click.native="linkChapter(j.id)" class="detail-list remove-a-css "v-for="(j,index) in i.detail_list" :key="index">
                                        <div class="row need-hover">
                                            <i class="icon-font">&#xe6b7;</i><span>{{j.name}}</span>
                                            <div class="status" v-if="j.chapter_status === 1"><i class="el-icon-success fn-color-balanced "></i>已学习</div>
                                            <div class="status" v-if="j.chapter_status === 0"><i class="el-icon-error fn-color-danger"></i>未学习</div>
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
                                                        <el-popover placement="bottom" width="400" trigger="click" @show="reply.comment_text_child=''">
                                                            <div class="reply-panel">
                                                                <span><span>{{i.user_name}}</span></span>
                                                                <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="reply.comment_text_child"></el-input>
                                                                <el-button type="primary" size="mini" @click="sendReply(i.id)">发表</el-button>
                                                            </div>
                                                                <el-button slot="reference" size="mini">{{reply.btn_name}}</el-button>
                                                        </el-popover>
                                                    </span>
                                                </div>
                                                <!--评论下的回复-->
                                                <div class="item-r-child" v-if="i.reply_list.length !== 0">
                                                    <div class="item-r-child-panel">
                                                        <div class="item-r-child-row" v-for="j in i.reply_list">
                                                            <div class="row-l"><img :src="$imgPath+j.headimg" width="100%" height="100%" alt=""></div>
                                                            <div class="row-r">
                                                                <span class="user-name"> {{j.user_name}}</span>
                                                                <span class="user-info">
                                                                    <div>{{j.reply_text}}</div>
                                                                    <div>{{j.created_at}}</div>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
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
                                        <el-button type="primary" @click="sendComment()">发表评论</el-button>
                                    </div>
                                </div>
                                <!--分页-->
                                <div class="paging">
                                    <el-pagination v-if="paging.data_number !== 0" background layout="prev, pager, next"@current-change="getCommentList()" :page-size="paging.page_all_num" :current-page.sync="paging.now_page"  :total="paging.data_number"></el-pagination>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane v-if="$state.user.is_login === true" label="文件" name="file">
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
                                            <div class="grid-content ">下载/上传</div>
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
                                           <!--router_type == 'chapter'&&-->
                                            <template v-if="i.isHasReport === false && router_type === 'chapter'"><!--无报告-->
                                                <div class="grid-content upload-btn" v-if="i.file_type === 2 && router_type === 'chapter'" @click="report.dialogVisible=true">上传</div>
                                            </template>
                                            <template v-if="i.isHasReport === true && router_type === 'chapter'"><!--有报告--> <!--1学习资料 2作业  3已经打完分可以被查看 4未打完分不能被查看 -->
                                                <div class="grid-content upload-btn" v-if="i.file_type === 4 && router_type === 'chapter'"  @click="report.dialogVisible=true">修改报告</div>
                                                <div class="grid-content upload-btn" v-if="i.file_type === 3 && router_type === 'chapter'" @click="lookUserFile(i.id)">
                                                    <el-popover placement="bottom" title="报告信息" width="260" trigger="click">
                                                        <div>
                                                            <el-form label-position="right" label-width="80px" :model="report.info">
                                                                <el-form-item label="分数">
                                                                    <el-input disabled v-model="report.info.file_score"></el-input>
                                                                </el-form-item>
                                                                <el-form-item label="打分者">
                                                                    <el-input disabled v-model="report.info.admin_name"></el-input>
                                                                </el-form-item>
                                                                <el-form-item label="评语">
                                                                    <el-input disabled type="textarea" v-model="report.info.file_comment"></el-input>
                                                                </el-form-item>
                                                                <el-form-item label="打分时间">
                                                                    <el-input disabled v-model="report.info.updated_at"></el-input>
                                                                </el-form-item>
                                                            </el-form>
                                                        </div>
                                                        <el-button slot="reference">查看分数</el-button>
                                                    </el-popover>
                                                </div>
                                            </template>
                                            <div class="grid-content" v-if="i.file_type === 2 && router_type === 'course_detail'">--</div>
                                            <a v-if="i.file_type === 1"  :download="$imgPath+i.file_address"  :title="i.file_address" :href="$imgPath+i.file_address" class="grid-content remove-a-css" >下载</a>
                                        </el-col>
                                        <!--上传列表dialog-->
                                        <el-dialog title="上传报告"
                                                   :visible.sync="report.dialogVisible" width="30%"
                                                   >
                                            <div class="report-upload">
                                                <input type="file" hidden  id="report_file" @change="reportChange()">

                                                <div class="file-panel">
                                                    <div class="file-row">
                                                        <label for="">选择报告：</label>
                                                        <div>
                                                            <div class="file-name">{{report.name ? report.name:'还未上传报告'}}</div>
                                                        </div>
                                                        <el-button type="info" size="small" @click="openFile()">选择文件</el-button>
                                                    </div>
                                                </div>
                                            </div>
                                            <span slot="footer" class="dialog-footer">
                                        <el-button type="danger" @click="reportUpload()" cicle>确认上传</el-button>
                                        </span>
                                        </el-dialog>
                                        <!--E-->
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
                        <router-link target="_blank"  to="/user_rank" class="item remove-a-css need-hover" v-for="(i,index) in right_data.user_rank" :key="index">
                            <div>{{index + 1}}</div>
                            <div>
                                <div class="rank-head-img"><img :src="$imgPath+i.head_img" height="100%" width="100%"></div>
                            </div>
                            <div class="user-name need-hover" :title="i.user_name">{{i.user_name}}</div>
                            <div class="need-hover">{{i.score}}分</div>
                        </router-link>
                        <template v-if="right_data.user_rank.length == 0">
                            <no-data-panel tip="暂无用户信息"></no-data-panel>
                        </template>
                        <div class="see-more" v-if="right_data.user_rank.length != 0">
                            <router-link to="/user_rank" class="remove-a-css" target="_blank"><span class="need-hover">查看更多&nbsp;></span></router-link>
                        </div>
                    </div>
                </div>
                <div class="similar-course-list">
                    <div class="panel">
                        <div class="list-title">相似课程推荐</div>
                        <router-link target="_blank" :to="{name:'course_detail', params:{course_id:i.id}}" class="item remove-a-css need-hover" v-for="(i,index) in right_data.similar_course" :key="index">
                            <div class="item-l"><img :src="$imgPath+i.course_img" width="100%" height="100%" alt=""></div>
                            <div class="item-r">
                                <div class="similar-list-title need-hover">{{i.course_name}}</div>
                                <div class="need-hover">{{i.course_introduction}}</div>
                            </div>
                        </router-link>
                        <template v-if="right_data.similar_course.length == 0">
                            <no-data-panel tip="暂无相关课程"></no-data-panel>
                        </template>
                        <div class="see-more" v-if="right_data.similar_course.length != 0">
                            <router-link  to="/course" class="remove-a-css" target="_blank"><span class="need-hover">查看更多&nbsp;></span></router-link>
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
                    page_all_num:8,//一页多少数据
                    now_page:1,     //当前页码
                    data_number:0 //一共多少数据
                },
                //回复
                reply:{
                    btn_name:'回复',
                    comment_text:'',//外层回复
                    comment_text_child:''//内层回复
                },
                //报告上传
                report:{
                    name:"",
                    dialogVisible:false,
                    info:{},
                },
                isLoad: false
            }
        },
        methods: {
            ...mapMutations({
                setCourseId: 'setCourseId',
            }),
            getCourseInfo(){
                return new Promise((resolve,reject)=>{
                    this.$fetch('/course/getHomeCourseDetail',{id:this.$state.current.course_id,user_id:this.$state.user.user_id}).then((response) => {
                        this.types = response;
                        //console.log(45,response);
                        this.isLoad= true;
                        this.course = response.course;
                        this.$emit('transferCourse',response.course);//把课程信息传输给course_detail路由 和 chapter路由
                        this.tab_items.chapter_list = response.chapter_list;
                        resolve(response);
                    })
                        .catch(err =>{
                            reject(err);
                            console.log(err);
                        });
                });
            },
            getUserRank(){
                return new Promise((resolve,reject)=>{
                    this.$fetch('/course/getUserSortList', {num: 5, type: 1, pagenow: 1})
                        .then((response) => {
                            this.right_data.user_rank = response.user;
                            //console.log('user_rank',this.right_data.user_rank);
                        })
                        .catch(err => {
                            reject(err);
                            console.log(err);
                        });
                });
            },
            handleClick(tab, event) {
                //console.log( 105,tab, event);
            },
            getSimilarCourse(){
                return new Promise((resolve,reject)=>{
                    this.$fetch('/course/getCourseSortList',{num:5,id:this.course.id}).then((response) => {
                        this.right_data.similar_course = response.course;
                        //console.log('similar_course',this.right_data.similar_course);
                    })
                });
            },
            getCommentList(){
                //course和chapter的评论格式不一样
                let post_data= {
                    num: this.paging.page_all_num,
                    pagenow: this.paging.now_page
                },url;
                console.log(282,this.router_type);
                if(this.router_type === 'course_detail'){
                    post_data.id= this.course.id;
                    url = "/course/getCommentList";
                }else if(this.router_type === 'chapter'){
                    post_data.id = this.$state.current.chapter_child_id;
                    url = "/course/getCommentDetailList";
                }
                return new Promise((resolve,reject)=>{
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
                });
            },

            getFileList(){
                return new Promise((resolve,reject)=>{
                    let url = "",data = {};
                    if(this.router_type === 'course_detail' ){
                        url = "/course/getFileList";
                        data.id = this.course.id;
                    }else if(this.router_type === 'chapter'){
                        url = "/course/getImageTextFileList";
                        data.id = this.$state.current.chapter_child_id;
                        data.user_id=this.$state.user.user_id;
                    }

                    this.$fetch(url,data).then((response) => {
                        this.tab_items.file_list = response.file_list;
                        if(response.file_list.length !== 0 && response.file_list[0].report_name){
                            this.report.name = response.file_list[0].report_name.split('/')[response.file_list[0].report_name.split('/').length-1];
                        }
                        //console.log('file_list',this.tab_items.file_list);
                    })
                });
            },
            praise(comment_id){
                if(this.$state.user.is_login === false){
                    this.$message.warning('请先登陆后再点赞！');
                    setTimeout(()=>{
                        this.$state.maskType = 'login';
                        this.$state.isShowLoginMask = true;
                    },1000);
                    return false;
                }
                this.$post('/course/praise',{comment_id:comment_id,user_id:this.$state.user.user_id}).then((response) => {
                    this.$message.success('点赞成功！');
                    this.getCommentList();
                }).catch((err)=>{
                    this.$message.warning('您已经点赞过了！');
                });
                console.log(218,comment_id);
            },
            sendComment(){ //发表评论
                let post_data = {
                    id: this.$state.current.chapter_child_id,
                    user_id: this.$state.user.user_id,
                    comment_text: this.reply.comment_text,
                    project_class:'1'
                };
                if(post_data.comment_text === ''){
                    this.$message.warning('评论不能为空！');
                    return false;
                }
                if(this.$state.user.is_login === false){
                    this.$message.warning('请先登录后评论！');
                    setTimeout(()=>{
                        this.$state.maskType = 'login';
                        this.$state.isShowLoginMask = true;
                    },1000);
                    return false;
                }
                this.$post('/course/setUserComment',post_data).then((response) => {
                        this.$message.success('评论成功！');
                        this.reply.comment_text="";
                        this.getCommentList();
                }).catch((err)=>{

                });
            },
            sendReply(comment_id){   //发表回复
                let post_data = {
                    comment_id: comment_id,
                    user_id: this.$state.user.user_id,
                    reply_text: this.reply.comment_text_child,
                };
                if(post_data.comment_text_child === ''){
                    this.$message.warning('评论不能为空！');
                    return false;
                }else{
                    this.$post('/course/setUserReply',post_data).then((response) => {
                        this.$message.success('评论成功！');
                        this.getCommentList();
                    }).catch((err)=>{

                    });
                    document.querySelector("body").click();
                }
            },
            /****上传报告****/
            openFile(){
                document.querySelector('#report_file').click();
            },
            //报告监听
            reportChange(){
                let file = document.querySelector('#report_file').files[0];
                if(file)
                    this.report.name= file.name;
                else
                    this.report.name= "还未上传报告";
                //console.log(382,file);
            },
            //上传报告
            reportUpload(){
                let formData = new FormData();
                let file = document.querySelector('#report_file').files[0];
                formData.append('user_file_name',file);
                formData.append('user_id',this.$state.user.user_id);
                formData.append('image_text_id',this.$state.current.chapter_child_id);
                formData.append('file_id',this.tab_items.file_list[0].id);//文件id
                if(file === undefined){
                    this.$message.warning('请先选择报告!');
                    return false;
                }
                this.$post('/user/uploadUserFile',formData).then((response) => {
                    this.$message.success('报告上传成功!');
                    this.report.dialogVisible = false;
                }).catch((err)=>{

                });
            },
            lookUserFile(){
                this.$post('/user/lookUserFile',{ user_id:this.$state.user.user_id,
                    image_text_id:this.$state.current.chapter_child_id}).then((response) => {
                    this.report.info = response.user_file;
                    console.log(449,response);
                }).catch((err)=>{

                });
            },
            linkChapter(chapter_chiid_id){
                //console.log(492,this.router_type);
                if(this.router_type === 'chapter'){
                    //点击子章节，重新刷新数据
                    if(this.$state.current.chapter_child_id !== chapter_chiid_id){
                        this.$state.current.chapter_child_id = chapter_chiid_id;
                        location.reload();
                    }
                }
            },
        },
        created(){
            if(this.$route.params.course_id){
                this.setCourseId(this.$route.params.course_id);
            }
            //console.log(197,'course_id:',this.$state.current.course_id);
            //console.log(this.router_type);
            this.router_type = this.$route.path.substring(1);
            Promise.all([ //解决请求响应时间不统一问题 -->此方法只是测试
                this.getCourseInfo(), //获取课程基本信息
                this.getUserRank(),  //获取用户排行表
                this.getSimilarCourse(), //类似课程
                this.getCommentList(), //获取评论
                this.getFileList()//类似课程
            ])
        },
        computed:{

        }
    }
</script>
<style  lang="scss" type="text/scss">
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
                        font-size: 16px;
                        .row {
                            padding-left: 20px !important;
                            height: 38px;
                            line-height: 38px;
                            border-radius: 6px;
                            padding: 6px;
                            background-color: #F6F7FB;
                            margin-top: 16px;
                            display: flex;
                            span{
                                width: 100%;
                            }
                            i {
                                font-size: 20px !important;
                            }
                        }
                        .status{
                            @include vertical-center;
                            width: 100%;
                            justify-content: flex-end;
                            padding-right: 30px;
                            i{
                                margin-right: 6px;
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
                            //align-items: center;
                            border-bottom: solid 1px $light;
                            padding: 20px 10px 20px 0;
                            .item-l{
                                //margin-top: -30px;
                            }
                            .item-r{
                                display: flex;
                                flex-direction:column;
                                justify-content: space-between;
                                height: 100%;
                                margin-left: 30px;
                                width: 80%;
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
                                    margin-top: 10px;
                                    font-size: 16px;
                                }
                                .row-3{
                                    margin-top: 10px;
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
                                .item-r-child{
                                    padding: 20px 0 20px 60px;
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: flex-end;
                                    font-size: 14px;
                                    .item-r-child-panel{
                                        border-radius: 4px;
                                        background-color: #F7F8FA;
                                        .item-r-child-row:not(:last-child){
                                            border-bottom: dashed 1px $light;
                                        }
                                        .item-r-child-row{
                                            padding: 10px;
                                            padding-right: 0;
                                            display: flex;
                                            align-items: center;
                                            width: 98%;
                                            .row-l{
                                                border-radius: 50%;
                                                height: 46px;
                                                width: 46px;
                                                overflow: hidden;
                                            }
                                            .row-r{
                                                display: flex;
                                                flex-direction: column;
                                                padding-left: 16px;
                                                width: 80%;
                                                .user-name{
                                                    color: $positive;
                                                    cursor: pointer;
                                                }
                                                .user-info{
                                                    display: flex;
                                                    justify-content: space-between;
                                                    align-items: center;
                                                }
                                            }
                                        }
                                    }
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
                    //border-bottom: none;
                    font-size: 15px;
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
                    .upload-btn{
                        cursor: pointer;
                    }
                }
                .report-upload{
                    font-size: 18px;
                    font-weight: 600;
                    @include vertical-center;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 180px;
                    .file-panel{
                        margin-top: 80px;
                        .file-row{
                            @include vertical-center;
                            width: 400px;
                            justify-content: space-around;
                            .file-name{
                                font-size: 16px;
                                font-weight: normal;
                                @include ellipsis(1);
                            }
                        }
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
                font-size: 16px;
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
                font-size: 15px;
                .panel{
                    width: 90%;
                    display: flex;
                    flex-direction: column;
                    padding-bottom: 20px;
                    border-radius: 12px;
                    box-shadow: 0 4px 16px 0 rgba(7,17,27,.1);
                    .list-title{
                        padding-top: 16px;
                        border: none!important;
                    }
                    >a{
                        min-height: 60px;
                    }
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
                        font-size: 14px;
                        width: 100%;
                        text-align: center;
                    }
                }
            }
            .similar-course-list{
                display: flex;
                justify-content: flex-end;
                margin-top: 60px;
                font-size: 15px;
                .panel{
                    width: 90%;
                    border-radius: 12px;
                    box-shadow: 0 4px 16px 0 rgba(7,17,27,.1);
                    >a{
                        border: none!important;
                    }
                    .list-title{
                        padding-top: 16px;
                        border: none!important;
                    }
                    .see-more{
                        font-size: 14px;
                        width: 100%;
                        text-align: center;
                        padding-bottom: 20px;
                    }
                    .item{
                        @include vertical-center;
                        padding: 16px 10px;
                        border-top: solid 1px $light ;
                        .item-l{
                            width: 220px;
                            height: 100px;
                            img{
                                border-radius: 12px;
                            }
                        }
                        .item-r{
                            .similar-list-title{
                                font-weight: bolder;
                                font-size: 16px;
                                @include ellipsis(1);
                            }
                            width:100%;
                            height: 100px;
                            display: flex;
                            flex-direction: column;
                            //justify-content: space-around;
                            margin-left: 10px;
                            div:last-child{
                                margin-top:6px;
                                @include ellipsis(3);
                            }
                            div:first-child{
                                padding-left: 0;
                            }
                        }
                    }
                }
            }
        }
        .paging{
            margin-top: 20px;
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
    .chapter-comment-file{
        .content-tab {
            .el-tabs__header{
                border: none!important;
            }
            #tab-report-upload{
                font-size: 18px!important;
                font-weight: 600!important;
            }
            .el-tag{
                margin-top: 10px;
                font-size: 18px!important;
                font-weight: 600!important;
            }
            //tabs
            .el-tabs__nav{
                .el-tabs__active-bar{
                    background-color: $selectColor;
                }
                .el-tabs__item{
                    font-size: 18px;
                }
                .is-active{
                    color: $selectColor;
                }
            }
        }
    }
    .chapter-comment-file{
        .course_detail{
            .el-dialog__header{
                border-bottom:solid 1px $light;
            }
            .el-input__inner{
                color: $danger!important;
            }
        }
    }
</style>
