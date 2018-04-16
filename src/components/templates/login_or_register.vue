<template>
    <div class="login-or-register-f">
        <el-dialog :title="$state.maskType == 'login'?'登录':'注册'" :visible.sync="$state.isShowLoginMask" width="30%" center class="login-or-register">

            <el-tabs v-model="maskTitleName" @tab-click="loginTitleClick()">
                <el-tab-pane label="登录" name="login">
                    <div class="mask-login">
                        <el-input v-model="user_name" placeholder="请输入用户名"></el-input>
                        <el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
                        <!--<el-button @click="checkUserInfo()" type="primary">登录</el-button>-->
                    </div>
                </el-tab-pane>
                <el-tab-pane label="注册" name="register">
                    <div class="mask-register">

                    </div>
                </el-tab-pane>
            </el-tabs>
            <div><el-button type="danger" round>登录</el-button></div>
            <!--<el-button @click="closeLoginMask()">取 消</el-button>
            <el-button type="primary" @click="maskSure()">确 定</el-button>-->

        </el-dialog>
    </div>

</template>
<script>
    import { mapMutations } from 'vuex'
    export default {
        name: '',
        data(){
            return{
                nickName:'login-or-register-f',
                user_name:'',
                password:'',
                //css
                show_hide_vis:'show-vis',
                maskTitleName:'login'
            }
        },
        methods:{
            ...mapMutations({
                setLoginMaskState: 'setLoginMask'
            }),
            closeLoginMask(){
                this.$state.isShowLoginMask = false;
            },
            maskSure(){
                this.$state.isShowLoginMask = false;
            },
            loginTitleClick(){

            }
        },
        created(){
            this.maskTitleName = this.$state.maskType;
        }
    }
</script>
<style  lang="scss" type="text/scss">
    .login-or-register-f{
        .el-dialog{
            width: 360px!important;
        }
        .el-dialog__header{
            display: none;
        }
        .el-tabs__nav-scroll{
            #tab-login{
                font-size: 16px!important;
            }
            #tab-register{
                @extend #tab-login;
            }
            /*#pane-login{
                border: solid red;
            }
            #pane-register{

            }*/
        }
        .mask-login{
            padding-bottom: 30px;
            .el-input{
              margin-top: 15px;
            }
            .el-button{

            }
        }
        .mask-register{

        }
    }
</style>
