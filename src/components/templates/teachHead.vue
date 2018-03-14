<template>
    <div class="teach-head">
        <div class="name">
            教学管理系统
        </div>
        <div class="user-info">
            <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                     <span class="head-img">
                         <img :src="headSrcLink" alt="" width="100%" height="100%">
                     </span>
                     <span class="nick-name">{{nickName}}</span>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人信息</el-dropdown-item>
                        <el-dropdown-item>注销</el-dropdown-item>
                  </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    export default {
        name: "teachHead",
        props:['nickName','headSrcLink']
    }
</script>

<style scoped lang="scss" type="text/scss">
    .teach-head{
       @include vertical-center;
        justify-content: space-between;
        padding: 0 40px;
        height: $head-height;
        border-bottom: solid 1px $stable;
        .name{
            font-size: 24px;
            font-weight: bolder;
            letter-spacing: 6px;
        }
    }
    .el-dropdown-link{
        @include vertical-center;
        &:hover{
            cursor: pointer;
        }
        .nick-name{
            font-size: 20px;
        }
        .head-img{
            overflow: hidden;
            display: flex;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 20px;
        }
    }
</style>
