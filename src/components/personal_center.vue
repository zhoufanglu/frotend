<template>
    <div class="personal-center">
        <teach-head :nickName="nickName" :headSrcLink="headSrcLink" :show_hide_vis="show_hide_vis" ></teach-head>
        <div class="content">
            <div class="content-top">
                <div class="top-l">
                    <div class="head-img">
                        <img :src="user_data.user_headimg" height="100%" width="100%" alt="">
                    </div>
                    <div class="personal-info">
                        <span>{{user_data.user_name}}</span>
                        <span>{{user_data.user_sex}}&nbsp;&nbsp;{{user_data.user_city}}</span>
                    </div>
                </div>
                <div class="top-r">
                    <div>
                        <span>{{user_data.user_learning_course_num}}</span>
                        <span>学习课程</span>
                    </div>
                    <div>
                        <span>{{user_data.user_score}}</span>
                        <span>学习积分</span>
                    </div>
                </div>
            </div>
            <div class="content-main">
                <div class="main">
                    <div class="left-nav">
                        <el-tabs v-model="activeName" tab-position="left" @tab-click="tabClick()">
                            <el-tab-pane label="我的课程" name="course">
                                <div class="nav-content">
                                    <el-row class="nav-course-row" v-for="(i,index) in course_list" :key="index">
                                        <el-col :span="6"><div class="grid-content item-left "><img :src="i.course_img" width="100%" height="100%" alt=""></div></el-col>
                                        <el-col :span="12"><div class="grid-content item-mid ">
                                            <span class="title">{{i.course_name}}</span>
                                            <span class="introduction">{{i.course_introduction}}</span>
                                            <!--<span>-人名</span>-->
                                            <div class="study-state">
                                                <span>已学{{i.course_progress}}</span>
                                                <span>学习至{{i.chapter_name}}</span>
                                            </div>
                                        </div></el-col>
                                        <el-col :span="6"><div class="grid-content item-right ">
                                            <div class="start-time">学习时间：{{i.created_at}}</div>
                                            <router-link  to="/course"target="_blank" class="grid-content continue-study  remove-a-css-darker">继续学习</router-link>
                                        </div></el-col>
                                    </el-row>
                                </div>
                                <!--分页-->
                                <div class="paging">
                                    <el-pagination background layout="prev, pager, next" @current-change="pageChange1()" :page-size="paging1.page_all_num" :current-page.sync="paging1.now_page"  :total="paging1.data_number"></el-pagination>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="我的收藏" name="book_marks">
                                <div class="nav-content">
                                    <el-row class="nav-course-row" v-for="(i,index) in collection_list" :key="index">
                                        <el-col :span="6"><div class="grid-content item-left "><img :src="i.course_img" width="100%" height="100%" alt=""></div></el-col>
                                        <el-col :span="12"><div class="grid-content item-mid ">
                                            <span class="title">{{i.course_name}}</span>
                                            <span class="introduction">{{i.course_introduction}}</span>
                                            <div class="study-state">
                                                <span>学习人数：{{i.course_learn_people}}</span>
                                                <span></span>
                                            </div>
                                        </div></el-col>
                                        <el-col :span="6"><div class="grid-content item-right ">
                                            <div class="start-time">学习时间：{{i.created_at}}</div>
                                            <router-link  to="/course"target="_blank" class="grid-content continue-study  remove-a-css-darker">继续学习</router-link>
                                        </div></el-col>
                                    </el-row>
                                </div>
                                <!--分页-->
                                <div class="paging">
                                    <el-pagination background layout="prev, pager, next" @current-change="pageChange2()" :page-size="paging2.page_all_num" :current-page.sync="paging2.now_page"  :total="paging2.data_number"></el-pagination>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="个人信息" name="personal_info">
                                <div class="personal-info">
                                    <div class="top">
                                        <span>个人信息</span>
                                        <span class="edit-info"><i class="icon-font">&#xe624;</i>编辑</span>
                                    </div>
                                    <div class="main">
                                        <el-row class="row">
                                            <el-col class="title" :span="4">用户昵称</el-col>
                                            <el-col class="row-content" :span="20">{{user_data.user_name}}</el-col>
                                        </el-row>
                                        <el-row class="row">
                                            <el-col class="title" :span="4">所在职位</el-col>
                                            <el-col class="row-content" :span="20">{{user_data.user_job}}</el-col>
                                        </el-row >
                                        <el-row class="row">
                                            <el-col class="title" :span="4">所在城市</el-col>
                                            <el-col class="row-content" :span="20">{{user_data.user_city}}</el-col>
                                        </el-row>
                                        <el-row class="row">
                                            <el-col class="title" :span="4">用户性别</el-col>
                                            <el-col class="row-content" :span="20">{{user_data.user_sex}}</el-col>
                                        </el-row>
                                        <el-row class="row">
                                            <el-col class="title" :span="4">个性签名</el-col>
                                            <el-col class="row-content" :span="20">{{user_data.user_autograph}}</el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="实名认证" name="real_name">
                                <div class="real-name">
                                    <div class="top">
                                        <span>实名认证</span>
                                        <span class="edit-info"><i class="icon-font">&#xe624;</i>编辑</span>
                                    </div>
                                    <div class="main">
                                        <el-row>
                                            <el-col :span="12" class="left">
                                                <div class="real-name-data">
                                                    <span class="top-tip">所有填写信息必须与学籍证明相同，如填写错误将无法通过</span>
                                                    <el-row>
                                                        <el-col class="name" :span="8">真实姓名</el-col>
                                                        <el-col :span="16">
                                                            <el-input placeholder="请输入姓名" v-model="real_name.identity_name" clearable></el-input>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row>
                                                        <el-col class="name" :span="8">院校名称</el-col>
                                                        <el-col :span="16">
                                                            <el-input placeholder="请输入院校" v-model="real_name.school_name" clearable></el-input>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row>
                                                        <el-col class="name" :span="8">入学时间</el-col>
                                                        <el-col :span="16">
                                                            <el-input placeholder="请输入院校" v-model="real_name.graduation_time" clearable></el-input>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row>
                                                        <el-col class="name" :span="8">学历层次</el-col>
                                                        <el-col :span="16">
                                                            <el-select v-model="real_name.identiy_education" placeholder="请选择">
                                                                <el-option v-for="item in real_name.identiy_education_arr" :key="item.value"
                                                                           :label="item.label" :value="item.value">
                                                                </el-option>
                                                            </el-select>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row>
                                                        <el-col class="name" :span="8">学籍证明</el-col>
                                                        <el-col :span="16">
                                                            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-change="fileChange" :file-list="real_name.fileList">
                                                                <el-button size="small" type="primary">点击上传</el-button>
                                                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                                            </el-upload>
                                                        </el-col>
                                                    </el-row>
                                                    <el-button type="danger" class="commit-btn" round>提交审核</el-button>
                                                </div>
                                            </el-col>
                                            <el-col :span="12" class="right">
                                                <div class="title">认证须知</div>
                                                <ul>
                                                    <li>你提交学籍证明后的5个工作日（不包含节假日）内完成审核，审核结果将会以系统通知的形式发送给你；</li>
                                                    <li>学籍证明中的身份证号码必须与实名认证中身份证信息保持一致。如有误，将无法通过审核。• 学籍认证审核完成后，将无法修改和删除，请谨慎填写。同时系统将自动发放10个积分作为奖励；查看积分；</li>
                                                    <li>上传学籍证明文件格式为PDF或JPG格式。请确保学籍文件清晰可见，具体可参考实名认证 常见问题；</li>
                                                    <li>如存在恶意乱填写姓名，上传假信息，改动学籍证明内容或上传无关图片者，一经发现将冻结慕课网账号。</li>
                                                    <li>我们会确保你所提供的信息均处于严格的保密状态，不会泄露</li>
                                                </ul>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="其它设置" name="other_set">其它设置</el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import ElCol from "element-ui/packages/col/src/col";
    import ElRow from "element-ui/packages/row/src/row";

    export default {
        components: {
            ElRow,
            ElCol},
        name: 'personal-center',
        data(){
            return{
                nickName:'tog',
                headSrcLink:require('@/assets/images/dogHead.jpg'),
                //css
                show_hide_vis:'show-vis',
                //用户信息
                user_data:{},
                //left_nav
                activeName:'course',
                course_list:[],
                collection_list:[],
                //分页
                paging1:{
                    page_all_num:5,//一页多少数据
                    now_page:1,     //当前页码
                    data_number:30 //一共多少数据
                },
                paging2:{
                    page_all_num:5,//一页多少数据
                    now_page:1,     //当前页码
                    data_number:30 //一共多少数据
                },
                //实名认证
                real_name:{
                    identity_name:'',
                    school_name:'',
                    identiy_education:'',
                    identiy_education_arr:[{
                        value: '1',
                        label: '中专'
                    }, {
                        value: '2',
                        label: '大专'
                    }, {
                        value: '3',
                        label: '本科'
                    }],//学历（1中专 2大专 3本科）
                    graduation_time:'',
                    identity_file:'',
                    fileList: [{
                        name: 'food.jpeg',
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                        status: 'finished'
                    }, {
                        name: 'food2.jpeg',
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                        status: 'finished'
                    }],
                }
            }
        },
        methods:{
            getUserList(){
                this.$fetch('http://127.0.0.1/teachep/public/user/getMyUserData').then((response) => {
                    this.user_data = response.user_data;
                    console.log('user_data',this.user_data);
                })
            },
            getMyCourseList(){
                this.$fetch('http://127.0.0.1/teachep/public/user/getMyCourseList').then((response) => {
                    this.course_list = response.course_list;
                    console.log('course_list',this.course_list);
                })
            },
            getCollectionList(){
                this.$fetch('http://127.0.0.1/teachep/public/user/getMyCollectionList').then((response) => {
                    this.collection_list = response.collection_list;
                    console.log('collection_list',this.collection_list);
                })
            },
            tabClick(){
                //this.paging.now_page = 1; //每次改动nav 分页都清空
            },
            //分页
            pageChange1(){
                this.getMyCourseList();
            },
            pageChange2(){
                this.getCollectionList();
            },
            //文件上传
            fileChange(file, fileList) {
                this.real_name.fileList3 = fileList.slice(-3);
            }
        },
        created(){
            this.getUserList();         //获取用户信息
            this.getMyCourseList();     //我的课程
            this.getCollectionList();   //我的收藏
        }
    }
</script>
<style type="text/scss" lang="scss">
    @import "~@/assets/scss/page/personal_center.scss";
</style>
