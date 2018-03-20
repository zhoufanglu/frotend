//前端数据接口文档

/**
 * home.html
 */
ajax({
  title:'获取课程信息接口',
  url:'',
  type:'get',
  request:{

  },
  res:{
    ok:{
        /*
        和获取分类接口数据相同请求数据分类接口
      top_title:[{//(三级菜单)
          id:'课程分类id',
          couser_type_name:'课程分类名称',
      }],  //轮播左边的标题内容，个数需要固定*/
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
              course_difficult:'初级',    //难度级别xxx
              course_introduction:'入门'   //入门xxxxx
          },

      ],
      lesson_two: [ // 12项 一级标题2下的课程
          {
              id:'',
              course_name:'我是课程',       //名字
              course_img:'img_src',        //图片路径
              course_learn_people:'',      //所学习人数
              course_type:'A类',             //所属类别
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
 * lesson.html
 */
ajax({
  title:'获取课程所有类别接口',
  url:'',
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
    url:'',
    type:'get',
    request:{
        filter_direction: 12, //传的是id,如果为空,就是全部（方向-->一级分类）
        filter_classify:'' , //传的是id,如果为空,就是全部（分类-->二级级分类）
        filter_type: 12, //传的是id,如果为空,就是全部（类型-->三级分类）
        sort:'last/pop',//排序----默认是最新，最新/最热（这个最新最热数据没有这个标签）
        hard:' ,1,2,3',//难度----默认全部(为空),分为初级，中级，高级
        nowpage:1,//当前页码
        nowpagenum:10//每页多少数据
    },
    res:{
        ok:{
            lesson:[
                {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666',id:123},
                {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666',id:123},
                {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666',id:123},
                {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666',id:123},
                {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666',id:123},
                {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666',id:123},
            ],
            pageallnum:100//一共多少条数据
        },
        err:{
            msg:'报错信息'
        }
    }
});

