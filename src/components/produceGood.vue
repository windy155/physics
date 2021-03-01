<template>
  <div>
    <ul>
      <li v-for="img in imgs" :key="img.id" @click="goodImg(img)">
        {{ img.name }}
      </li>
    </ul>
    <my-mask v-if="showMask" @click.native="close"></my-mask>
    <my-img
      v-if="showImg"
      :id="lists.id"
      :lastId="lastId"
      :type="'good'"
    ></my-img>
  </div>
</template>

<script>
export default {
  props: {
    lastId: Number,
  },
  data() {
    return {
      imgs: [
        {
          id: 1,
          name: "良品1",
          url: "",
        },
        {
          id: 2,
          name: "良品2",
          url: "",
        },
        {
          id: 3,
          name: "良品3",
          url: "",
        },
        {
          id: 4,
          name: "良品4",
          url: "",
        },
        {
          id: 5,
          name: "良品5",
          url: "",
        },
        {
          id: 6,
          name: "良品6",
          url: "",
        },
        {
          id: 7,
          name: "良品7",
          url: "",
        },
        {
          id: 8,
          name: "良品8",
          url: "",
        },
        {
          id: 9,
          name: "良品9",
          url: "",
        },
        {
          id: 10,
          name: "良品10",
          url: "",
        },
        {
          id: 11,
          name: "良品11",
          url: "",
        },
        {
          id: 12,
          name: "良品12",
          url: "",
        },
        {
          id: 13,
          name: "良品13",
          url: "",
        },
        {
          id: 14,
          name: "良品14",
          url: "",
        },
        {
          id: 15,
          name: "良品15",
          url: "",
        },
        {
          id: 16,
          name: "良品16",
          url: "",
        },
        {
          id: 17,
          name: "良品17",
          url: "",
        },
        {
          id: 18,
          name: "良品18",
          url: "",
        },
        {
          id: 19,
          name: "良品19",
          url: "",
        },
        {
          id: 20,
          name: "良品20",
          url: "",
        },
      ],
      showImg: false,
      showMask: false,
      lists: {
        id: 0,
      },
    };
  },
  components: {
    "my-img": () => import("./img"),
    "my-mask": () => import("./mask"),
  },
  mounted() {
    this.ajax(this.lastId);
  },
  methods: {
    ajax(machine) {
      this.$jsonp(
        `http://192.168.0.102:8888/goodmount?machine=${machine}`,
        null,
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data)
            let arr = [];
            data.address.forEach((ele, index) => {
              arr.push({
                id: ele.id,
                name: "良品" + ele.id,
              });
            });
            this.imgs = arr;
          }
        }
      );
    },
    goodImg(self) {
      this.lists.id = self.id;
      this.showMask = true;
      this.showImg = true;
    },
    close() {
      this.showImg = false;
      this.showMask = false;
    },
  },
};
</script>

<style scoped>
ul {
  position: absolute;
  top: 0;
  left: 0;
  width: 60%;
  height: 80%;
  padding: 10px;
  background-color: rgb(255, 255, 255);
  margin: 5% 20%;
  overflow: scroll;
}

li {
  list-style: none;
  /* background-color: hotpink; */
  height: 20px;
  width: 60px;
  text-align: center;
  line-height: 20px;
  margin: 10px 10px;
  float: left;
  cursor: pointer;
}

li:hover {
  color: aqua;
}
</style>
