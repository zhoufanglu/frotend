<template>
    <div class="login">
        <div class="content">
            <div>
                <label for="">用户名:</label><el-input v-model="user_name" placeholder="请输入用户名"></el-input>
                <label for="">密码:</label><el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
                <el-button @click="checkUserInfo()" type="primary">登录</el-button>
                <span style="color: red">请点击登录 模拟登录</span>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapMutations } from 'vuex'
    import { mapGetters } from 'vuex'
    export default {
        name: '',
        data(){
            return{
                user_name:'',
                password:''
            }
        },
        methods:{
            ...mapMutations(['setLoginState']),
            checkUserInfo(){
                //sendAjax
                //跳转
                this.$router.push({path:'/home'});
                //改变登录状态
                this.setLoginState(true);
            }
        },
        mounted(){
            this.setLoginState(false);
            console.log(35,this.is_login);
        },
        computed:{
            ...mapGetters({
                user_info: 'getUserInfo',
                is_login: 'getLoginState'
            }),

        }
    }
</script>
<style lang="scss" scoped type="text/css">
    .login{

    }
</style>
