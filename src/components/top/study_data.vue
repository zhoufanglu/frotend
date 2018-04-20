<template>
    <div class="personal-center">
        <teach-head  :show_hide_vis="show_hide_vis" ></teach-head>
        <div class="content">
            <div class="content-l">
                <div class="filter-title">
                    <div>
                        <el-radio-group v-model="filter_type">
                            <el-radio-button label="1">安全意识</el-radio-button>
                            <el-radio-button label="2">职业技能</el-radio-button>
                        </el-radio-group>
                    </div>
                </div>
                <div class="study-data">
                    <el-row class="row">
                        <el-col :span="8">
                            <img src="" alt="">
                        </el-col>
                        <el-col :span="16">
                            <div class="data-r">
                                <div>title</div>
                                <div>
                                    <div class="name"><i class="icon-font">&#xe6b3;</i>名字</div>
                                    <div class="time"><i class="icon-font">&#xe78b;</i>2018-4-18 12:30:16</div>
                                </div>
                                <div>CVE-2017-12542是一个CVSS 9.8的高分漏洞，漏洞利用条件简单，危害较大。近十年来，iLO是几乎所有惠普服务器中都嵌入的服务器管理解决方案。</div>
                                <div class="type-and-comment">
                                    <div class="type">
                                        <div>web安全</div>
                                        <div>漏洞</div>
                                    </div>
                                    <div class="comment">
                                        <span>x次查看</span>
                                        <span>x次评论</span>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="content-r">
                <div class="hot-recommended">
                    <div class="head">
                        热门推荐
                    </div>
                    <div class="body">
                        <div class="row">
                            <div>index</div>
                            <div>内容</div>
                            <!--<router-link class="remove-a-css">内容</router-link>-->
                        </div>
                    </div>
                </div>

                <div class="last-comment">
                    <div class="head">
                        最新评论
                    </div>
                    <div class="body">
                        <div class="row">
                            <div class="head-img">头像</div>
                            <div class="person-info">
                                <span>name</span>
                                <span>内容</span>
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
                filter_type:'1'
            }
        },
        methods:{

        },
        created(){

        }
    }
</script>
<style scoped type="text/scss" lang="scss">
    @import "~@/assets/scss/page/study_data.scss";
</style>
<style type="text/scss" lang="scss">
    .filter-title{
    .el-radio-group{
    .el-radio-button:first-child{
        margin-right: 60px;
    }
    .el-radio-button__inner{
        border: solid 1px $stable;
        border-radius: 0;
        width: 100px;
    }
    }
    }
</style>
