//引入mockjs
import Mock from "mockjs"
//使用mockjs模拟数据
let useMock = (isOpenMock) =>{
    if(isOpenMock === false) return false;

    let Random = Mock.Random;

    Mock.mock('/api/data',{
        'lessons|2': [{
            'lesson|6':[{
                name:()=>Random.ctitle(),
                type:'类别',
                introduction:()=>Random.ctitle(),
                level:'初级 ',
                imgLink:Random.dataImage(),
                number:Random.integer( 1, 9999 )
            }],
        }]
    });



}
export default useMock;