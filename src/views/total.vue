<template>
  <div class="mask">
    <div class="main">
      <div class="title">电容生产概况</div>
      <div><span>订单：</span><span>100000</span></div>
      <div>
        <span>已生产： </span><span>{{ pro.produced }}</span>
      </div>
      <div>
        <span>待生产：</span><span>{{ pro.produce }}</span>
      </div>
      <div>
        <span>良率：</span><span>{{ pro.perc }}</span>
      </div>
      <!-- <div>订单：<span>100000</span></div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pro: {
        total: 100000,
        produced: 0,
        produce: 0,
        perc: 0,
      },
    };
  },
  methods: {
    //获取后台数据的方法
    ajax() {
      this.$jsonp("http://192.168.0.102:8888/total", null, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          this.pro.produced = data.produced;
          this.pro.produce = data.produce;
          this.pro.perc = data.perc;
        }
      });

      // this.$axios.get("http://localhost:8889").then((data) => {
      //   consloe.log("----");
      //   console.log(data);
      // });
    },
  },

  mounted() {
    this.ajax();
  },
};
</script>

<style scoped>
.mask {
  position: absolute;
  margin: 0;
  padding: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #eee;
}

.main {
  width: 40%;
  height: 80%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 1px solid #000;
  background-color: #fff;
  padding: 10px 50px 30px 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: #000;
  font-size: 2em;
}

.title {
  padding-left: 50px;
  color: red;
}
.main div {
  width: 100%;
}
.main div span {
  display: inline-block;
  width: 50%;
}

.main div span:nth-child(2) {
  color: #f00;
}
</style>
