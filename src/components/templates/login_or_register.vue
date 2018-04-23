<template>
    <div class="login-or-register-f" v-show="$state.isShowLoginMask">
        <el-dialog :title="$state.maskType == 'login'?'登录':'注册'" :visible.sync="$state.isShowLoginMask" width="30%" center class="login-or-register">
            <el-tabs v-model="$state.maskType" @tab-click="loginTitleClick()">
                <el-tab-pane label="登录" name="login">
                    <div class="mask-login">
                        <el-input v-model="user_name" placeholder="请输入用户名"></el-input>
                        <el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
                        <!--<el-button @click="checkUserInfo()" type="primary">登录</el-button>-->
                    </div>
                </el-tab-pane>
                <el-tab-pane label="注册" name="register">
                    <div class="mask-register">
                        <el-input v-model="r_user_name"  placeholder="请输入注册邮箱，昵称"><i slot="suffix" class="icon-font el-input__icon">&#xe6b3;</i></el-input>
                        <el-input type="password" v-model="r_password" placeholder="密码长度为8-16个字符,不能使用中文、空格"><i slot="suffix" class="icon-font el-input__icon">&#xe625;</i><</el-input>
                        <el-input type="password" v-model="r_check_password" placeholder="请再次输入密码"><i style="font-size: 22px" slot="suffix" class="icon-font el-input__icon">&#xe69e;</i></el-input>
                        <div class="code-panel">
                            <el-input  v-model="code" placeholder="请输入验证码"></el-input>
                            <div class="code">
                                <img :src="$imgPath+'/user/captcha/1'" alt="" width="100%" height="100%">
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <div class="login-btn">
                <el-button v-if="$state.maskType=='login'" type="danger" round @click="login()">登录</el-button>
                <el-button v-if="$state.maskType=='register'" type="danger" round @click="register()">注册</el-button>
            </div>
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
                maskTitleName:'login',
                //register
                r_user_name:'',
                r_password:'',
                r_check_password:'',
                code:'',
                code_img:''
            }
        },
        methods:{
            ...mapMutations({
                setLoginMaskState: 'setLoginMask',
                setIsShowLoginMask:'setIsShowLoginMask',
                setLoginState:'setLoginState',
                setUserInfo:'setUserInfo'
            }),
            login(){
                let postData = {
                    user_name:this.user_name,
                    user_password:this.password
                };
                if(postData.user_name === "" || postData.user_password ===""){
                    this.$message.error('用户名和密码不能为空！');
                    return false;
                }
                //http://111.230.100.91/teachep/public/user/login
                ///User/login
                this.$post('/user/login',postData).then((response) => {
                    console.log(73,response);
                    if(response.state === 'success'){
                        let user_data = response.user_info;
                        this.$message.success('登录成功！');
                        this.setIsShowLoginMask(false);
                        //设置登录状态
                        this.setLoginState(true);
                        console.log(user_data.id,user_data.user_name);
                        this.setUserInfo(
                            user_data
                        );
                    }else{
                        this.$message.error('用户名或密码错误！');
                    }
                })
                    .catch(err =>{
                        console.log(89,err);
                    });
            },
            register(){
                let flag = this.checkRegisterUserInfo();
                if(flag === true){
                    //sendAjax
                    let post_data = {
                        user_name:this.r_user_name,
                        password:this.r_password,
                        code:this.code
                    };
                    this.$post('/user/register',post_data).then((response) => {
                        this.setIsShowLoginMask(false);
                        this.$message.success('注册成功！');
                    })
                        .catch(err =>{
                            console.log(err);
                        });
                }
            },
            closeLoginMask(){
                //this.$state.isShowLoginMask = false;
            },
            maskSure(){
                //this.$state.isShowLoginMask = false;
            },
            loginTitleClick(){
                /*if(this.$state.maskType === 'register')
                    this.getCode();*/
            },
            checkRegisterUserInfo(){
                let reg = /^[a-zA-Z\d\_\u2E80-\u9FFF]{0,16}$/;
                if(!reg.test(this.r_user_name) || this.r_user_name === ''){
                    this.$message.error('昵称只能使用字母、数字、下划线、汉字且长度不能超过16！');
                    return false;
                }
                let password_reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/
                if(!password_reg.test(this.r_password) || this.r_password === ''){
                    this.$message.error('密码必须由6-21字母和数字组成！');
                    return false;
                }
                if(this.r_password !== this.r_check_password){
                    this.$message.error('两次密码必须一致');
                    return false;
                }
                return true;
            },
            /*getCode(){
                this.$fetch('/user/captcha/1').then((response) => {
                    this.code_img = response;
                    //console.log(134,response);
                });
            }*/
        },
        created(){

        }
    }
</script>
<style  lang="scss" type="text/scss">
    .login-or-register-f{
        .el-dialog{
            width: 380px!important;
        }
        .el-dialog__header{
            .el-dialog__title{
                display: none;
            }
        }
        .el-dialog__body{
            margin-top: -30px;
        }
        .el-tabs__nav-scroll{
            #tab-login{
                font-size: 16px!important;
            }
            #tab-register{
                @extend #tab-login;
            }
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
            @extend .mask-login;
            .code-panel{
                margin-top: 15px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .el-input{
                    width: 70%;
                    margin-top: 0;
                }
                .code{
                    @include vertical-center;
                    height: 40px;
                }
            }
            .el-input{
                i{
                    font-size: 20px;
                }
            }
        }
        .login-btn{
            @include vertical-center;
            .el-button{
                width: 80%;
            }
        }
    }
</style>
