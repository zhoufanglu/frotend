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
        height: 60px;
        line-height: 60px;
        color: $white;
        width: 100%;
        border-top: solid 1px #999999;
        background-color: $theme;

        position: absolute; /*相对于父元素contanier定位*/
        bottom: 0;/*始终距离它的父元素的底部为0px.则是处于父元素的最底*/
    }
</style>
