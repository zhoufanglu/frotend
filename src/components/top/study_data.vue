<template>
    <div class="personal-center">
        <teach-head  :show_hide_vis="show_hide_vis" ></teach-head>
        <div class="content">
            <div>学习资料</div>
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
            }
        },
        methods:{

        },
        created(){

        }
    }
</script>
<style type="text/scss" lang="scss">
    @import "~@/assets/scss/page/personal_center.scss";
</style>
