<template>
    <div class="lesson-center">
        <teach-head :nickName="nickName" :headSrcLink="headSrcLink" :show_hide_vis="show_hide_vis" ></teach-head>
        这是课程中心
    </div>
</template>
<script>
    export default {
        name: '',
        data(){
            return{
                nickName:'tog',
                headSrcLink:require('@/assets/images/dogHead.jpg'),
                //css
                show_hide_vis:'show-vis',
            }
        }
    }
</script>
<style>
</style>
