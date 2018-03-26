<template>
    <div class="course">
        <teach-head :nickName="nickName" :headSrcLink="headSrcLink" :show_hide_vis="show_hide_vis" ></teach-head>
        <div class="content">
            <!--筛选部分-->
            <div class="content-head">
                <el-radio-group v-model="filter.direction" @change="getCourse()">
                    <el-radio-button  :disabled="true" class="item-title" label="方向"></el-radio-button>
                    <el-radio-button class="item" label="">全部</el-radio-button>
                    <el-radio-button class="item" v-for="i in types.direction" :key="i.id" :label="i.id">{{i.name+i.id}}</el-radio-button>
                </el-radio-group>
                <el-radio-group v-model="filter.classify" @change="getCourse()">
                    <el-radio-button :disabled="true" class="item-title" label="分类:"></el-radio-button>
                    <el-radio-button class="item" label="">全部</el-radio-button>
                    <el-radio-button class="item" v-for="i in types.classify" :key="i.id" :label="i.id">{{i.name+i.id}}</el-radio-button>
                </el-radio-group>
                <el-radio-group v-model="filter.type" @change="getCourse()">
                    <el-radio-button :disabled="true" class="item-title" label="类型:"></el-radio-button>
                    <el-radio-button class="item" label="">全部</el-radio-button>
                    <el-radio-button class="item" v-for="i in types.type" :key="i.id" :label="i.id">{{i.name}}</el-radio-button>
                </el-radio-group>
            </div>
        </div>
        <!--课程展示部分-->
        <div class="content-body">
            <div class="top">
                <div class="sort">
                    <el-radio v-model="sort" @change="getCourse()" label="1">最新</el-radio>
                    <el-radio v-model="sort" @change="getCourse()" label="2">最热</el-radio>
                </div>
                <div class="filter.difficult">
                    <el-radio @change="getCourse()" v-model="filter.difficult" label="">全部</el-radio>
                    <el-radio @change="getCourse()" v-model="filter.difficult" label="1">初级</el-radio>
                    <el-radio @change="getCourse()" v-model="filter.difficult" label="2">中级</el-radio>
                    <el-radio @change="getCourse()" v-model="filter.difficult" label="3">高级</el-radio>
                </div>
            </div>
            <div class="panel">
                    <el-row class="course-row s-course-panel" :gutter="40" justify="center">
                        <el-col :span="4" v-for="(j,index) in course" :key="index">
                            <router-link :to="{path:'/course_detail', query:{id:j.id}}" class="grid-content course-item bg-purple" >
                                <div class="bg-img">
                                    <img :src="j.course_img" alt="" width="100%" height="100%">
                                    <div class="course-type">
                                        <span v-for="k in j.course_type">{{k}}</span>
                                    </div>
                                </div>
                                <div class="name">{{j.course_name}}</div>
                                <div class="small-item">
                                    <span>{{j.course_difficult}}</span><i class="icon-font">&#xe623;</i>{{j.course_learn_people}}
                                    <div class="introduction" :title="j.course_introduction">{{j.course_introduction}}</div>
                                </div>
                            </router-link>
                        </el-col>
                    </el-row>
            </div>
            <!--分页-->
            <div class="paging">
                <el-pagination background layout="prev, pager, next"@current-change="getCourse()" :page-size="page_all_num" :current-page.sync="now_page"  :total="data_number"></el-pagination>
            </div>
        </div>
        <teach-foot></teach-foot>
    </div>
</template>
<script>
    export default {
        name: 'course',
        data () {
            return{
                nickName:'tog',
                headSrcLink:require('@/assets/images/dogHead.jpg'),
                //css
                show_hide_vis:'show-vis',
                //bg_color:'fn-bg-theme'
                //content head
                types:[],
                radio3:'上海',
                filter: {
                    direction: '',
                    classify: '',
                    type: '',
                    difficult:''
                },
                sort:'1',
                //body
                course:[],
                //分页
                page_all_num:30,//一页多少数据
                now_page:1,     //当前页码
                data_number:300 //一共多少数据
            }
        },
        methods:{
            getCourseTypes(){
                this.$fetch('/api/course/course_type').then((response) => {
                    this.types = response;
                    console.log(30,response);
                })
                    .catch(err =>{
                        console.log(err);
                    });
            },
            courseTypeChange(){
                //调用接口
            },
            getCourse(){
                console.log(107,this.filter,this.sort);
                console.log(108,this.now_page);
                console.log(109,this.page_all_num);
                this.$post('/api/course/all_course')
                    .then((response) => {
                        this.course = response.course;
                        //console.log(101,response.course);
                    })
                    .catch(err =>{
                        console.log(err);
                    });
            },
        },
        created() {
            this.getCourseTypes();  //获取课程类别信息
            this.getCourse();  //获取课程类别信息
        }
    }
</script>
<style  type="text/scss" lang="scss">
    @import "~@/assets/scss/page/course.scss";
</style>
