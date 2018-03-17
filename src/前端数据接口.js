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
      lesson_title:['一级标题1','一级标题2'],//一级课题标题
      shuffling_img_link:['img_link'],//轮播图片路径
      lessons:[                       //课程信息
        {
          lesson:[
            {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666',id:123},
            {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666',id:123},
            {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666',id:123},
            {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666',id:123},
            {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666',id:123},
            {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666',id:123},
          ]
        },
        {
          lesson:[
            {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666',id:123},
            {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666',id:123},
            {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666',id:123},
            {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666',id:123},
            {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666',id:123},
            {name:'渗透测试入门基础',type:'课程类别',introduction:'入门',level:'初级',imgLink:'',number:'666',id:123},
          ]
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

