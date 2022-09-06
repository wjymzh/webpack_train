<template>

  <div class="style">
     {{ str }}
    <canvas
      id="myCanvas"
      width="600"
      height="400"
      ref="can"
      style="background-color: red"
    ></canvas>

  </div>

</template>

<script>
export default {
  name: "App",
  data() {
    return {
      str: "牛逼",
    };
  },
  mounted() {
    console.log("完成挂载");
  },
  method: {},
};
</script>

<style lang="less">
  .style{
    color: red;
  }
</style>
