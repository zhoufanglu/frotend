<template>
    <div class="course_detail">
        <teach-head :nickName="nickName" :headSrcLink="headSrcLink" :show_hide_vis="show_hide_vis" ></teach-head>
        <div>
            <div class="content">
                <div class="content-top">
                    章节内容
                </div>
                <chapter_comment_file></chapter_comment_file>
        </div>
        </div>
        <teach-foot></teach-foot>
    </div>
</template>
<script>
    import chapter_comment_file from '../components/templates/chapter_comment_file.vue'
    export default {
        name: '',
        data(){
            return{
                nickName:'tog',
                headSrcLink:require('@/assets/images/dogHead.jpg'),
                //css
                show_hide_vis:'show-vis',
            }
        },
        methods: {},
        components:{chapter_comment_file}
    }
</script>
<style type="text/scss" lang="scss">
    @import "~@/assets/scss/page/course_detail.scss";
</style>
