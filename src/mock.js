//引入mockjs
import Mock from "mockjs"
//使用mockjs模拟数据
let useMock = (isOpenMock) =>{
    if(isOpenMock === false) return false;

    let Random = Mock.Random;

    Mock.mock('/api/data',{
        'top_title|4':[()=>Random.ctitle()],
        'lesson_title|2':[()=>Random.ctitle()],
        'shuffling_img_link|4':[()=>Random.dataImage()],
        'lesson_one|12':[{
            name:()=>Random.ctitle(),
            type:'类别',
            introduction:()=>Random.ctitle(),
            level:'初级 ',
            img_link:()=>Random.dataImage(),
            number:()=>Random.integer( 1, 9999 )
        }],
        'lesson_two|12':[{
            name:()=>Random.ctitle(),
            type:'类别',
            introduction:()=>Random.ctitle(),
            level:'初级 ',
            img_link:()=>Random.dataImage(),
            number:()=>Random.integer( 1, 9999 )
        }]
    });

    Mock.mock('/api/lesson/lesson_type',{
        'direction|6':[{name:()=>Random.ctitle(),id:()=>Random.integer( 1, 9999 )}], //方向
        'classify|20':[{name:()=>Random.ctitle(),id:()=>Random.integer( 1, 9999 )}],   //分类
        'type|7':[{name:()=>Random.ctitle(),id:()=>Random.integer( 1, 9999 )}]
    });



}
export default useMock;