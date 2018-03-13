<template>
    <div class="home">
        <teach-head :nickName="nickName" :headSrcLink="headSrcLink"></teach-head>
        <div class="content">
            <div class="content-top">
                <div class="first-row">
                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content">
                                <div class="s-row">渗透测试 <i class="el-icon-arrow-right"></i></div>
                                <div class="s-row">渗透测试 <i class="el-icon-arrow-right"></i></div>
                                <div class="s-row">渗透测试 <i class="el-icon-arrow-right"></i></div>
                                <div class="s-row">渗透测试 <i class="el-icon-arrow-right"></i></div>
                            </div></el-col>
                        <el-col :span="18">
                            <div class="grid-content">
                                <div class="shuffling">
                                    <el-carousel>
                                        <el-carousel-item v-for="item in 4" :key="item">
                                            <img :src="headSrcLink" alt="" height="100%" width="100%">
                                            <div>{{ item }}</div>
                                        </el-carousel-item>
                                    </el-carousel>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '@/assets/scss/page/home.scss';
    export default {
        data() {
            return {
                nickName:'tog',
                headSrcLink:require('@/assets/images/dogHead.jpg')
            }
        },
        components: {
        
        },
        created() {
            console.log()
        }
    }
</script>
