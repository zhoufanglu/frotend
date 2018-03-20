//引入mockjs
import Mock from "mockjs"
//使用mockjs模拟数据
let useMock = (isOpenMock) =>{
    if(isOpenMock === false) return false;

    let Random = Mock.Random;
    //home.html
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
    //lesson.html
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
                course_introduction: () => Random.ctitle(),
                course_difficult: '初级 ',
                course_img: () => Random.dataImage(),
                course_learn_people: () => Random.integer(1, 9999)
            }
        ]
    });


}
export default useMock;