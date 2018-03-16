<template>
    <div class="lesson">
        <teach-head :nickName="nickName" :headSrcLink="headSrcLink" :show_hide_vis="show_hide_vis" ></teach-head>
        <div class="content">
            <div class="content-head">
                <!--<el-row :gutter="0" class="top">
                    <el-col :span="1" class="item-title"><div class="grid-content ">方向:</div></el-col>
                    <el-col :span="2" class="item"><div class="grid-content ">全部</div></el-col>
                    <el-col :span="2" class="item" v-for="i in types.direction" :key="i"><div class="grid-content ">{{i}}</div></el-col>
                </el-row>-->
                <el-radio-group v-model="filter.direction" @change="lessonTypeChange()">
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
    </div>
</template>
<script>
    import '@/assets/scss/page/lesson.scss'
    export default {
        name: 'lesson',
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
                    type: ''
                },
            }
        },
        methods:{
            getLessonTypes(){
                this.$fetch('/api/lesson/lesson_type').then((response) => {
                    this.types = response;
                    console.log(30,response);
                })
                    .catch(error =>{
                        console.log(err);
                    });;
            },
            lessonTypeChange(){
                //调用接口
            }
        },
        created() {
            this.getLessonTypes();  //获取课程信息
        }
    }
</script>
<style></style>
