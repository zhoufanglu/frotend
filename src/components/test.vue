<template>
    <div class="test">
        <div class="bg bg-blur"></div>
        <div class="content content-front">我是内容</div>
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
<style scoped type="text/scss" lang="scss">
    .test{
        .content {
            color: #ffffff;
            font-size: 40px;
        }
        .bg {
            background: url('../assets/images/gaosimohu.jpg');
            //background-color: #172a34;
            height:600px;
            text-align: center;
            line-height: 600px;
        }
        .bg-blur {
            float: left;
            width: 100%;
           /* background-repeat: no-repeat;
            background-position: center;
            background-size: cover;*/
            /*-webkit-filter: blur(15px);
            -moz-filter: blur(15px);
            -o-filter: blur(15px);
            -ms-filter: blur(15px);*/
            //filter: blur(4px);
        }
        .content-front {
            position:absolute;
            left: 10px;
            right: 10px;
            height:600px;
            line-height: 600px;
            text-align: center;
        }
    }
</style>
