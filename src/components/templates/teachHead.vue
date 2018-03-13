<template>
    <div class="teach-head">
        我是头
        <div class="block">
            <span>页数较少时的效果</span>
            <el-pagination
                    layout="prev, pager, next"
                    :total="50">
            </el-pagination>
        </div>
        <div class="block">
            <span >大于 7 页时的效果</span>
            <el-pagination
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "teachHead"
    }
</script>

<style scoped lang="scss">
    .teach-head{
       color: $theme;
    }
</style>
