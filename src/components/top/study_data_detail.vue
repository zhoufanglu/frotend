<template>
    <div class="study-data-detail">
        <teach-head :show_hide_vis="show_hide_vis" ></teach-head>
        <div class="content">
            <div>学习详情</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'study-data-detail-center',
        data(){
            return{
                //css
                show_hide_vis:'show-vis',
                study_data_id:this.$route.query.id
            }
        },
        methods:{

        },
        created(){

        }
    }
</script>
<style type="text/scss" lang="scss">

</style>
