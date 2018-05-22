<template>
    <div class="teach-head" :class="bg_color" >
        <div class="name">
            <router-link class="remove-a-css home-name" to="/home" :class="text_color">教学管理系统</router-link>
        </div>
        <div class="is-show-head" :class="show_hide_vis">
            <span><router-link class="remove-a-css no-warp" to="/course">课程中心</router-link></span>
            <span><router-link class="remove-a-css no-warp" to="/study_data">学习资料</router-link></span>
            <span><router-link class="remove-a-css no-warp" to="/user_rank">排行榜</router-link></span>
            <el-input class="head-search"
                    placeholder="搜索课程,按回车搜索"
                    prefix-icon="el-icon-search"
                    @keyup.enter.native="searchCourse()"
                    v-model="s_course_name">
            </el-input>
            <!--@blur="searchCourse()"-->
        </div>
        <div class="user-info">
            <el-dropdown trigger="click" v-if="user_info.is_login == true">
                <span class="el-dropdown-link">
                     <span class="head-img">
                         <img :src="$imgPath+$state.user.head_img" alt="" width="100%" height="100%">
                     </span>
                     <span class="nick-name" :class="text_color">{{user_info.nick_name}}</span>
                  </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><router-link to="/personal_center" class="remove-a-css-darker">个人中心</router-link></el-dropdown-item>
                    <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div v-else  class="login-or-register-btn">
                <el-button type="text" @click="showLoginMask('login')">
                    <span class="login-open-mask remove-a-css" :class="text_color">登录</span>
                </el-button>
                <el-button type="text" @click="showLoginMask('register')">
                    <span class="register-open-mask remove-a-css" :class="text_color">/&nbsp;&nbsp;&nbsp;&nbsp;注册</span>
                </el-button>
            </div>
        </div>
        <login-or-register></login-or-register>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    export default {
        name: "teachHead",
        props:['show_hide_vis','bg_color','text_color'],
        data(){
            return{
                user_info:'',
                s_course_name:''
            }
        },
        computed:{
        },
        methods:{
            ...mapMutations({
                setUserInfo: 'setUserInfo',
                setLoginState: 'setLoginState',
                setIsShowLoginMask: 'setIsShowLoginMask',
                setMaskType:'setMaskType'
            }),
            logout(){
                this.setLoginState(false);
                this.user_info.is_login = false;
                let user_data = {
                    id:'',
                    user_name:'',
                    user_data:''
                };
                this.setUserInfo(user_data);
                this.$message.success('注销成功！');
                this.$router.push({path:'/home'});
            },
            checkIsLogin(){
                let is_login = this.$state.user.is_login;
                this.user_info = this.$state.user;
                if(is_login === false){
                    /*this._message("登录过期，请重新登录",{
                        type : "warning"
                    });*/
                    console.log("登录过期，请重新登录");
                    //this.$router.push({path:'/login'});
                }
            },
            showLoginMask(type){
                this.setIsShowLoginMask(true);
                this.setMaskType(type);
            },
            searchCourse(){
                if(this.$route.name !== 'course' && this.s_course_name!==''){
                    this.$router.push('/course');
                }
                this.$emit('transferSearchCourse',this.s_course_name);
            }
        },
        mounted(){
            this.checkIsLogin();
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    .teach-head{
        .home-name{
            color: white!important;
            background-color: #0D0206;
        }
        background-color: #0D0206;
        color: $white;
       @include vertical-center;
        justify-content: space-between;
        padding: 0 40px;
        height: $head-height;
        border-bottom: none!important;
        .is-show-head{
            @include vertical-center;
            justify-content: space-between;
            width: 40%;
            height: 100%;
            padding: 0 10px;
            .no-warp{
                white-space: nowrap;
            }
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
                min-width:200px;
                margin-left:16px;
            }
        }
        .name{
            font-size: 18px;
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
    .login-or-register-btn  span{
        font-size: 16px;
        .login-open-mask{
            &:hover{
                color: $danger;
            }
        }
        .register-open-mask{
            @extend .login-open-mask
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
    .router-link-active{
        background-color: $white;
        color: $theme!important;
    }
</style>
