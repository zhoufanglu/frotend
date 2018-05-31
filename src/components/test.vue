<template>
    <div class="test">
        <div class="box-shadow top"></div>
            <div class="box-shadow right"></div>
                <div class="box-shadow bottom"></div>
                    <div class="box-shadow left"></div>
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
        .top {
            margin-top: 30px;
            margin-left: 30px;
            width: 200px;
            height: 50px;
            background: #fff;
            box-shadow:  0 2px 2px  #ddd ;
        }
        .right {
            box-shadow: 4px 0 5px -3px green;
        }
        .bottom {
            box-shadow: 0 4px 5px -3px blue;
        }
        .left {
            box-shadow: -4px 0 5px -3px orange;
        }
    }
</style>
