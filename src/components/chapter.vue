<template>
    <div class="course_detail">
        <teach-head :nickName="nickName" :headSrcLink="headSrcLink" :show_hide_vis="show_hide_vis" ></teach-head>
        <div>
            <div class="content">
                <div class="content-top">
                    <div class="chapter">
                        <div class="chapter-l">
                            <div class="title">
                                <div @click="back()">
                                    <i class="icon-font">&#xe78a;</i>
                                    <div>{{chapter_child.course_name}}</div>
                                </div>
                                <div>{{chapter_child.chapter_name}}</div>
                            </div>
                            <div class="chapter-child-body">
                                <div class="title">{{chapter_child.image_text_name}}</div>
                                <div class="bottom">
                                    <div v-if="chapter_child.image_text_type == 1">
                                        我是视频
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
                nickName:'',
                headSrcLink:require('@/assets/images/dogHead.jpg'),
                //css
                show_hide_vis:'show-vis',
                chapter_child:{
                    id:this.$route.params.chapter_child_id,
                },
            }
        },
        methods: {
            ...mapMutations({
                setChapterChildId: 'setChapterChildId',
            }),
            getChapterChildInfo(){
                this.$fetch('http://127.0.0.1/teachep/public/course/getImageTextDetail')
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
            }
        },
        mounted(){
            //存子章节id
           if(this.chapter_child.id){
               this.setChapterChildId(this.chapter_child.id);
           }
            //console.log(36,this.$state.current);
            this.getChapterChildInfo();
        },
        components:{chapter_comment_file}
    }
</script>
<style type="text/scss" lang="scss">
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
                justify-content: flex-start;
                border-bottom: solid 1px $light;
                padding-bottom: 16px;
                padding-left: 16px;
                i{
                    font-size: 26px;
                    margin-right: 10px;
                }
                >div:first-child{
                    @include vertical-center;
                    cursor: pointer;
                }
                >div:last-child{
                    font-size: 16px;
                    margin-left: 20px;
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
