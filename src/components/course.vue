<template>
    <div class="course">
        <teach-head @transferSearchCourse="getCourseSearchName" :nickName="nickName" :headSrcLink="headSrcLink" :show_hide_vis="show_hide_vis" ></teach-head>
        <div class="content">
            <!--筛选部分-->
            <div class="content-head">
                <el-radio-group v-model="filter.direction" @change="getCourse()">
                    <el-radio-button  :disabled="true" class="item-title" label="方向:"></el-radio-button>
                    <el-radio-button class="item" label="">全部</el-radio-button>
                    <el-radio-button class="item" v-for="i in types.direction" :key="i.id" :label="i.id">{{i.name}}</el-radio-button>
                </el-radio-group>
                <el-radio-group v-model="filter.classify" @change="getCourse()">
                    <el-radio-button :disabled="true" class="item-title" label="分类:"></el-radio-button>
                    <el-radio-button class="item" label="">全部</el-radio-button>
                    <el-radio-button class="item" v-for="i in types.classify" :key="i.id" :label="i.id">{{i.name}}</el-radio-button>
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
                    <el-radio v-model="sort" @change="getCourse()" label="last">最新</el-radio>
                    <el-radio v-model="sort" @change="getCourse()" label="pop">最热</el-radio>
                </div>
                <div class="filter.difficult">
                    <el-radio @change="getCourse()" v-model="filter.difficult" label="">全部</el-radio>
                    <el-radio @change="getCourse()" v-model="filter.difficult" label="1">初级</el-radio>
                    <el-radio @change="getCourse()" v-model="filter.difficult" label="2">中级</el-radio>
                    <el-radio @change="getCourse()" v-model="filter.difficult" label="3">高级</el-radio>
                </div>
            </div>
            <div class="panel" v-if="isLoad">
                    <el-row class="course-row s-course-panel" :gutter="30" justify="center" v-if="course.length !== 0">
                        <el-col :span="4" v-for="(j,index) in course" :key="index">
                            <router-link :to="{name:'course_detail',params:{course_id:j.id}}" class="grid-content course-item bg-purple">
                                <div class="bg-img">
                                    <img :src="$imgPath+j.course_img" alt="" width="100%" height="100%">
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
                <template v-if="course.length === 0">
                    <no-data-panel tip="暂无课程信息"></no-data-panel>
                </template>
            </div>
            <!--分页-->
            <div class="paging">
                <el-pagination v-if="data_number !== 0" background layout="prev, pager, next"@current-change="getCourse()" :page-size="page_all_num" :current-page.sync="now_page"  :total="data_number"></el-pagination>
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
                    difficult:'',
                    name:''
                },
                sort:'last',
                //body
                course:[],
                //分页
                page_all_num:30,//一页多少数据
                now_page:1,     //当前页码
                data_number:300, //一共多少数据
                isLoad:false,
            }
        },
        methods:{
            getCourseTypes(){
                return new Promise((resolve,reject)=>{ //resolve正确的结果,reject错误的结果
                    this.$fetch('/indexCourseTypeList')
                        .then((response) => {
                            resolve(response);
                            this.types = response;
                        })
                        .catch(err =>{
                            reject(err);
                            console.log(err);
                        });
                });
            },
            getCourse(){
               let data={
                   filter_direction: this.filter.direction, //传的是id,如果为空,就是全部（方向-->一级分类）
                   filter_classify:this.filter.classify , //传的是id,如果为空,就是全部（分类-->二级级分类）
                   filter_type: this.filter.type, //传的是id,如果为空,就是全部（类型-->三级分类）
                   filter_name:this.filter.name,
                   sort:this.sort,//排序----默认是最新，最新/最热（这个最新最热数据没有这个标签）
                   hard:this.filter.difficult,//难度----默认全部(为空),分为初级，中级，高级
                   now_page:this.now_page,//当前页码
                   page_num:this.page_all_num//每页多少数据
                };
                return new Promise((resolve,reject)=>{//resolve正确的结果,reject错误的结果
                    this.$fetch('/getCourseList',data)
                        .then((response) => {
                            resolve(response);
                            this.course = response.course;
                            this.data_number = response.pageallnum;
                            this.isLoad = true;
                            //console.log(101,response.course);
                        })
                        .catch(err =>{
                            reject(err);
                        });
                });

            },
            initFilter(){
                if(this.$route.params.hasOwnProperty('couser_level_name')){
                    let filter_name = this.$route.params.couser_level_name;
                    let id = this.$route.params.couser_level_id;
                    this.filter[filter_name] = id;
                    console.log(126,this.filter);
                }
            },
            getCourseSearchName(courseName){ //搜索课程
                if(courseName !== undefined){
                    this.filter.name=courseName;
                    this.getCourse();
                }
               // console.log(143,courseName);
            }
        },
        created() {
            this.getCourseSearchName();//获取课程搜索名
            this.initFilter();
            //利用promise.all来监听ajax
            Promise.all([
                this.getCourseTypes(), //获取课程类别
                this.getCourse(),       //获取课程信息
            ]).then((res)=>{

            })
        }
    }
</script>
<style  type="text/scss" lang="scss">
    @import "~@/assets/scss/page/course.scss";
</style>
