<template>
  <div>
    <img :src="src" alt="" />
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    lastId: Number,
    type: String,
  },
  data() {
    return {
      src: "",
    };
  },
  mounted() {
    this.ajax(this.lastId, this.id, this.type);
    //获取对应图片信息
    // this.ajax(this.lastId, this.id);
    // console.log(this.id,this.lastId,this.type);
  },
  methods: {
    ajax(lastId, id, type) {
      if (type == "bad") {
        this.$jsonp(
          `http://192.168.0.102:8888/badimg?machine=${lastId}&id=${id}`,
          null,
          (err, data) => {
            if (err) {
              console.log(err);
            } else {
              this.src = data;
            }
          }
        );
      } else if (type == "good") {
        this.$jsonp(
          `http://192.168.0.102:8888/goodimg?machine=${lastId}&id=${id}`,
          null,
          (err, data) => {
            if (err) {
              console.log(err);
            } else {
              this.src = data;
            }
          }
        );
      }
    },
  },
};
</script>

<style scoped>
div {
  width: 400px;
  height: 400px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  /* background-color: #0ff; */
}

img {
  width: 100%;
}
</style>
