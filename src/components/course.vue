<template>
    <div class="course">
        <teach-head :nickName="nickName" :headSrcLink="headSrcLink" :show_hide_vis="show_hide_vis" ></teach-head>
        <div class="content">
            <!--筛选部分-->
            <div class="content-head">
                <el-radio-group v-model="filter.direction" @change="courseTypeChange()">
                    <el-radio-button  :disabled="true" class="item-title" label="方向"></el-radio-button>
                    <el-radio-button class="item" label="">全部</el-radio-button>
                    <el-radio-button class="item" v-for="i in types.direction" :key="i.id" :label="i.id">{{i.name+i.id}}</el-radio-button>
                </el-radio-group>
                <el-radio-group v-model="filter.classify">
                    <el-radio-button :disabled="true" class="item-title" label="分类:"></el-radio-button>
                    <el-radio-button class="item" label="">全部</el-radio-button>
                    <el-radio-button class="item" v-for="i in types.classify" :key="i.id" :label="i.id">{{i.name+i.id}}</el-radio-button>
                </el-radio-group>
                <el-radio-group v-model="filter.type">
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
                    <el-radio v-model="sort" label="1">最新</el-radio>
                    <el-radio v-model="sort" label="2">最热</el-radio>
                </div>
                <div class="filter.difficult">
                    <el-radio v-model="filter.difficult" label="">全部</el-radio>
                    <el-radio v-model="filter.difficult" label="1">初级</el-radio>
                    <el-radio v-model="filter.difficult" label="2">中级</el-radio>
                    <el-radio v-model="filter.difficult" label="3">高级</el-radio>
                </div>
            </div>
            <div class="panel">

            </div>
        </div>
    </div>
</template>
<script>
    import '@/assets/scss/page/course.scss'
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

            }
        },
        methods:{
            getCourseTypes(){
                this.$fetch('/api/course/course_type').then((response) => {
                    this.types = response;
                    console.log(30,response);
                })
                    .catch(error =>{
                        console.log(err);
                    });;
            },
            courseTypeChange(){
                //调用接口
            },
            getCourse(){

            }
        },
        created() {
            this.getCourseTypes();  //获取课程类别信息
            this.getCourse();  //获取课程类别信息
        }
    }
</script>
<style></style>
