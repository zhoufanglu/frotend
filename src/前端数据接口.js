
/**
 * home.html
 */
//接口ip地址
ajax({
    title:'获取课程信息接口',
    url:'http://127.0.0.1/teachep/public/indexRotation',
    type:'get',
    request:{

    },
    res:{
        ok:{
            /*
            和获取分类接口数据相同请求数据分类接口*/
            top_title:[{//(三级菜单)
                id:'课程分类id',
                couser_type_name:'课程分类名称',
            }],  //轮播左边的标题内容，个数需要固定
            module:[{id:1,name:'一级标题1'},{id:2,name:'一级标题2'}],//一级课题标题（模块列表）
            shuffling_img_link:[{
                id:"",
                picture_name:"图片名称",
                picture_address:"图片地址",
                picture_href:"图片链接",
            }],//轮播图片路径
            course_one: [ // 12项  一级标题1下的课程
                {
                    id:'',
                    course_name:'我是课程',       //名字
                    course_img:'img_src',        //图片路径
                    course_learn_people:'',      //所学习人数
                    course_type:['a类','b类'],             //所属类别(s数组)
                    course_difficult:'初级',    //难度级别
                    course_introduction:'入门'   //入门
                },

            ],
            lesson_two: [ // 12项 一级标题2下的课程
                {
                    id:'',
                    course_name:'我是课程',       //名字
                    course_img:'img_src',        //图片路径
                    course_learn_people:'',      //所学习人数
                    course_type:['A类'],             //所属类别
                    course_difficult:'初级',    //难度级别
                    course_introduction:'入门'   //入门
                },
            ]
        },
        err:{
            msg:'报错信息'
        }
    }
});


/**
 * course.html
 */
ajax({
    title:'获取课程所有类别接口',
    url:'http://127.0.0.1/teachep/public/indexCourseTypeList',
    type:'get',
    request:{

    },
    res:{
        ok:{
            direction: [//方向（一级分类）
                {id: 1, name: '我是方向'}
            ],
            classify: [//分类（二级分类）
                {id: 2, name: '我是分类'}
            ],
            type: [//类别（三级级分类）
                {id: 3, name: '我是类别'}
            ]
        },
        err:{
            msg:'报错信息'
        }
    }
});

ajax({
    title:'获取课程信息接口',//课程列表页面使用
    url:'http://127.0.0.1/teachep/public/getCourseList',
    type:'get',
    request:{
        filter_direction: 12, //传的是id,如果为空,就是全部（方向-->一级分类）
        filter_classify:'' , //传的是id,如果为空,就是全部（分类-->二级级分类）
        filter_type: 12, //传的是id,如果为空,就是全部（类型-->三级分类）
        sort:'last/pop',//排序----默认是最新，最新/最热（这个最新最热数据没有这个标签）
        hard:' ,1,2,3',//难度----默认全部(为空),分为初级，中级，高级
        now_page:1,//当前页码
        page_num:10//每页多少数据
    },
    res:{
        ok:{
            course: [ // 12项  一级标题1下的课程
                {
                    id:'',
                    course_name:'我是课程',       //名字
                    course_img:'img_src',        //图片路径
                    course_learn_people:'',      //所学习人数
                    course_type:['a类','b类'],             //所属类别(s数组)
                    course_difficult:'初级',    //难度级别
                    course_introduction:'入门'   //入门
                }
            ],
            pageallnum:"100",//一共多少条数据
        },
        err:{
            msg:'报错信息'
        }
    }
});
/************************课程详情页面的数据接口********************************/
/**
 * 1.课程详情 course_detail
 * */

