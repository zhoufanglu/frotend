//引入mockjs
import Mock from "mockjs"
//使用mockjs模拟数据
let useMock = (isOpenMock) =>{
    if(isOpenMock === false) return false;

    let Random = Mock.Random;
    /**
     * home.html
     */
    Mock.mock('indexRotation',{
        'top_title|4':[()=>Random.ctitle()],
        'module|2': [
            {
                id: () => Random.integer(1, 100),
                name: () => Random.ctitle()
            }
        ],
        'shuffling_img_link|4':[()=>Random.dataImage()],
        'course_one|12':[{
            id:()=>Random.integer( 1, 100 ),
            course_name:()=>Random.ctitle(),
            'course_type|3':[()=>Random.ctitle()],
            course_introduction:()=>Random.ctitle(30,50),
            course_difficult:'初级 ',
            course_img:()=>Random.dataImage(),
            course_learn_people:()=>Random.integer( 1, 9999 )
        }],
        'course_two|12':[{
            id:()=>Random.integer( 1, 100 ),
            course_name:()=>Random.ctitle(),
            'course_type|3':[()=>Random.ctitle()],
            course_introduction:()=>Random.ctitle(30,50),
            course_difficult:'初级 ',
            course_img:()=>Random.dataImage(),
            course_learn_people:()=>Random.integer( 1, 9999 )
        }]
    });

    /**
     * course.html
     */
    Mock.mock('/indexCourseTypeList',{
        'direction|6':[{name:()=>Random.ctitle(),id:()=>Random.integer( 1, 9999 )}], //方向
        'classify|20':[{name:()=>Random.ctitle(),id:()=>Random.integer( 1, 9999 )}],   //分类
        'type|7':[{name:()=>Random.ctitle(),id:()=>Random.integer( 1, 9999 )}]
    });

    Mock.mock('/getCourseList',{
        'course|30': [
            {
                id: () => Random.integer(1, 100),
                course_name: () => Random.ctitle(),
                'course_type|3': [() => Random.ctitle()],
                'course_introduction': () => Random.ctitle(30,50) ,
                course_difficult: '初级 ',
                course_img: () => Random.dataImage(),
                course_learn_people: () => Random.integer(1, 9999)
            }
        ]
    });

    /**
     * course_detail.html
     */
    Mock.mock('/course_detail/course',{
      'course':{
          id: '',
          course_name: () => Random.ctitle(),       //课程名字
          course_img: () => Random.dataImage(),        //课程图片路径
          course_learn_people: () => Random.integer(1, 9999),      //课程所学习人数
          course_type: ['a类', 'b类'],  //所属类别(s数组)
          course_difficult: '初级',    //难度级别
          'course_introduction': () => Random.ctitle(30,50)    //简介
      },
        'chapter_list|3': [{ //章节列表
            id: () => Random.integer(1, 100),
            chapter_name: () => Random.ctitle(),
            'detail_list|3':[
                {
                    id: () => Random.integer(1, 100),
                    name: () => Random.ctitle(),//章节里面小章节就是（1.1,1.2）
                    type: "1"//1代表文章 2代表视频
                }]
        }],
    });

    //会员排行接口
    Mock.mock('/course_detail/user_rank',{
        'user|5':[
            {
                id:()=>Random.integer( 1, 100 ),
                head_img:() => Random.dataImage(),
                user_name:()=>Random.ctitle(),
                score:()=>Random.integer( 1, 100 ),
            }
        ]
    });
    //会员排行接口all
    Mock.mock('/course_detail/user_rank_all',{
        'user|30':[
            {
                id:()=>Random.integer( 1, 100 ),
                head_img:() => Random.dataImage(),
                user_name:()=>Random.ctitle(1,4),
                score:()=>Random.integer( 1, 100 ),
                unit:()=>Random.ctitle(2,6),
                completed_course_number:()=>Random.integer( 1, 100 ),//完成课程数
                join_time:()=>Random.date('yyyy-MM-dd HH:mm:ss '),
                rank_number:()=>Random.integer(1,100)
            },
        ],
        "pageallnum":()=>Random.integer( 1, 100 ),//一共多少条数据
    });

    //相似课程接口
    Mock.mock('http://127.0.0.1/teachep/public/course/getCourseSortList',{
        "course|5": [ // 课程基本信息
            {
                id:()=>Random.integer( 1, 100 ),
                course_name:()=>Random.ctitle(),       //名字
                course_img:() =>Random.dataImage('200x100', 'tog'),        //图片路径
                course_learn_people:'',      //所学习人数
                course_type:['a类','b类'],             //所属类别(s数组)
                course_difficult:'初级',    //难度级别
                course_introduction:()=>Random.ctitle(30,50)   //简介
            }
        ]
    });

    //评论接口
    Mock.mock('http://127.0.0.1/teachep/public/course/getCommentList',{
        "comment_list|10": [ // 评论列表信息
            {
                user_name:()=>Random.ctitle(),
                head_img:() =>Random.dataImage(),
                image_text_name:()=>Random.ctitle(3,12),
                praise_num:()=>Random.integer( 1, 1000 ),
                created_at:Random.date('yyyy-MM-dd HH:mm:ss '),
                comment_text:()=>Random.ctitle(60,100),
            }
        ],
        page_all_num:"100",//一共多少条数据
    });

    //文章接口
    Mock.mock('http://127.0.0.1/teachep/public/course/getFileList',{
        "file_list|10": [
            {
                id:()=>Random.integer( 1, 100 ),
                file_name:()=>Random.ctitle(4,8),       //文件名称
                file_from:"第x章 ",                      //
                file_address:'address',        //文件地址
                file_size:'100kb',
                created_at:Random.date('yyyy-MM-dd HH:mm:ss '),        //文件地址
            }
        ]
    });
    /**
     * personal_center.html
     */
    //个人信息接口
    Mock.mock('http://127.0.0.1/teachep/public/user/getMyUserData',{
        user_data:  // 个人信息获取信息
            {
                id:()=>Random.integer( 1, 100 ),
                user_name:()=>Random.ctitle(2,4),
                user_job:()=>Random.ctitle(2,4),
                user_sex:"男",
                user_city:["320000","320500"],
                user_autograph:()=>Random.ctitle(15,50),
                user_score:()=>Random.integer( 1, 100 ),
                user_headimg:() =>Random.dataImage(),
                is_identity:true,
                user_learning_course_num:()=>Random.integer( 1, 10 )
            }
        ,
    });
    //我的课程
    Mock.mock('http://127.0.0.1/teachep/public/user/getMyCourseList',{
            "course_list|4": [ // 我的课程列表信息
                {
                    id:()=>Random.integer( 1, 100 ),
                    course_name:()=>Random.ctitle(2,4),
                    course_img:() =>Random.dataImage(),
                    course_progress:'20%',
                    course_introduction:()=>Random.ctitle(15,40),
                    chapter_name:'第几章',
                    created_at:()=>Random.date('yyyy-MM-dd HH:mm:ss '),
                }
            ],
    });
    //我的收藏
    Mock.mock('http://127.0.0.1/teachep/public/user/getMyCollectionList',{
        "collection_list|4": [ // 我的课程列表信息
            {
                id:()=>Random.integer( 1, 100 ),
                course_name:()=>Random.ctitle(2,4),
                course_img:() =>Random.dataImage(),
                course_learn_people:()=>Random.integer( 1, 100 ),
                course_introduction:()=>Random.ctitle(15,40),
                created_at:()=>Random.date('yyyy-MM-dd HH:mm:ss '),
            }
        ],
    });
    //修改个人信息接口
    Mock.mock('http://127.0.0.1/teachep/public/user/setMyUserData',{
        "data": "success"
    });
    /**
     * chapter.html
     */
    //获取子章节详情接口
    Mock.mock('http://127.0.0.1/teachep/public/course/getImageTextDetail',{
        image_text_detail:  // 子章节信息
            {
                id:()=>Random.integer( 1, 100 ),
                course_name:"课程名称",
                chapter_name:"章节名称",
                image_text_name:'子章节名称',
                image_text_introduction:()=>Random.ctitle(15,40),
                image_text_detail:()=>Random.ctitle(100,300),
                image_text_video:'视频地址',
                image_text_type:1,
                finish_score:()=>Random.integer( 1, 100 )
            },
    });
    /**
     * login-register
     */
    //login
    Mock.mock('http://127.0.0.1/teachep/public/User/login',{
        data:  // 子章节信息
            {
                state:'success',
                mgs:'登录成功',
                user_data:  // 个人信息获取信息
                    {
                        id:()=>Random.integer( 1, 100 ),
                        user_name:()=>Random.ctitle(2,4),
                        user_job:'用户工作',
                        user_sex:'性别',
                        user_city:[],//数组格式，省市区
                        user_autograph:'个性签名',
                        // user_score:'用户积分',
                        user_headimg:() =>Random.dataImage(),
                        is_identity:'是否认证',
                        user_learning_course_num:"学习课程数"
                    }
            },
    });
    //register
    Mock.mock('http://127.0.0.1/teachep/public/User/register',{
        data:  // 子章节信息
            {
                state:'success',
            },
    });
}
export default useMock;
