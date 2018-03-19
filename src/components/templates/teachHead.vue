<template>
    <div class="teach-head" :class="bg_color" >
        <div class="name">
            <router-link class="remove-a-css" to="/home" :class="text_color">教学管理系统</router-link>
        </div>
        <div class="is-show-head" :class="show_hide_vis">
            <span><router-link class="remove-a-css" to="/course_center">课程中心</router-link></span>
            <span><router-link class="remove-a-css" to="/find">发现</router-link></span>
            <span><router-link class="remove-a-css" to="/help">帮助</router-link></span>
            <el-input class="head-search"
                    placeholder="搜索"
                    prefix-icon="el-icon-search"
                    v-model="head_search">
            </el-input>
        </div>
        <div class="user-info">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                     <span class="head-img">
                         <img :src="headSrcLink" alt="" width="100%" height="100%">
                     </span>
                     <span class="nick-name" :class="text_color">{{nickName}}</span>
                  </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>注销</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    export default {
        name: "teachHead",
        props:['nickName','headSrcLink','head_search','show_hide_vis','bg_color','text_color']
    }
</script>

<style scoped lang="scss" type="text/scss">
    .teach-head{
        background-color: $theme;
        color: $white;
       @include vertical-center;
        justify-content: space-between;
        padding: 0 40px;
        height: $head-height;
        border-bottom: solid 1px $stable;
        .is-show-head{
            @include vertical-center;
            justify-content: space-between;
            width: 40%;
            height: 100%;
            padding: 0 10px;
            @extend .name;
            span{
                @include vertical-center;
                height: 100%;
            }
            a{
                @include vertical-center;
                height: 100%;
                width: 100%;
                text-decoration: none;
                cursor: $white;
                padding: 0 10px;
                &:hover{
                    color: $theme!important;
                    background-color: $white;
                }
                &:visited{
                    color: $white;
                }
            }
            .head-search{
                width: 50%;
            }
        }
        .name{
            font-size: 24px;
            font-weight: bolder;
            letter-spacing: 6px;
            a{
                text-decoration: none;
                cursor: $white;
                &:visited{
                    color: $white;
                }
            }
        }
    }
    .el-dropdown-link{
        @include vertical-center;
        &:hover{
            cursor: pointer;
        }
        .nick-name{
            color: $white;
            font-size: 20px;
        }
        .head-img{
            overflow: hidden;
            display: flex;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 20px;
        }
    }
</style>