ajax({
    title:'获取课程详情',
    url:'http://127.0.0.1/teachep/public/course/getHomeCourseDetail',
    type:'get',
    request:{
        id:id//课程ID
    },
    res:{
        ok:{
            course: // 课程基本信息
                {
                    id: '',
                    course_name: '我是课程',       //课程名字
                    course_img: 'img_src',        //课程图片路径
                    course_learn_people: '',      //课程所学习人数
                    course_type: ['a类', 'b类'],             //所属类别(s数组)
                    course_difficult: '初级',    //难度级别
                    course_introduction: '简介'   //简介
                },
            chapter_list: [
                { //章节列表
                    id: "章节id",
                    chapter_name: "章节名称",
                    detail_list:
                        [
                            {id: "1", name: "2",type: "1"},
                            {id: "1", name: "2",type: "1"},
                            {id: "1", name: "2",type: "1"},/*章节里面小章节就是（1.1,1.2）*//*1代表文章 2代表视频*/
                        ]
                },
                { //章节列表
                    id: "章节id",
                    chapter_name: "章节名称",
                    detail_list:
                        [
                            {id: "1", name: "2",type: "1"},
                            {id: "1", name: "2",type: "1"},
                            {id: "1", name: "2",type: "1"},/*章节里面小章节就是（1.1,1.2）*//*1代表文章 2代表视频*/
                        ]
                }
            ],
        },
        err:{
            msg:'报错信息'
        }
    }
});
//课程文件接口
ajax({
    title:'获取课程文件列表',
    url:'http://127.0.0.1/teachep/public/course/getFileList',
    type:'get',
    request:{
        id:id,//课程ID
        type:1
    },
    res:{
        ok:{
            file_list: [ // 课程文件信息
                {
                    id:'',
                    chapter_name:'所属章节名称',       //文件名称
                    file_name:'文件名称',       //文件名称
                    file_address:'文件地址',        //文件地址
                    file_from:'第一章',        //所属章节
                    created_at:'上传时间',        //文件地址
                    file_size:'100kb',              //文件大小
                }
            ]
        },
        err:{
            msg:'报错信息'
        }
    }
});
//课程相似课程接口
ajax({
    title:'课程相似课程接口',
    url:'http://127.0.0.1/teachep/public/course/getCourseSortList',
    type:'get',
    request:{
        id:id,//课程ID
        num:num//几条数据
    },
    res:{
        ok:{
            course: [ // 课程基本信息
                {
                    id:'',
                    course_name:'我是课程',       //名字
                    course_img:'img_src',        //图片路径
                    course_learn_people:'',      //所学习人数
                    course_type:['a类','b类'],             //所属类别(s数组)
                    course_difficult:'初级',    //难度级别
                    course_introduction:'简介'   //简介
                }
            ]
        },
        err:{
            msg:'报错信息'
        }
    }
});
//会员排行接口
ajax({
    title:'获取会员排行接口列表',
    url:'http://127.0.0.1/teachep/public/course/getUserSortList',
    type:'get',
    request:{
        num:num//几条数据
    },
    res:{
        ok:{
            user:  // 会员信息
                {
                    id:'',
                    head_img:'会员头像地址',
                    user_name:'会员',       //名字
                    score:'积分',        //积分

                }
        },
        err:{
            msg:'报错信息'
        }
    }
});
/************************子章节详情页面的数据接口********************************/
//子章节详情接口
ajax({
    title:'获取子章节详情接口',
    url:'http://127.0.0.1/teachep/public/course/getImageTextDetail',
    type:'get',
    request:{
        id:id,//子章节ID
    },
    res:{
        ok:{
            image_text_detail:  // 子章节信息
                {
                    id:'子章节id',
                    course_name:"课程名称",
                    chapter_name:"章节名称",
                    image_text_name:'子章节名称',
                    image_text_introduction:'介绍',
                    image_text_detail:'子章节详情',
                    image_text_video:'视频地址',
                    image_text_type:'1<图文>2<视频>',
                    finish_score:"完成分数"
                },
        },
        err:{
            msg:'报错信息'
        }
    }
});
//子章节评论接口
ajax({
    title:'获取课程评论列表',
    url:'http://127.0.0.1/teachep/public/course/getCommentList',
    type:'get',
    request:{
        id:id,//子章节ID（图文或视频id）
        num:num,//几条数据
        pagenow:""//当前页面
    },
    res:{
        ok:{
            commentList: [ // 评论列表信息
                {
                    id:"评论id",
                    user_name:'会员名称',
                    headimg:'会员头像地址',
                    image_text_name:'来自的子章节名称',
                    praise_num:'点赞数',
                    created_at:'评论时间',
                    reply_list:[{
                        id:"回复id",
                        user_name:"会员名称",
                        headimg:'会员头像地址',
                        reply_text:'回复内容',
                        created_at:"回复时间"
                    }],
                }
            ],
            pageallnum:"100",//一共多少条数据
        },
        err:{
            msg:'报错信息'
        }
    }
});
//开始学习课程接口
ajax({
    title:'开始学习课程接口',
    url:'http://127.0.0.1/teachep/public/course/setUserStartCourse',
    type:'post',
    request:{
        course_id:"课程id",
        user_id:"用户id",
    },
    res:{
        ok:{
        },
        err:{
            msg:''
        }
    }
});

