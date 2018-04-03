<template>
    <div class="teach-head" :class="bg_color" >
        <div class="name">
            <router-link class="remove-a-css" to="/home" :class="text_color">教学管理系统</router-link>
        </div>
        <div class="is-show-head" :class="show_hide_vis">
            <span><router-link class="remove-a-css no-warp" to="/course_center">课程中心</router-link></span>
            <span><router-link class="remove-a-css no-warp" to="/find">发现</router-link></span>
            <span><router-link class="remove-a-css no-warp" to="/help">帮助</router-link></span>
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
                     <span class="nick-name" :class="text_color">{{user_info.nick_name}}</span>
                  </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><router-link to="/personal_center" class="remove-a-css-darker">个人中心</router-link></el-dropdown-item>
                    <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { mapMutations } from 'vuex'
    export default {
        name: "teachHead",
        props:['nickName','headSrcLink','head_search','show_hide_vis','bg_color','text_color'],
        computed:{
            ...mapGetters({
                user_info: 'getUserInfo',
                is_login: 'getLoginState'
            }),

        },
        methods:{
            ...mapMutations({
                setUserInfo: 'setUserInfo',
                setLoginState: 'setLoginState'
            }),
            logout(){
                this.setLoginState(false);
                this.$router.push({path:'/login'})
            },
            checkIsLogin(){
                this.setLoginState(JSON.parse(window.localStorage.getItem('is_login')));
                console.log(43,this.user_info,this.is_login);
                if(this.is_login === false){
                    console.log('666');
                    this._alert({
                        title :'提示',
                        msg : '你还未登录,请先登录',
                        type : 'warning',
                        confirm:()=>{
                            console.log('xxx');
                            this.$router.push({path:'/login'})
                        }
                    });
                }
            }
        },
        mounted(){
            this.checkIsLogin();
        }
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
