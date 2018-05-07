<template>
    <div class="personal-center">
        <teach-head  :show_hide_vis="show_hide_vis" ></teach-head>
        <div class="content">
            <div class="content-l">
                <div class="filter-title">
                    <div>
                        <el-radio-group v-model="filter_type" @change="getArticleList(0)">
                            <el-radio-button label="">全部</el-radio-button>
                            <el-radio-button :label="i.id" v-for="(i,index) in chapter_type_list" :key="index">{{i.name}}</el-radio-button>
                        </el-radio-group>
                    </div>
                </div>
                <div class="study-data">
                    <template v-if="chapter_list.length!==0">
                        <el-row class="row" @click.native="link('study_data_detail','study_data_id',i.id)" v-for="(i,index) in chapter_list" :key="index">
                            <el-col :span="8" class="bg-img">
                                <img :src="i.chapter_img" alt="" width="100%" height="100%">
                            </el-col>
                            <el-col :span="16">
                                <div class="data-r">
                                    <div>{{i.chapter_name}}</div>
                                    <div>
                                        <div class="name"><i class="icon-font">&#xe6b3;</i>{{i.chapter_writer}}</div>
                                        <div class="time"><i class="icon-font">&#xe78b;</i>{{i.created_at}}</div>
                                    </div>
                                    <div>{{i.chapter_introduction}}</div>
                                    <div class="type-and-comment">
                                        <div class="type">
                                            <div v-for="j in i.chapter_type">{{j}}</div>
                                        </div>
                                        <div class="comment">
                                            <span>{{i.look_times}}&nbsp;次查看</span>
                                            <span>{{i.comment_times}}&nbsp;次评论</span>
                                        </div>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                        <div class="look-more" @click="getArticleList()">
                            点击查看更多
                        </div>
                    </template>
                    <template v-else>
                        <no-data-panel tip="暂无学习资料"></no-data-panel>
                    </template>
                </div>
            </div>
            <div class="content-r">
                <div class="hot-recommended">
                    <div class="head">
                        热门推荐
                    </div>
                    <div class="body">
                        <div class="row" v-for="(i,index) in hot_chapter_list" @click="link('study_data_detail','study_data_id',i.id)">
                            <div>{{index+1}}</div>
                            <div :title="i.chapter_name">{{i.chapter_name}}</div>
                            <!--<router-link class="remove-a-css">内容</router-link>-->
                            <template v-if="hot_chapter_list.length == 0">
                                <no-data-panel tip="暂无推荐"></no-data-panel>
                            </template>
                        </div>
                    </div>
                </div>

                <div class="last-comment">
                    <div class="head">
                        最新评论
                    </div>
                    <div class="body">
                        <div class="comment-row" v-for="(i,index) in last_comment_list">
                            <div class="head-img">
                                <img :src="i.head_img" alt="" width="100%" height="100%">
                            </div>
                            <div class="person-info">
                                <span>{{i.user_name}}</span>
                                <span>{{i.content}}</span>
                            </div>
                        </div>
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
                //css
                show_hide_vis:'show-vis',
                filter_type:"",
                chapter_type_list:[],
                chapter_list:[],
                index:0,
                hot_chapter_list:[],
                last_comment_list:[],
            }
        },
        methods:{
            getArticleTypeList(){
                this.$fetch('/article/getArticleTypeList')
                    .then((response) => {
                        this.chapter_type_list = response.chapter_type_list;
                    })
            },
            getArticleList(index){
                if(index === 0){
                    this.index = 0;
                }
                this.$fetch('article/getArticleList',{index:this.index,type_id:this.filter_type})
                    .then((response) => {
                        if(this.index === 0){
                            this.chapter_list = response.chapter_list;
                        }else{
                            this.chapter_list = this.chapter_list.concat(response.chapter_list);
                        }
                        this.index += 5;
                        if(response.chapter_list.length === 0){
                            this.$message.warning('没有更多了!');
                        }
                    })
            },
            getHotArticleList(){
                this.$fetch('/article/getHotArticleList',{num:10})
                    .then((response) => {
                        this.hot_chapter_list = response.hot_chapter_list;
                       // console.log(114,response);
                    })
            },
            getLastCommentList(){
                this.$fetch('/article/getLastCommentList')
                    .then((response) => {
                        this.last_comment_list = response.last_comment_list;
                        // console.log(114,response);
                    })
            },
            link(link_name,params_name,id){
                console.log(link_name,params_name,id);
                this.$router.push({
                    path: link_name,
                    name: link_name,
                    query: {
                        id: id,
                    }
                })

            }
        },
        created(){
            this.getArticleTypeList();//章节类别list
            this.getArticleList();//章节list
            this.getHotArticleList();//热门文章
            this.getLastCommentList();//最新评论
        }
    }
</script>
<style scoped type="text/scss" lang="scss">
    @import "~@/assets/scss/page/study_data.scss";
</style>
<style type="text/scss" lang="scss">
    .filter-title{
        .el-radio-group {
            /*.el-radio-button:not(:first-child) {
                margin-left: 30px;
            }*/
            .el-radio-button{
                margin-top: 16px;
                margin-left: 30px;
            }
            .el-radio-button__inner {
                border: solid 1px $stable;
                border-radius: 0;
                min-width: 100px;
            }
        }
    }
</style>
