<template>
    <div class="home">
        <teach-head :show_hide_vis="show_hide_vis" ></teach-head>
        <div class="content">
            <div class="content-top">
                <div class="first-row">
                    <el-row>
                        <el-col :span="6">
                            <!--top左边标题-->
                            <div class="grid-content">
                                <div class="s-row" v-for="(i,index) in top_title" v-if="index < 4">
                                    <el-popover class="home-popover" placement="right"  trigger="hover" :visible-arrow="false">
                                        <div class="top-title-detail">
                                            <template v-for="j in i.couser_type_detail">
                                                <div @click="link('course',j.id,j.couser_level)">{{j.couser_type_name}}</div>
                                            </template>
                                        </div>
                                        <el-button class="left-title"   :open-delay="0" slot="reference">{{i.couser_type_name}}<i class="el-icon-arrow-right"></i></el-button>
                                    </el-popover>
                                </div>
                            </div>
                        </el-col>
                        <!--轮播-->
                        <el-col :span="18">
                            <div class="grid-content">
                                <div class="shuffling">
                                    <el-carousel>
                                        <el-carousel-item v-for="(item,index) in shuffling_img_link" :key="index">
                                            <img @click="link(item.picture_href)" :src="$imgPath+item.picture_address" alt="" height="100%" width="100%">
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
            <div class="content-panel">
                <div class="title">
                    <div><i class="icon-font">&#xe618;</i>{{module[0]&&module[0].name}}</div>
                    <div @click="link('course')">···</div>
                </div>
                <div content="body">
                    <el-row class="course-row" :gutter="40" justify="center">
                        <el-col :span="4" v-for="(j,index) in course_one" :key="index">
                            <router-link :to="{name:'course_detail', params:{course_id:j.id}}" class="grid-content course-item bg-purple" >
                                <div class="bg-img">
                                    <img :src="$imgPath+j.course_img" alt="" width="100%" height="100%">
                                    <div class="course-type">
                                        <span :title="k" v-for="k in j.course_type">{{k}}</span>
                                    </div>
                                </div>
                                <div class="name">{{j.course_name}}</div>
                                <div class="small-item">
                                    <span>{{j.course_difficult}}</span><i class="icon-font">&#xe623;</i>{{j.course_learn_people}}
                                </div>
                            </router-link>
                        </el-col>
                    </el-row>
                </div>
            </div>

            <div class="content-panel">
                <div class="title">
                    <div><i class="icon-font">&#xe618;</i>{{module[1]&&module[1].name}}</div>
                    <div @click="link('course_center')">···</div>
                </div>
                <div content="body">
                    <el-row class="course-row" :gutter="40" justify="center">
                        <el-col :span="4" v-for="(j,index) in course_two" :key="index">
                            <router-link :to="{name:'course_detail',params:{course_id:j.id}}" class="grid-content course-item bg-purple" >
                                <div class="bg-img">
                                    <img :src="$imgPath+j.course_img" alt="" width="100%" height="100%">
                                    <div class="course-type">
                                        <span :title="k" v-for="k in j.course_type">{{k}}</span>
                                    </div>
                                </div>
                                <div class="name">{{j.course_name}}</div>
                                <div class="small-item">
                                    <span>{{j.course_difficult}}</span><i class="icon-font">&#xe623;</i>{{j.course_learn_people}}
                                </div>
                            </router-link>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <teach-foot :bg_color="bg_color" :text_color="text_color" ></teach-foot>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                nickName:'tog',
                headSrcLink:require('@/assets/images/dogHead.jpg'),
                headSrcLink2:require('@/assets/images/14岁程序员.jpg'),
                //css
                show_hide_vis:'show-vis',
                /*bg_color:'fn-bg-white',
                text_color:'fn-color-black',*/
                //content-top
                //content-panel
                top_title:[],             //轮播左边的标题
                shuffling_img_link:[],    //轮播图
                module:[],                //一级课题标题
                course_one:[],            //课程信息
                course_two:[]             //课程信息
            }
        },
        components: {

        },
        methods:{
            getCourse(){
                //http://111.230.100.91/teachep/public/indexRotation
                this.$fetch('/indexRotation')
                    .then((response) => {
                        this.course_one = response.course_one;
                        this.course_two = response.course_two;
                        this.shuffling_img_link = response.shuffling_img_link;
                        this.module = response.module;
                        this.top_title = response.top_title;
                        console.log(response);
                    })
                    .catch(err =>{
                        console.log(err);
                    });
                /*this.$fetch('http://111.230.100.91/teachep/public/indexRotation').then((res)=>{
                    console.log(144,res);
                })
                    .catch(err =>{
                        console.log(147,err);
                    })*/
            },
            link(url_name,couser_level_id,couser_level_name){
                if(couser_level_id === undefined){
                    this.$router.push('/'+url_name+'');
                }else{
                    this.$router.push({
                        path: '/'+url_name+'',
                        name: 'course',
                        params: {
                            couser_level_id:couser_level_id,
                            couser_level_name:couser_level_name,
                        }
                    })
                }

            },

        },
        created() {
            this.getCourse();  //获取课程信息
        }
    }
</script>
<style  type="text/scss" lang="scss">
    @import "~@/assets/scss/page/home.scss";
</style>
