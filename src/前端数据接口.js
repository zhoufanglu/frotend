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
      top_title:['渗透测试1','渗透测试1','渗透测试1','渗透测试1','渗透测试1'],  //轮播左边的标题内容，个数需要固定
      module:[{id:1,name:'一级标题1'},{id:2,name:'一级标题2'}],//一级课题标题
      shuffling_img_link:['img_link'],//轮播图片路径
      course_one: [ // 12项  一级标题1下的课程
          {
              id:'',
              name:'我是课程',       //名字
              img:'img_src',        //图片路径
              learn_people:'',      //所学习人数
              type:['a类','b类'],             //所属类别
              difficult:'初级',    //难度级别
              introduction:'入门'   //入门
          },

      ],
      lesson_two: [ // 12项 一级标题2下的课程
          {
              id:'',
              name:'我是课程',       //名字
              img:'img_src',        //图片路径
              learn_people:'',      //所学习人数
              type:'A类',             //所属类别
              difficult:'初级',    //难度级别
              introduction:'入门'   //入门
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
      direction: [//方向
        {id: 1, name: '我是方向'}
      ],
      classify: [//分类
        {id: 2, name: '我是分类'}
      ],
      type: [//类别
        {id: 3, name: '我是类别'}
      ]
    },
    err:{
      msg:'报错信息'
    }
  }
});

ajax({
    title:'获取课程信息接口',
    url:'',
    type:'get',
    request:{
        filter_direction: 12, //传的是id,如果为空,就是全部
        filter_classify:'' , //传的是id,如果为空,就是全部
        filter_type: 12, //传的是id,如果为空,就是全部
        sort:'last/pop',//排序----默认是最新，最新/最热
        hard:' ,1,2,3'//难度----默认全部(为空),分为初级，中级，高级
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
            ]
        },
        err:{
            msg:'报错信息'
        }
    }
});

