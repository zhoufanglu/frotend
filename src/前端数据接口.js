//前端数据接口文档111

/**
 * home.html
 */
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
//课程详情页面的数据接口
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
        id:id//课程ID
    },
    res:{
        ok:{
            filelist: [ // 课程文件信息
                {
                    id:'',
                    file_name:'文件名称',       //文件名称
                    file_address:'文件地址',        //文件地址
                    created_at:'上传时间',        //文件地址
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
            user: [ // 会员信息
                {
                    id:'',
                    head_img:'会员头像地址',
                    user_name:'会员',       //名字
                    score:'积分',        //积分

                }
            ]
        },
        err:{
            msg:'报错信息'
        }
    }
});
//课程评论接口
ajax({
    title:'获取课程评论列表',
    url:'http://127.0.0.1/teachep/public/course/getCommentList',
    type:'get',
    request:{
        id:id,//课程ID
        num:num,//几条数据
        pagenow:""//当前页面
    },
    res:{
        ok:{
            comment_list: [ // 评论列表信息
                {
                    user_name:'会员名称',
                    head_img:'会员头像地址',
                    image_text_name:'来自的章节名称',
                    praise_num:'点赞数',
                    created_at:'评论时间',
                    comment_text:''
                }
            ],
            page_all_num:"100",//一共多少条数据
        },
        err:{
            msg:'报错信息'
        }
    }
});
