<template>
    <div class="home">
        <teach-head :nickName="nickName" :headSrcLink="headSrcLink" :show_hide_vis="show_hide_vis" :bg_color="bg_color" :text_color="text_color"></teach-head>
        <div class="content">
            <div class="content-top">
                <div class="first-row">
                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content">
                                <div class="s-row">
                                    <el-popover class="show-panel"  :visible-arrow="false" trigger="hover" ref="popover1" placement="right" @show="isHover1=true" @hide="isHover1=false" >
                                        <div>内容1</div>
                                    </el-popover>
                                    <el-button :open-delay="0" v-popover:popover1 class="left-title" :class="{hover:isHover1}">{{top_title[0]}}<i class="el-icon-arrow-right"></i></el-button>
                                </div>
                                <div class="s-row">
                                    <el-popover class="show-panel"  :visible-arrow="false" trigger="hover" ref="popover2" placement="right" @show="isHover2=true" @hide="isHover2=false" >
                                        <div>内容2</div>
                                    </el-popover>
                                    <el-button :open-delay="0" v-popover:popover2 class="left-title" :class="{hover:isHover2}">{{top_title[1]}}<i class="el-icon-arrow-right"></i></el-button>
                                </div>
                                <div class="s-row">
                                    <el-popover class="show-panel"  :visible-arrow="false" trigger="hover" ref="popover3" placement="right" @show="isHover3=true" @hide="isHover3=false" >
                                        <div>内容3</div>
                                    </el-popover>
                                    <el-button :open-delay="0" v-popover:popover3 class="left-title" :class="{hover:isHover3}">{{top_title[2]}}<i class="el-icon-arrow-right"></i></el-button>
                                </div>
                                <div class="s-row">
                                    <el-popover class="show-panel"  :visible-arrow="false" trigger="hover" ref="popover4" placement="right" @show="isHover4=true" @hide="isHover4=false" >
                                        <div>内容4</div>
                                    </el-popover>
                                    <el-button :open-delay="0" v-popover:popover4 class="left-title" :class="{hover4:isHover4}">{{top_title[3]}}<i class="el-icon-arrow-right"></i></el-button>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="18">
                            <div class="grid-content">
                                <div class="shuffling">
                                    <el-carousel>
                                        <el-carousel-item v-for="item in shuffling_img_link" :key="item">
                                            <img :src="item" alt="" height="100%" width="100%">
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
                <div class="title">{{module[0].name}}</div>
                <div content="body">
                    <el-row class="course-row" :gutter="40" justify="center">
                        <el-col :span="4" v-for="(j,index) in course_one" :key="index">
                            <a class="grid-content course-item bg-purple">
                                <div class="bg-img">
                                    <img :src="j.img" alt="" width="100%" height="100%">
                                    <div class="course-type">
                                        <span v-for="k in j.type">{{k}}</span>
                                    </div>
                                </div>
                                <div class="name">{{j.name}}</div>
                                <div class="small-item">
                                    <span>{{j.difficult}}</span><span>{{j.introduction}}</span><i class="icon-font">&#xe623;</i>{{j.learn_people}}
                                </div>
                            </a>
                        </el-col>
                    </el-row>
                </div>
            </div>

            <div class="content-panel">
                <div class="title">{{module[0].name}}</div>
                <div content="body">
                    <el-row class="course-row" :gutter="40" justify="center" >
                        <el-col :span="4" v-for="(j,index) in course_two" :key="index">
                            <a class="grid-content course-item bg-purple">
                                <!--背景图片-->
                                <div class="bg-img">
                                    <img :src="j.img" alt="" width="100%" height="100%">
                                    <div class="course-type">
                                        <span v-for="k in j.type">{{k}}</span>
                                    </div>
                                </div>
                                <div class="name">{{j.name}}</div>
                                <div class="small-item">
                                    <span>{{j.difficult}}</span><span>{{j.introduction}}</span><i class="icon-font">&#xe623;</i>{{j.learn_people}}
                                </div>
                            </a>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <teach-foot></teach-foot>
    </div>
</template>

<script>
    import '@/assets/scss/page/home.scss';
    export default {
        data() {
            return {
                nickName:'tog',
                headSrcLink:require('@/assets/images/dogHead.jpg'),
                headSrcLink2:require('@/assets/images/14岁程序员.jpg'),
                //css
                show_hide_vis:'hide-vis',
                bg_color:'fn-bg-white',
                text_color:'fn-color-black',
                //content-top
                isHover1:false,
                isHover2:false,
                isHover3:false,
                isHover4:false,
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
                this.$post('/api/data')
                    .then((response) => {
                        this.course_one = response.course_one;
                        this.course_two = response.course_two;
                        this.shuffling_img_link = response.shuffling_img_link;
                        this.module = response.module;
                        this.top_title = response.top_title;
                        console.log(response);
                    })
                    .catch(error =>{
                        console.log(err);
                    });
            }
        },
        created() {
            this.getCourse();  //获取课程信息
        }
    }
</script>
