<template>
    <div class="personal-center">
        <teach-head :nickName="nickName" :headSrcLink="headSrcLink" :show_hide_vis="show_hide_vis" ></teach-head>
        <div class="content">
            <div class="content-top">
                <div class="top-l">
                    <div class="head-img">
                        <img src="" alt="">
                    </div>
                    <div class="personal-info">
                        <span>男</span>
                        <span>tog ...</span>
                    </div>
                </div>
                <div class="top-r">
                    2
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
                nickName:'tog',
                headSrcLink:require('@/assets/images/dogHead.jpg'),
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
