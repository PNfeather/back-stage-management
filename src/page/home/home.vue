<template>
  <div name='home' class="fillcontain">
    <head-top></head-top>
    <section class="welcome fillcontain">
      <p style="margin-top: -100px">欢迎来到</p>
      <p>传而习后台管理系统</p>
    </section>
  </div>
</template>

<script type='text/babel'>
  export default {
    name: 'home',
    data () {
      return {
      };
    },
    created () {},
    mounted () {},
    computed: {},
    watch: {},
    methods: {},
    components: {
    }
  };
</script>
<style scoped lang="less">
  [name = 'home']{
    .welcome{
      background-color: #F9FAFC;
      color: #666;
      font-size: 34px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
</style>
