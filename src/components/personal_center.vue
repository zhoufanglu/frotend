<template>
    <div class="personal-center">
        <teach-head :show_hide_vis="show_hide_vis" ></teach-head>
        <div class="content">
            <div class="content-top">
                <div class="top-l">
                    <div class="head-img">
                        <el-upload class="avatar-uploader" name="user_headimg"  :action="head_img_action" :data="head_img_data" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="user_data.user_headimg" :src="$imgPath+user_data.user_headimg" width="100%" height="100%" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                   <!-- <div class="head-img-tip">点击修改头像</div>-->
                    <div class="personal-info">
                        <span>{{user_data.user_name}}</span>
                        <span>{{user_data.user_sex}}&nbsp;&nbsp;{{getCity}}</span>
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
                                    <el-row v-if="course_list.length != 0" class="nav-course-row" v-for="(i,index) in course_list" :key="index">
                                        <el-col :span="6"><div class="grid-content item-left "><img :src="$imgPath+i.course_img" width="100%" height="100%" alt=""></div></el-col>
                                        <el-col :span="10"><div class="grid-content item-mid ">
                                            <span class="title">{{i.course_name}}</span>
                                            <span class="introduction">{{i.course_introduction}}</span>
                                            <!--<span>-人名</span>-->
                                            <div class="study-state">
                                                <span>已学{{i.course_progress}}</span>
                                                <span>学习至{{i.chapter_name}}</span>
                                            </div>
                                        </div></el-col>
                                        <el-col :span="8" :pull="2"><div class="grid-content item-right ">
                                            <div class="start-time">学习时间：{{i.created_at}}</div>
                                            <router-link  :to="{name:'course_detail',params:{course_id:i.id}}" class="grid-content continue-study  remove-a-css-darker">继续学习</router-link>
                                        </div></el-col>
                                    </el-row>
                                    <template v-if="course_list.length == 0">
                                        <no-data-panel tip="暂无课程"></no-data-panel>
                                    </template>
                                </div>
                                <!--分页-->
                                <div class="paging">
                                    <el-pagination v-if="paging1.data_number" background layout="prev, pager, next" @current-change="pageChange1()" :page-size="paging1.page_all_num" :current-page.sync="paging1.now_page"  :total="paging1.data_number"></el-pagination>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="我的收藏" name="book_marks">
                                <div class="nav-content">
                                    <el-row v-if="collection_list.length != 0" class="nav-course-row" v-for="(i,index) in collection_list" :key="index">
                                        <el-col :span="6"><div class="grid-content item-left "><img :src="$imgPath+i.course_img" width="100%" height="100%" alt=""></div></el-col>
                                        <el-col :span="10"><div class="grid-content item-mid ">
                                            <span class="title">{{i.course_name}}</span>
                                            <span class="introduction">{{i.course_introduction}}</span>
                                            <div class="study-state">
                                                <span>学习人数：{{i.course_learn_people}}</span>
                                                <span></span>
                                            </div>
                                        </div></el-col>
                                        <el-col :span="8" :pull="2"><div class="grid-content item-right ">
                                            <div class="start-time">学习时间：{{i.created_at}}</div>
                                            <router-link  :to="{name:'course_detail',params:{course_id:i.id}}" class="grid-content continue-study  remove-a-css-darker">开始学习</router-link>
                                        </div></el-col>
                                    </el-row>
                                    <template v-if="collection_list.length == 0">
                                        <no-data-panel tip="暂无收藏"></no-data-panel>
                                    </template>
                                </div>
                                <!--分页-->
                                <div class="paging">
                                    <el-pagination v-if="paging2.data_number!== 0" background layout="prev, pager, next" @current-change="pageChange2()" :page-size="paging2.page_all_num" :current-page.sync="paging2.now_page"  :total="paging2.data_number"></el-pagination>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="个人信息" name="personal_info">
                                <div class="personal-info">
                                    <div class="top">
                                        <span>个人信息</span>
                                        <el-button type="text" @click="personal_mask = true">
                                            <span class="edit-info"><i class="icon-font">&#xe624;</i>编辑</span>
                                        </el-button>
                                    </div>
                                    <div class="main">
                                        <el-row class="row">
                                            <el-col class="title" :span="4">用户昵称：</el-col>
                                            <el-col class="row-content" :span="20" :pull="1">{{user_data.user_name}}</el-col>
                                        </el-row>
                                        <el-row class="row">
                                            <el-col class="title" :span="4">所在职位：</el-col>
                                            <el-col class="row-content" :span="20" :pull="1">{{user_data.user_job}}</el-col>
                                        </el-row >
                                        <el-row class="row">
                                            <el-col class="title" :span="4">所在城市：</el-col>
                                            <el-col class="row-content" :span="20" :pull="1">
                                                {{getCity}}
                                            </el-col>
                                        </el-row>
                                        <el-row class="row">
                                            <el-col class="title" :span="4">用户性别：</el-col>
                                            <el-col class="row-content" :span="20" :pull="1">{{user_data.user_sex}}</el-col>
                                        </el-row>
                                        <el-row class="row">
                                            <el-col class="title" :span="4" >个性签名：</el-col>
                                            <el-col class="row-content" :span="20" :pull="1">{{user_data.user_autograph}}</el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="实名认证" name="real_name">
                                <div class="real-name">
                                    <div class="top">
                                        <span>实名认证</span>
                                        <!--<span class="edit-info"><i class="icon-font">&#xe624;</i>编辑</span>-->
                                    </div>
                                    <div class="main">
                                        <el-row>
                                            <el-col :span="12" class="left">
                                                <div class="real-name-data">
                                                    <span class="top-tip">所有填写信息必须与学籍证明相同，如填写错误将无法通过</span>
                                                    <el-row>
                                                        <el-col class="name" :span="8">真实姓名<span class="fn-color-danger">*</span></el-col>
                                                        <el-col :span="16">
                                                            <el-input placeholder="请输入姓名" :disabled="isDisableForForm" v-model="real_name.identity_name" ></el-input>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row>
                                                        <el-col class="name" :span="8">院校名称<span class="fn-color-danger">*</span></el-col>
                                                        <el-col :span="16">
                                                            <el-input placeholder="请输入院校" :disabled="isDisableForForm" v-model="real_name.school_name" ></el-input>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row>
                                                        <el-col class="name" :span="8">入学时间<span class="fn-color-danger">*</span></el-col>
                                                        <el-col :span="16">
                                                            <el-date-picker v-model="real_name.graduation_time" :disabled="isDisableForForm" align="right" type="date" placeholder="选择日期" :picker-options="pickerDateOptions" value-format="yyyy-MM-dd">
                                                            </el-date-picker>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row>
                                                        <el-col class="name" :span="8">学历层次<span class="fn-color-danger">*</span></el-col>
                                                        <el-col :span="16">
                                                            <el-select v-model="real_name.identiy_education" placeholder="请选择" :disabled="isDisableForForm">
                                                                <el-option v-for="item in identiy_education_arr" :key="item.value"
                                                                           :label="item.label" :value="item.value">
                                                                </el-option>
                                                            </el-select>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row>
                                                        <el-col class="name" :span="8">学籍证明<span class="fn-color-danger">*</span></el-col>
                                                        <el-col :span="16">
                                                            <el-upload :data="real_name" name="identity_file" :limit="1" :on-exceed="onExceed":on-change="identityFileChange"
                                                                        :on-error="catchErr"
                                                                        :on-success ="catchSuccess"
                                                                        :disabled="isDisableForForm"
                                                                        class="upload-demo" ref="upload" :action="identity_file_action" :file-list="study_file_list" :auto-upload="false">
                                                                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                                                <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
                                                                <!--<div slot="tip" class="el-upload__tip">不超过500kb</div>-->
                                                            </el-upload>
                                                        </el-col>
                                                    </el-row>
                                                    <!--v-if="real_name.identity_status === 3"-->
                                                    <el-button type="danger" v-if="real_name.identity_status === ''|| real_name.identity_status === undefined" class="commit-btn" round @click="submitRealName()">提交审核</el-button>
                                                    <!--<button @click="submitRealName()">测试btn</button>-->
                                                    <el-button type="warning" v-if="real_name.identity_status === 2" class="commit-btn" round disabled>审核中...</el-button>
                                                    <el-button type="success" v-if="real_name.identity_status === 1" class="commit-btn" round disabled >认证成功</el-button>
                                                    <el-button type="warning" v-if="real_name.identity_status === 0" class="commit-btn" round  @click="$refs.upload.clearFiles();isDisableForForm=false">认证失败,点击修改</el-button>
                                                    <el-button type="danger" v-if="real_name.identity_status === 0" :disabled="isDisableForForm" class="commit-btn" round @click="submitRealName()" >重新提交审核</el-button>
                                                </div>
                                            </el-col>
                                            <el-col :span="12" class="right">
                                                <div class="title">认证须知</div>
                                                <ul>
                                                    <li>你提交学籍证明后的5个工作日（不包含节假日）内完成审核，审核结果将会以系统通知的形式发送给你；</li>
                                                    <li>学籍证明中的身份证号码必须与实名认证中身份证信息保持一致。如有误，将无法通过审核。 学籍认证审核完成后，将无法修改和删除，请谨慎填写。同时系统将自动发放10个积分作为奖励；查看积分；</li>
                                                    <li>上传学籍证明文件格式为PDF或JPG格式。请确保学籍文件清晰可见，具体可参考实名认证 常见问题；</li>
                                                    <li>如存在恶意乱填写姓名，上传假信息，改动学籍证明内容或上传无关图片者，一经发现将冻结慕课网账号。</li>
                                                    <li>我们会确保你所提供的信息均处于严格的保密状态，不会泄露</li>
                                                </ul>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <!--<el-tab-pane label="其它设置" name="other_set">其它设置</el-tab-pane>-->
                        </el-tabs>
                    </div>
                </div>
            </div>
        </div>
        <!--dialog-->
        <el-dialog class="personal-dialog" title="编辑个人信息" :visible.sync="personal_mask" width="30%">
            <el-form label-position="right" label-width="80px" :model="user_edit_data">
                <el-form-item label="昵称">
                    <el-input v-model="user_edit_data.user_name"></el-input>
                </el-form-item>
                <el-form-item label="职位">
                    <el-input v-model="user_edit_data.user_job"></el-input>
                </el-form-item>
                <el-form-item label="所在地区">
                    <el-cascader size="large" :options="options" v-model="user_edit_data.user_city">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio v-model="user_edit_data.user_sex" label="男">男</el-radio>
                    <el-radio v-model="user_edit_data.user_sex" label="女">女</el-radio>
                </el-form-item>
                <el-form-item label="个性签名">
                    <el-input type="textarea" v-model="user_edit_data.user_autograph"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="personal_mask = false">取 消</el-button>
                <el-button type="primary" @click="editPersonalInfo()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import ElCol from "element-ui/packages/col/src/col";
    import ElRow from "element-ui/packages/row/src/row";
    import { provinceAndCityData, regionData, CodeToText, TextToCode } from 'element-china-area-data'//省市区组件
    import { mapMutations } from 'vuex'
    export default {
        components: {
            ElRow,
            ElCol},
        name: 'personal-center',
        data(){
            return{
                //css
                show_hide_vis:'show-vis',
                //用户信息
                options:provinceAndCityData,
                user_data:{},
                user_edit_data:{
                    user_city:[]
                },
                //修改头像
                head_img_action:''+this.$imgPath+'user/setMyHeadimg',//头像请求路径
                head_img_data:{
                    user_id:this.$state.user.user_id,
                },
                //left_nav
                activeName:'course',
                course_list:[],
                collection_list:[],
                //分页
                paging1:{  //课程
                    page_all_num:5,//一页多少数据
                    now_page:1,     //当前页码
                    data_number:0 //一共多少数据
                },
                paging2:{   //收藏
                    page_all_num:5,//一页多少数据
                    now_page:1,     //当前页码
                    data_number:0 //一共多少数据
                },
                //实名认证数据
                real_name:{
                    identity_name:'',
                    school_name:'',
                    identiy_education:'',
                    graduation_time:'',
                    identity_file:'',
                    fileList: [],
                    user_id:this.$state.user.user_id
                },
                //学历等级数据;
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
                personal_mask:false,
                //时间选择器
                pickerDateOptions:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                //判断form是否禁用
                isDisableForForm:false,
                //学籍证明
                identity_file_action:''+this.$imgPath+'user/setMyIdentity',//学籍证明请求地址
                study_file_list: []
            }
        },
        methods:{
            ...mapMutations({
                setUserInfo:'setUserInfo'
            }),
            getUserList(){
                this.$post('/user/getMyUserData',{id:this.$state.user.user_id}).then((response) => {
                    this.user_data = response;                                     //直接赋值
                    this.user_edit_data = JSON.parse(JSON.stringify( response));  //开辟了新的赋值地址
                    this.setUserInfo(
                        this.user_data
                    );
                    console.log('user_data',this.user_data);
                })
            },
            getMyCourseList(){
                let send_data= {
                    id:this.$state.user.user_id,//用户id
                    num:this.paging1.page_all_num,
                    pagenow:this.paging1.now_page//当前页面
                };
                this.$fetch('/user/getMyCourseList',send_data).then((response) => {
                    this.course_list = response.course_list;
                    this.paging1.data_number = response.pageallnum;
                    //console.log('course_list',this.course_list);
                })
            },
            getCollectionList(){
                let send_data= {
                    id:this.$state.user.user_id,//用户id
                    num:this.paging2.page_all_num,
                    pagenow:this.paging2.now_page//当前页面
                };
                this.$fetch('/user/getMyCollectionList',send_data).then((response) => {
                    this.collection_list = response.collection_list;
                    this.paging2.data_number = response.pageallnum;
                    //console.log('collection_list',this.collection_list);
                })
            },
            getMyIdentity(){
                this.$post('/user/getMyIdentity',{id:this.$state.user.user_id}).then((response) => {
                    if(response.msg === "未查询到认证信息")
                        return false;
                    this.real_name = response;
                    this.real_name.identiy_education_arr = this.identiy_education_arr;
                    if(response.identity_file!==''){
                        this.study_file_list = [{name:response.identity_file.split('/')[response.identity_file.split('/').length-1]}];//文件名赋值
                        //console.log(350,response.identity_file.split('/')[response.identity_file.split('/').length-1]);
                    }
                    //初始化学历等级--后端传的12,前端需要转换 妈的
                        if(this.real_name.identiy_education === 1){
                            this.real_name.identiy_education_text = '中专'
                        }else if(this.real_name.identiy_education === 2){
                            this.real_name.identiy_education_text = '大专'
                        }else if(this.real_name.identiy_education === 3){
                            this.real_name.identiy_education_text = '本科'
                        }else {
                            this.real_name.identiy_education_text = ''
                        }
                     //判断认证状态
                    if(this.real_name.identity_status === 1 || this.real_name.identity_status === 2 || this.real_name.identity_status === 0 ){
                            this.isDisableForForm = true;
                    }else{
                        this.isDisableForForm = false;
                    }
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
            //文件上传--头像
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            //修改个人信息
            editPersonalInfo(){
                this.personal_mask = false;
                //sendAjax
                //后端user_city需要改为user_province:'',//省user_city:'',//市
                let sendData = {
                    id:this.user_edit_data.id,//用户ID
                    user_name:this.user_edit_data.user_name,
                    user_job:this.user_edit_data.user_job,
                    user_sex:this.user_edit_data.user_sex,
                    //user_city:this.user_data.user_city,//数组格式，省市区
                    user_autograph:this.user_edit_data.user_autograph,
                    //user_headimg:'用户头像',
                };
                sendData.user_province = this.user_edit_data.user_city[0];
                sendData.user_city = this.user_edit_data.user_city[1];
                //this.user_data = JSON.parse(JSON.stringify( this.user_edit_data));
                //console.log(359,this.user_edit_data);
                //return false;
                this.$post('/user/setMyUserData',sendData).then((response) => {
                    console.log(response);
                    this._message("修改成功",{
                        type: 'success'
                    })
                    this.getUserList();
                }).catch((err)=>{
                    console.log(329,err);
                })
            },
            //提交审核
            submitRealName(){
                let flag = true,msg = "";
                if(this.real_name.identity_name === ''){
                    msg="请输入真实姓名";
                    flag = false;
                }else if(this.real_name.school_name === ''){
                    msg="请输入学校名称";
                    flag = false;
                }else if(this.real_name.graduation_time === ''){
                    msg="请输入学时间";
                    flag = false;
                }else if(this.real_name.identiy_education === ''){
                    msg="请输入学历";
                    flag = false;
                }else if((this.isDisableForForm === false) && (this.real_name.fileList === undefined || this.real_name.fileList.length === 0) ){
                    msg="请上传学历证明";
                    flag = false;
                }
                //数据初始化
                this.real_name.user_id = this.$state.user.user_id;
                //console.log(427,this.real_name.fileList);
                if(flag === false){
                    this._message(msg,{
                        type: 'error'
                    })
                }else{
                    //sendAjax;
                    console.log(434,this.real_name);
                    this.$refs.upload.submit();
                }
                //console.log(342,this.identity_file_action);
            },
            //头像
            handleAvatarSuccess(res, file) {
                this.getUserList();
                setTimeout(()=>{
                    this._message("修改成功",{
                        type: 'success'
                    });
                },400);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG 和 PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            /****************实名认证操作***********************/
            handleRemove2(file, fileList) {
                console.log(481,file, fileList);
            },
            handlePreview2(file) {
                console.log(484,file);
            },
            onExceed(file,fileList){
                fileList[0].raw = file[0];
                fileList[0].name = file[0].name;
                fileList[0].size = file[0].size;
                //fileList[0].status = 'ready';
                //this.$refs.upload.clearFiles();
               // console.log(490,file,fileList);
            },
            //文件上传监听
            identityFileChange(file,fileList){
                this.real_name.fileList = [file.name];//给一个实名认证已经有的标记

                //console.log(476,this.real_name.fileList);
            },
            catchErr(err, file, fileList){
                this.$message.err('信息出错,请稍后操作！');
            },
            catchSuccess(response, file, fileList){
                this.getMyIdentity();
                this.$message.success('修改成功！请等待认证！');
            }
        },
        created(){
            this.getUserList();         //获取用户信息
            this.getMyCourseList();     //我的课程
            this.getCollectionList();   //我的收藏
            this.getMyIdentity();       //获取认证信息
        },
        computed:{
            getCity(){
                let city_name = "";
                //console.log(512,this.user_data.user_city)
                if(this.user_data.user_city && this.user_data.user_city[0] === null){
                    return "暂无信息";
                }
                for(let i in this.user_data.user_city){
                    city_name += CodeToText[this.user_data.user_city[i]] + "/";
                }
                return city_name.substring(0,city_name.length-1);
                /*let city_name = "";
                for(let i in this.user_data.user_city){
                    city_name += this.user_data.user_city[i] + "/";
                }
                return city_name.substring(0,city_name.length-1);*/
            },
        }
    }
</script>
<style type="text/scss" lang="scss">
    @import "~@/assets/scss/page/personal_center.scss";
</style>
