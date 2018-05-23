<template>
    <div class="study-data-detail">
        <teach-head :show_hide_vis="show_hide_vis" ></teach-head>
        <div class="content">
            <div class="content-left">
                <div class="study-data-info">
                    <div class="top">
                        <div class="name">{{chapter_detail_info.chapter_name}}</div>
                        <div class="info">
                            <div><i class="icon-font">&#xe6b3;</i>{{chapter_detail_info.chapter_writer}}</div>
                            <div><i class="icon-font">&#xe78b;</i>{{chapter_detail_info.created_at}}</div>
                            <div><i class="icon-font">&#xe669;</i>{{chapter_detail_info.look_times}}</div>
                            <div><i class="icon-font">&#xe747;</i>{{chapter_detail_info.comment_times}}</div>
                            <div class="study-type">
                                <div  v-for=" i in chapter_detail_info.chapter_type">{{i}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="study-data-content">
                        <div class="title">{{chapter_detail_info.chapter_second_name}}</div>
                        <div class="text">
                            {{chapter_detail_info.chapter_text}}
                            <img :src="chapter_detail_info.chapter_img" alt="">
                        </div>
                    </div>
                    <!--上一篇，下一篇-->
                    <div class="previous-or-next-panel">
                        <div class="previous-or-next">
                            <div>
                                <el-button v-if="other_chapter_info.previous_name" @click="getArticleInfo(other_chapter_info.previous_id)" circle>上一篇</el-button>
                                <el-button v-else disabled circle>没有更多了</el-button>
                                <span><!--{{other_chapter_info.previous_type}}:-->{{other_chapter_info.previous_name}}</span>
                            </div>
                            <div>
                                <span><!--{{other_chapter_info.next_type}}:-->{{other_chapter_info.next_name}}</span>
                                <el-button v-if="other_chapter_info.next_name" circle @click="getArticleInfo(other_chapter_info.next_id)">下一篇</el-button>
                                <el-button v-else disabled circle>没有更多了</el-button>
                            </div>
                        </div>
                    </div>
                    <!--评论-->
                    <div class="comment">
                        <div class="comment-row">共有{{paging.data_number}}条评论</div>
                        <div class="comment-row" v-for="i in comment_list">
                            <div class="comment-l">
                                <div><img :src="$imgPath+i.headimg" alt="" width="100%" height="100%"></div>
                            </div>
                            <div class="comment-r">
                                <div>
                                    <span>{{i.user_name}}</span>
                                    <span>{{i.created_at}}</span>
                                </div>
                                <div>{{i.comment_text}}</div>
                            </div>
                        </div>
                        <template v-if="comment_list.length === 0">
                            <no-data-panel tip="暂无评论"></no-data-panel>
                        </template>
                        <!--分页-->
                        <div class="paging">
                            <el-pagination v-if="paging.data_number !== 0" background layout="prev, pager, next"@current-change="getCommentList()" :page-size="paging.page_all_num" :current-page.sync="paging.now_page"  :total="paging.data_number"></el-pagination>
                        </div>
                        <!--评论回复-->
                        <div class="comment-textarea" >
                            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="comment_text"></el-input>
                            <div class="out-btn">
                                <el-button type="primary" @click="sendComment()">提交评论</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-right">
                <div class="hot-recommended">
                    <div class="head">
                        热门推荐
                    </div>
                    <div class="body">
                        <div class="row" v-for="(i,index) in hot_chapter_list">
                            <div>{{index+1}}</div>
                            <div :title="i.chapter_name" @click="getArticleInfo(i.id)">{{i.chapter_name}}</div>
                            <!--<router-link class="remove-a-css">内容</router-link>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <teach-foot></teach-foot>
    </div>
</template>
<script>
    export default {
        name: 'study-data-detail-center',
        data(){
            return{
                //css
                show_hide_vis:'show-vis',
                study_data_id:this.$route.query.id,
                chapter_detail_info:'',
                other_chapter_info:'',
                comment_list:[],
                hot_chapter_list:[],
                paging:{
                    page_all_num:8,//一页多少数据
                    now_page:1,     //当前页码
                    data_number:0 //一共多少数据
                },
                comment_text:""
            }
        },
        methods:{
            getArticleInfo(id){
                if(id)
                    this.study_data_id = id;
                this.$fetch('/article/getArticleDetail',{id:this.study_data_id})
                    .then((response) => {
                        this.chapter_detail_info = response.chapter_detail;
                        this.other_chapter_info = response.other_chapter_info;
                        //console.log(40,this.chapter_detail_info);
                    })
            },
            getCommentList(){
                this.$fetch('/article/getArticleCommentList',{id:this.study_data_id,num:8})
                    .then((response) => {
                        this.comment_list=response.comment_list;
                        this.paging.data_number = response.pageallnum;
                    })
            },
            getHotChapterList(){
                this.$fetch('/article/getHotArticleList',{num:10})
                    .then((response) => {
                        this.hot_chapter_list = response.hot_chapter_list;
                        // console.log(114,response);
                    })
            },
            sendComment(){ //发表评论
               // 111.230.100.91/teachep/public/course/setUserComment
                let post_data = {
                    id: this.study_data_id,
                    user_id: this.$state.user.user_id,
                    comment_text: this.comment_text,
                    project_class:'2'
                };
                if(this.$state.user.is_login === false){
                    this.$message.warning('请先登陆后评论！');
                    setTimeout(()=>{
                        this.$state.maskType = 'login';
                        this.$state.isShowLoginMask = true;
                    },1000);
                    return false;
                }
                if(post_data.comment_text === ''){
                    this.$message.warning('评论不能为空！');
                    return false;
                }
                this.$post('/course/setUserComment',post_data).then((response) => {
                    this.$message.success('评论成功！');
                    this.comment_text="";
                    this.getCommentList();
                }).catch((err)=>{

                });
            },
        },
        created(){
            this.getArticleInfo();
            this.getCommentList();
            this.getHotChapterList();
        },
    }
</script>
<style scoped  type="text/scss" lang="scss">
    @import "~@/assets/scss/page/study_data_detail.scss";
</style>
