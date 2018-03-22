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
                        <el-breadcrumb-item>当前课程名</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="title">
                        <div>
                            课程名称
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
        name: '',
        data(){
            return{
                nickName:'tog',
                headSrcLink:require('@/assets/images/dogHead.jpg'),
                //css
                show_hide_vis:'show-vis',
            }
        },
        created(){
            console.log(this.$route.query.id);
        }
    }
</script>
<style scope type="text/scss" lang="scss">
    @import "~@/assets/scss/page/course_detail.scss";
</style>
