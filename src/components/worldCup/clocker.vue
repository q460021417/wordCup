<template>
<span>{{h+':'+m+':'+s}}</span>
</template>

<script>
export default {
  props: ['startTime', 'endTime', 'item'],
  data() {
    return {
      h: '00',
      m: '00',
      s: '00',
      times: 0,
      timer: null
    }
  },
  watch: {
    startTime(newValue, oldValue) {
      this.startTime = newValue;
      this.times = (new Date(this.endTime.replace(/-/g, '/')) - new Date(this.startTime.replace(/-/g, '/'))) / 1000;
      this.timer = setInterval(this.clocker, 1000);
    }
  },
  created() {},
  methods: {
    clocker() {
      if (this.times > 0) {
        this.times--;
        this.h = Math.floor(this.times / (60 * 60));
        this.m = Math.floor(this.times / 60) - (this.h * 60);
        this.s = Math.floor(this.times) - (this.h * 60 * 60) - (this.m * 60);
      } else if (this.times <= 0) {
        clearInterval(this.timer);
        this.$emit("clockFinish", this.item);
      }
      if (this.h <= 9) this.h = "0" + this.h;
      if (this.m <= 9) this.m = "0" + this.m;
      if (this.s <= 9) this.s = "0" + this.s;
      if (this.times <= 0) {
        this.h = '00'
        this.m = '00'
        this.s = '00'
      }
    }
  },
  mounted() {}
}
</script>

<style lang="css">
</style>
