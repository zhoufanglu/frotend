<template>
    <div class="teach-foot" :class="[bg_color,text_color]" >© 2018 abcdefg.com  京ICP备 12003892号-11</div>
</template>

<script>
    export default {
        name: "foot",
        props:['bg_color','text_color']
    }
</script>

<style scoped type="text/scss" lang="scss">
    .teach-foot{
        margin-top: 30px;
        text-align: center;
        height: 80px;
        line-height: 80px;
        color: $white;
        width: 100%;
        border-top: solid 1px #999999;
        background-color: $theme;
    }
</style>
