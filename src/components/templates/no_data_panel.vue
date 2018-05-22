<template>
    <div class="no-data-panel">
        <i class="icon-font">&#xe627;</i>
        <span>{{tip}}</span>
    </div>
</template>
<script>
    export default {
        name: 'no-data-panel',
        props: ['tip']
    }
</script>
<style scoped type="text/scss" lang="scss">
    .no-data-panel{
        width: 100%;
        min-height: 200px;
        @include vertical-center;
        justify-content: center!important;
        font-size: 24px;
        color: $stable;
        //background-color: $white;
        i{
            font-size: 24px;
            margin-right: 15px;
            @include vertical-center;
        }
    }
</style>