//完成课程接口
ajax({
    title:'收藏课程接口',
    url:'http://127.0.0.1/teachep/public/course/setUserFinish',
    type:'post',
    request:{
        id:"子章节（图文视频）id",
        user_id:"用户id",
    },
    res:{
        ok:{
        },
        err:{
            msg:''
        }
    }
});
//课程评论接口
ajax({
    title:'课程评论接口',
    url:'http://127.0.0.1/teachep/public/course/setUserComment',
    type:'post',
    request:{
        id:"子章节（图文视频）id",
        user_id:"课程id",
        comment_text:"评论内容",
        project_class:"1:图文视频 2文章"//评论对象的类型
    },
    res:{
        ok:{
        },
        err:{
            msg:''
        }
    }
});
//课程回复操作接口
ajax({
    title:'课程评论回复操作接口',
    url:'http://127.0.0.1/teachep/public/course/setUserReply',
    type:'post',
    request:{
        user_id:"用户id",
        comment_id:"评论id",
        reply_text:"回复内容",
    },
    res:{
        ok:{
        },
        err:{
            msg:''
        }
    }
});
/************************个人中心页面接口********************************/
//我的课程接口
ajax({
    title:'获取我的课程列表',
    url:'http://127.0.0.1/teachep/public/user/getMyCourseList',
    type:'get',
    request:{
        id:id,//课程ID
        num:num,//几条数据
        pagenow:""//当前页面
    },
    res:{
        ok:{
            course_list: [ // 我的课程列表信息
                {
                    id:'课程id',
                    course_name:'课程名字',
                    course_img:'课程封面图片',
                    course_progress:'课程学习进度',
                    course_introduction:'课程简介',
                    chapter_name:'学至章节名称',
                    created_at:'最近学习时间',
                }
            ],
            page_all_num:"100",//一共多少条数据
        },
        err:{
            msg:'报错信息'
        }
    }
});
//我的收藏接口
ajax({
    title:'获取我的收藏列表',
    url:'http://127.0.0.1/teachep/public/user/getMyCollectionList',
    type:'get',
    request:{
        id:id,//课程ID
        num:num,//几条数据
        pagenow:""//当前页面
    },
    res:{
        ok:{
            collection_list: [ // 我的收藏列表信息
                {
                    id:'课程id',
                    course_name:'课程名字',
                    course_img:'课程封面图片',
                    course_progress:'课程学习进度',
                    course_introduction:'课程简介',
                    created_at:'收藏时间',
                }
            ],
            page_all_num:"100",//一共多少条数据
        },
        err:{
            msg:'报错信息'
        }
    }
});
//个人信息获取接口
ajax({
    title:'个人信息获取',
    url:'http://127.0.0.1/teachep/public/user/getMyUserData',
    type:'post',
    request:{
        id:id,//用户ID
    },
    res:{
        ok:{
            user_data:  // 个人信息获取信息
                {
                    id:'用户id',
                    user_name:'用户名字',
                    user_job:'用户工作',
                    user_sex:'性别',
                    user_city:[],//数组格式，省市区
                    user_autograph:'个性签名',
                   // user_score:'用户积分',
                    user_headimg:'用户头像',
                    is_identity:'是否认证',
                    user_learning_course_num:"学习课程数"
                }
            ,
            page_all_num:"100",//一共多少条数据
        },
        err:{
            msg:'报错信息'
        }
    }
});
//个人信息修改接口
ajax({
    title:'个人信息修改',
    url:'http://127.0.0.1/teachep/public/user/setMyUserData',
    type:'post',
    request:{
        id:id,//用户ID
        user_name:'用户名字',
        user_job:'用户工作',
        user_sex:'性别',
        user_city:[],//数组格式，省市区
        user_autograph:'个性签名',
        //user_score:'用户积分',
        user_headimg:'用户头像',
    },
    res:{
        ok:{

        },
        err:{
            msg:''
        }
    }
});
//认证信息获取接口
ajax({
    title:'认证信息获取接口',
    url:'http://127.0.0.1/teachep/public/user/getMyIdentity',
    type:'post',
    request:{
        id:"用户id",
    },
    res:{
        ok:{
            id:"认证信息id",
            user_id:"用户id",//用户ID
            identity_name:'真实名字',
            school_name:'学校名字',
            school_id:'学校id',
            identiy_education:'学历（1中专 2大专 3本科）<直接传的数字>',
            graduation_time:'毕业时间',
            identity_file:'认证文件资料地址',
            identity_status:'认证状态（0 不合格 1合格 2待审核）'
        },
        err:{
            msg:''
        }
    }
});
//获取学校列表
ajax({
    title:'获取学校列表',
    url:'http://127.0.0.1/teachep/public/user/getSchoolList',
    type:'post',
    request:{
    },
    res:{
        ok:{
            school_list:[
                {
                    id:id,//学校ID
                    school_name:'学校名字',
                }
            ]
        },
        err:{
            msg:''
        }
    }
});
//认证信息修改接口
ajax({
    title:'认证信息获取接口',
    url:'http://127.0.0.1/teachep/public/user/setMyIdentity',
    type:'post',
    request:{
        id:"认证信息id",
        user_id:"用户id",//用户ID
        identity_name:'真实名字',
        school_name:'学校名字',
        school_id:'学校id',
        identiy_education:'学历（1中专 2大专 3本科）<直接传的数字>',
        graduation_time:'毕业时间',
        identity_file:'认证文件资料地址',
    },
    res:{
        ok:{
        },
        err:{
            msg:''
        }
    }
});
/****************************登陆注册接口**********************/
//注册信息接口
ajax({
    title:'注册信息接口',
    url:'http://127.0.0.1/teachep/public/User/register',
    type:'post',
    request:{

        user_name:"用户名",//用户ID
        user_tel:'用户电话',
        user_job:'用户工作',
        user_password:'用户密码',
        user_province:'省份',
        user_city:'城市',
        user_sex:'性别',
        user_email:'毕业时间',
    },
    res:{
        ok:{
        },
        err:{
            msg:''
        }
    }
});
//登陆接口
ajax({
    title:'登陆接口',
    url:'http://127.0.0.1/teachep/public/User/login',
    type:'post',
    request:{
        user_name:"用户名或者邮箱",
        user_password:'用户密码',
    },
    res:{
        ok:{
        },
        err:{
            msg:''
        }
    }
});