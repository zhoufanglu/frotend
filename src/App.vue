<template>
    <div id="app">
        <router-view/>
        <teach-foot></teach-foot>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import { mapGetters } from 'vuex'
    export default {
        name: 'App',
        created(){
            //在页面加载时读取localStorage里的状态信息
            localStorage.getItem("vuex_store") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("vuex_store"))));
            //在页面刷新时将vuex里的信息保存到localStorage里
            window.addEventListener("beforeunload",()=>{
                localStorage.setItem("vuex_store",JSON.stringify(this.$store.state))
            });
            //this.$router.push({path:'/home'})
        }
    }
</script>

<style lang="scss">
    #app {
        position: relative;
        height: auto !important;
        height: 100%;
        min-height: 100%;
    }
</style>
