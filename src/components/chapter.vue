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
                                    <div v-if="chapter_child.image_text_type === 1">
                                        这是一张图片
                                    </div>
                                    <div v-if="chapter_child.image_text_type === 2">
                                        <!--<video src="../assets/video/vue-2-power-model.mp4" style="width: 100%" controls="controls">
                                            您的浏览器不支持 video 标签。
                                        </video>
                                        <video :src="$imgPath+chapter_child.image_text_video" style="width: 100%" controls="controls">
                                            您的浏览器不支持 video 标签。
                                        </video>-->
                                        <video-player  class="video-player vjs-custom-skin"
                                                       ref="videoPlayer"
                                                       :playsinline="true"
                                                       :options="playerOptions"
                                        ></video-player>

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
                playerOptions : {
                    playbackRates: [1.0], //播放速度
                    autoplay: false, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                        type: "",
                        src: "../assets/video/vue-2-power-model.mp4" //url地址
                    }],
                    //poster: "../../static/images/test.jpg", //你的封面地址
                    width: document.documentElement.clientWidth,
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true  //全屏按钮
                    }
                }
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
                        //如果是视频 就给赋值
                        if(this.chapter_child.image_text_type === 2){
                            this.playerOptions.sources[0].src = this.$imgPath + this.chapter_child.image_text_video;
                            console.log(111,this.playerOptions.sources[0].src);
                        }
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
                    padding-top: 16px;
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
<style type="text/scss" lang="scss">
    .el-tabs__header{
        border: none!important;
    }
</style>
