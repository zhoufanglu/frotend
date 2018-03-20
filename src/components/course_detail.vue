<template>
    <div class="course_detail">这是页面详情页</div>
</template>
<script>
    export default {
        name: '',
        data(){
            return{
                /*nickName:'tog',
                headSrcLink:require('@/assets/images/dogHead.jpg'),
                //css
                show_hide_vis:'show-vis',*/
            }
        },
        created(){
            console.log(this.$route.query.id);
        }
    }
</script>
<style>
</style>
