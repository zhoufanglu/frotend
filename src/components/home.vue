<template>
    <div class="home">
        <teach-head :nickName="nickName" :headSrcLink="headSrcLink"></teach-head>
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
                                    <el-button :open-delay="0" v-popover:popover1 class="left-title" :class="{hover:isHover1}">渗透测试1<i class="el-icon-arrow-right"></i></el-button>
                                </div>
                                <div class="s-row">
                                    <el-popover class="show-panel"  :visible-arrow="false" trigger="hover" ref="popover2" placement="right" @show="isHover2=true" @hide="isHover2=false" >
                                        <div>内容2</div>
                                    </el-popover>
                                    <el-button :open-delay="0" v-popover:popover2 class="left-title" :class="{hover:isHover2}">渗透测试2<i class="el-icon-arrow-right"></i></el-button>
                                </div>
                                <div class="s-row">
                                    <el-popover class="show-panel"  :visible-arrow="false" trigger="hover" ref="popover3" placement="right" @show="isHover3=true" @hide="isHover3=false" >
                                        <div>内容3</div>
                                    </el-popover>
                                    <el-button :open-delay="0" v-popover:popover3 class="left-title" :class="{hover:isHover3}">渗透测试3<i class="el-icon-arrow-right"></i></el-button>
                                </div>
                                <div class="s-row">
                                    <el-popover class="show-panel"  :visible-arrow="false" trigger="hover" ref="popover4" placement="right" @show="isHover4=true" @hide="isHover4=false" >
                                        <div>内容4</div>
                                    </el-popover>
                                    <el-button :open-delay="0" v-popover:popover4 class="left-title" :class="{hover4:isHover4}">渗透测试4<i class="el-icon-arrow-right"></i></el-button>
                                </div>
                            </div>
                        </el-col>
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
            <div class="content-panel">
                <div class="title">{{lessonTitle}}</div>
                <div content="body">
                    <el-row class="lesson-row" :gutter="40"type="flex" justify="center" v-for="(i,index) in lessons" :key="index" >
                        <el-col :span="4" v-for="(j,index) in i.lesson" :key="index">
                            <a class="grid-content lesson-item bg-purple">
                                <!--背景图片-->
                                <div class="bg-img">
                                    <img :src="headSrcLink2" alt="" width="100%" height="100%">
                                    <div class="lesson-type">{{j.type}}</div>
                                </div>
                                <div class="name">{{j.name}}</div>
                                <div class="small-item">
                                    <span>{{j.level}}</span><span>{{j.type}}</span><i class="icon-font">&#xe623;</i>{{j.number}}
                                </div>
                            </a>
                        </el-col>
                    </el-row>
                </div>
            </div>

            <div class="content-panel">
                <div class="title">{{lessonTitle}}</div>
                <div content="body">
                    <el-row class="lesson-row" :gutter="40"type="flex" justify="center" v-for="(i,index) in lessons" :key="index" >
                        <el-col :span="4" v-for="(j,index) in i.lesson" :key="index">
                            <a class="grid-content lesson-item bg-purple">
                                <!--背景图片-->
                                <div class="bg-img">
                                    <img :src="headSrcLink2" alt="" width="100%" height="100%">
                                    <div class="lesson-type">{{j.type}}</div>
                                </div>
                                <div class="name">{{j.name}}</div>
                                <div class="small-item">
                                    <span>{{j.level}}</span><span>{{j.introduction}}</span><i class="icon-font">&#xe623;</i>{{j.number}}
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
                //content-top
                isHover1:false,
                isHover2:false,
                isHover3:false,
                isHover4:false,
                //content-panel
                lessonTitle:'类别标题',
                lessons:[
                    {
                        lesson:[
                            {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666'},
                            {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666'},
                            {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666'},
                            {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666'},
                            {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666'},
                            {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666'},
                        ]
                    },
                    {
                        lesson:[
                            {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666'},
                            {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666'},
                            {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666'},
                            {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666'},
                            {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666'},
                            {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666'},
                        ]
                    },
                ]
            }
        },
        components: {
        
        },
        methods:{

        },
        created() {
            console.log(122,this.lessons);
            /*this.$http.get('/api/cc/json/mobile_tel_segment.htm?tel=18551235280')
                .then( response => {
                    console.log(148,response);
                })
                .catch( err => {
                    console.log(err);
                });*/
            this.$http.post(
                '/api/data',
                {
                    params:{

                    }
                })
                .then(function (data) {
                    console.log(58,data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
</script>
