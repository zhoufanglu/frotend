<template>
    <div class="course_detail">
        <teach-head :show_hide_vis="show_hide_vis" ></teach-head>
        <div>
            <div class="content">
                <div class="content-top">
                    <!--面包屑-->
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/course' }">课程中心</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/course_detail' }">{{chapter_child.course_name}}</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/course_detail' }">{{chapter_child.chapter_name}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{chapter_child.image_text_name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="chapter">
                        <div class="chapter-l">
                            <div class="title">
                                <div class="title-l">
                                    <div class="need-hover" @click="back()">
                                        <i class="icon-font">&#xe78a;</i>
                                        <div>{{chapter_child.course_name}}</div>
                                    </div>
                                    <div class="s-title">{{chapter_child.chapter_name}}</div>
                                </div>
                            </div>
                            <div class="chapter-child-body">
                                <div class="title">
                                    <div>
                                        {{chapter_child.image_text_name}}
                                    </div>
                                    <div>
                                        <el-button v-if="chapter_child.image_text_status===0" @click="finishChapter()" type="danger">完成学习</el-button>
                                        <el-button v-if="chapter_child.image_text_status===1" type="info" disabled>已学习</el-button>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <div v-if="chapter_child.image_text_type == 1">
                                        <video src="../assets/video/vue-2-power-model.mp4" style="width: 100%" controls="controls">
                                            您的浏览器不支持 video 标签。
                                        </video>
                                    </div>
                                    <div class="body-vm">{{chapter_child.image_text_detail}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="chapter-r">
                            <div>我是VM</div>
                        </div>
                    </div>
                </div>
                <chapter_comment_file></chapter_comment_file>
        </div>
        </div>
        <teach-foot></teach-foot>
    </div>
</template>
<script>
    import { mapMutations } from 'vuex'
    import chapter_comment_file from '../components/templates/chapter_comment_file.vue'
    export default {
        name: 'chapter',
        data(){
            return{
                //css
                show_hide_vis:'show-vis',
                chapter_child:{
                    id:this.$route.params.chapter_child_id
                },
            }
        },
        methods: {
            ...mapMutations({
                setChapterChildId: 'setChapterChildId',
            }),
            getChapterChildInfo(){
                this.$fetch('/course/getImageTextDetail',{id:this.$state.current.chapter_child_id,user_id:this.$state.user.user_id})
                    .then((response) => {
                        this.chapter_child = response.image_text_detail;
                        console.log(51,response);
                    })
                    .catch(error =>{
                        console.log(err);
                    });
            },
            back(){
                this.$router.push({
                    path: '/course_detail',
                    name: 'course_detail',
                    query: {
                        //id: this.course_id,
                    }
                })
            },
            finishChapter(){
                if(this.$state.user.is_login === false){
                    this.$message.warning('请先登录后才能完成！');
                    return false;
                }
                if(this.chapter_child.learn_status === 1 ){
                    this.$message.warning('您的课程还未开始，请先开始课程再进行学习！');
                    return false;
                }
                this.$post('/course/setUserFinish',{id:this.chapter_child.id,user_id:this.$state.user.user_id})
                    .then((response) => {
                       this.$message.success('您已成功完成此章节');
                        this.getChapterChildInfo();
                    })
                    .catch(error =>{
                        console.log(err);
                    });
            }
        },
        mounted(){
            //存子章节id
            console.log(86,this.$route.params.chapter_child_id);
           if(this.chapter_child.id){
               this.setChapterChildId(this.chapter_child.id);
           }
            //console.log(36,this.$state.current);
            this.getChapterChildInfo();
        },
        components:{chapter_comment_file}
    }
</script>
<style scoped type="text/scss" lang="scss">
    @import "~@/assets/scss/page/course_detail.scss";
    .introduction{
        display: none!important;
    }
    .chapter{
        display: flex;
        .chapter-l{
            width: 50%;
            display: flex;
            flex-direction: column;
            padding: 16px;
            .title{
                @include vertical-center;
                justify-content: space-between;
                border-bottom: solid 1px $light;
                padding-bottom: 16px;
                padding-left: 16px;
                .title-l{
                    >div:first-child{
                        @include vertical-center;
                    }
                }
                i{
                    font-size: 26px;
                    margin-right: 10px;
                }
                >div:first-child{
                    @include vertical-center;
                    cursor: pointer;
                }
                .s-title{
                    font-size: 16px;
                    margin-left: 20px;
                }
                .el-button{
                    margin-right: 30px;
                }
            }
            .chapter-child-body{
                .title{
                    font-size: 18px;
                }
                .bottom{
                    font-size: 18px;
                    letter-spacing: 6px;
                    display: flex;
                    flex-direction: column;
                }
            }
        }
        .chapter-r{
            width: 50%;
            padding: 16px;
            border-left: solid 1px $light;
            .body-vm{
            }
        }
    }
</style>
