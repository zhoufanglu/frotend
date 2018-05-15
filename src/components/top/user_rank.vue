<template>
    <div class="user-rank">
        <teach-head  :show_hide_vis="show_hide_vis" ></teach-head>
        <div class="content">
            <div class="user-table">
                <template>
                    <el-table :data="user_data" style="width: 100%" header-align="center">
                        <el-table-column prop="rank_number" label="名次" width="100" center>
                        </el-table-column>
                        <el-table-column prop="user_name" label="姓名" width="200">
                        </el-table-column>
                        <el-table-column prop="score"label="积分" width="200">
                        </el-table-column>
                        <el-table-column prop="unit" width="300" label="单位">
                        </el-table-column>
                        <el-table-column prop="completed_course_number" width="120"  label="完成课程数">
                        </el-table-column>
                        <el-table-column prop="join_time" width="300" label="加入时间">
                        </el-table-column>
                    </el-table>
                </template>
                <!--分页-->
                <div class="paging">
                    <el-pagination background layout="prev, pager, next"@current-change="getUserRank()" :page-size="paging.page_all_num" :current-page.sync="paging.now_page"  :total="paging.data_number"></el-pagination>
                </div>
            </div>
        </div>
        <teach-foot></teach-foot>
    </div>
</template>
<script>
    export default {
        name: 'personal-center',
        data(){
            return{
                //css
                show_hide_vis:'show-vis',
                user_data:[],
                paging:{
                    page_all_num:30,//一页多少数据
                    now_page:1,     //当前页码
                    data_number:300 //一共多少数据
                }
            }
        },
        methods:{
            getUserRank(){
                this.$fetch('course/getUserSortList', {num: this.paging.page_all_num, type: '', pagenow: this.paging.now_page}).then((response) => {
                    this.user_data = response.user;
                    this.paging.data_number = response.pageallnum;
                    console.log(this.user_data)
                })
                    .catch(err =>{
                        console.log(err);
                    });
            }
        },
        created(){
            this.getUserRank();
        }
    }
</script>
<style scoped type="text/scss" lang="scss">
   .content{
       @include vertical-center;
   }
</style>
<style  type="text/scss" lang="scss">
    .user-rank{
        .paging{
            .el-pagination {
                text-align: center;
                margin-top: 30px;
            }
        }
        .personal-center{
            .cell{
                text-align: center;
            }
        }
    }
</style>
