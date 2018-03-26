//引入mockjs
import Mock from "mockjs"
//使用mockjs模拟数据
let useMock = (isOpenMock) =>{
    if(isOpenMock === false) return false;

    let Random = Mock.Random;
    /**
     * home.html
     */
    Mock.mock('/api/data',{
        'top_title|4':[()=>Random.ctitle()],
        'module|2': [
            {
                id: () => Random.integer(1, 100),
                module_name: () => Random.ctitle()
            }
        ],
        'shuffling_img_link|4':[()=>Random.dataImage()],
        'course_one|12':[{
            id:()=>Random.integer( 1, 100 ),
            course_name:()=>Random.ctitle(),
            'course_type|3':[()=>Random.ctitle()],
            course_introduction:()=>Random.ctitle(),
            course_difficult:'初级 ',
            course_img:()=>Random.dataImage(),
            course_learn_people:()=>Random.integer( 1, 9999 )
        }],
        'course_two|12':[{
            id:()=>Random.integer( 1, 100 ),
            course_name:()=>Random.ctitle(),
            'course_type|3':[()=>Random.ctitle()],
            course_introduction:()=>Random.ctitle(),
            course_difficult:'初级 ',
            course_img:()=>Random.dataImage(),
            course_learn_people:()=>Random.integer( 1, 9999 )
        }]
    });

    /**
     * course.html
     */
    Mock.mock('/api/course/course_type',{
        'direction|6':[{name:()=>Random.ctitle(),id:()=>Random.integer( 1, 9999 )}], //方向
        'classify|20':[{name:()=>Random.ctitle(),id:()=>Random.integer( 1, 9999 )}],   //分类
        'type|7':[{name:()=>Random.ctitle(),id:()=>Random.integer( 1, 9999 )}]
    });

    Mock.mock('/api/course/all_course',{
        'course|30': [
            {
                id: () => Random.integer(1, 100),
                course_name: () => Random.ctitle(),
                'course_type|3': [() => Random.ctitle()],
                'course_introduction': () => Random.ctitle() ,
                course_difficult: '初级 ',
                course_img: () => Random.dataImage(),
                course_learn_people: () => Random.integer(1, 9999)
            }
        ]
    });

    /**
     * course_detail.html
     */
    Mock.mock('/api/course_detail/course',{
      'course':{
          id: '',
          course_name: () => Random.ctitle(),       //课程名字
          course_img: [() => Random.ctitle()],        //课程图片路径
          course_learn_people: () => Random.integer(1, 9999),      //课程所学习人数
          course_type: ['a类', 'b类'],  //所属类别(s数组)
          course_difficult: '初级',    //难度级别
          'course_introduction': () => Random.ctitle()    //简介
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
    Mock.mock('/api/course_detail/user_rank',{
        'user|5':[
            {
                id:()=>Random.integer( 1, 100 ),
                user_name:()=>Random.ctitle(),
                score:()=>Random.integer( 1, 100 ),
            }
        ]
    });

}
export default useMock;
