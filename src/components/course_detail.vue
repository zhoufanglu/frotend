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
                <chapter_comment_file @transferCourse="getCourseInfoFromChapter"></chapter_comment_file>
            </div>
        </div>
        <teach-foot></teach-foot>
    </div>
</template>
<script>
    import chapter_comment_file from '../components/templates/chapter_comment_file.vue'
    export default {
        name: '',
        data(){
            return{
                nickName:'tog',
                headSrcLink:require('@/assets/images/dogHead.jpg'),
                //css
                show_hide_vis:'show-vis',
                course: {
                    id: this.$route.params.course_id,
                },
            }
        },
        methods: {
            getCourseInfoFromChapter(data){
                this.course = data;
            }
        },
        created(){

        },
        components:{chapter_comment_file},
    }
</script>
<style type="text/scss" lang="scss">
    @import "~@/assets/scss/page/course_detail.scss";
</style>
