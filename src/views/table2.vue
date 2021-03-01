<template>
  <div>
    <!-- 第二张表 -->
    <div class="detail">
      <div class="head2">
        <span>生产状况明细</span>
      </div>
      <div class="content2">
        <table class="table2">
          <thead>
            <tr>
              <th rowspan="2">参数设定</th>
              <th>钉花数量</th>
              <th colspan="3">花瓣残缺</th>
              <th>钉偏</th>
              <th>导针偏斜</th>
              <th>E部距离</th>
              <th>冲孔错位</th>
              <th rowspan="2">判定结果</th>
              <th rowspan="2">判定时间</th>
            </tr>
            <tr>
              <th>4</th>
              <th>495像素</th>
              <th>110像素</th>
              <th>0.25</th>
              <th>0.7mm</th>
              <th>20.0°</th>
              <th>1.7~3.9mm</th>
              <th>370像素</th>
            </tr>
            <tr>
              <th>产品编号</th>
              <th>钉花数量</th>
              <th colspan="3">花瓣残缺</th>
              <th>钉偏</th>
              <th>导针偏斜</th>
              <th>E部距离</th>
              <th>冲孔错位</th>
              <th>判定</th>
              <th>时间</th>
            </tr>
          </thead>
          <tbody v-for="pro in pros" :key="pro.id">
            <tr>
              <td>{{ pro.id }}</td>
              <td>{{ pro.num }}</td>
              <td>{{ pro.width }}</td>
              <td>{{ pro.height }}</td>
              <td>{{ pro.scale }}</td>
              <td>{{ pro.shift }}</td>
              <td>{{ pro.degree }}</td>
              <td>{{ pro.distance }}</td>
              <td>{{ pro.area }}</td>
              <td @click="badImg(pro)" style="cursor: pointer;">
                {{ pro.problem }}
              </td>
              <td>{{ pro.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="button">
        <router-link :to="{ name: 'Table1', params: { nowPage: lists.page } }">
          <button class="btn3">返回</button>
        </router-link>

        <!-- <button class="up" v-show="lists.showUp" @click="pre">上一页</button> -->
        <button class="btn1" @click="good">查看良品明细</button>
        <!-- <button class="btn2" @click="bad">查看不良品图片</button> -->
        <!-- <button class="down" v-show="lists.showDown" @click="next">
          下一页
        </button> -->
      </div>
    </div>
    <my-mask v-if="showMask" @click.native="close"></my-mask>
    <my-good v-if="showGood" :lastId="lists.lastId"></my-good>
    <my-bad v-if="showBad"></my-bad>
    <div class="block">
      <el-pagination
        :hide-on-single-page="true"
        @current-change="handleCurrentChange"
        :current-page="lists.nowPage"
        layout="prev, pager, next"
        :total="lists.totalPage * 10"
      >
      </el-pagination>
    </div>
    <my-img v-if="showImg" :id="lists.id" :lastId="lists.lastId" :type="'bad'">
    </my-img>
  </div>
</template>

<script>
import { mockDetail } from "../assets/data.js";
mockDetail();

export default {
  data() {
    return {
      pros: [
        // {
        //   id: 1,
        //   num: 5,
        //   width: 372,
        //   height: 384,
        //   scale: 0.65286,
        //   shift: 0.4,
        //   degree: "6.94°",
        //   distance: 2.66,
        //   area: 231,
        //   problem: "钉花少，钉偏",
        //   date: "2020/06/30/14:49:11",
        //   time: "@time",
        // },
        // {
        //   id: 2,
        //   num: 5,
        //   width: 372,
        //   height: 384,
        //   scale: 0.65286,
        //   shift: 0.4,
        //   degree: "6.94°",
        //   distence: 2.66,
        //   pareaarproblema9: 231,
        //   parproblema9: "钉花少，钉偏",
        //   date: "2020/06/30/14:49:11",
        //   time: "@time",
        // },
        // {
        //   id: 3,
        //   num: 5,
        //   width: 372,
        //   height: 384,
        //   scale: 0.65286,
        //   shift: 0.4,
        //   degree: "6.94°",
        //   distence: 2.66,
        //   pareaarproblema9: 231,
        //   parproblema9: "钉花少，钉偏",
        //   date: "2020/06/30/14:49:11",
        //   time: "@time",
        // },
      ],
      lists: {
        nowPage: 1,
        size: 10,
        totalPage: 1,
        // showUp: true,
        // showDown: true,
        page: this.$route.params.nowPage,
        id: 1,
        lastId: 1,
      },
      showMask: false,
      showGood: false,
      showBad: false,
      showImg: false,
    };
  },

  components: {
    "my-mask": () => import("../components/mask"),
    "my-good": () => import("../components/produceGood"),
    "my-bad": () => import("../components/produceBad"),
    "my-img": () => import("../components/img"),
  },

  mounted() {
    // console.log(typeof this.lists.lastId)
    this.lists.lastId = this.$route.params.id;
    this.ajax(this.$route.params.id);
    // if (this.lists.nowPage == 1) {
    //   this.lists.showUp = false;
    // }
    // if (this.lists.nowPage == this.lists.totalPage) {
    //   // console.log("---");
    //   this.lists.showDown = false;
    // }
    //获取对应机台id的数据写在这，然后改掉原数据
  },
  // updated() {
  //   if (this.lists.nowPage == 1) {
  //     this.lists.showUp = false;
  //   } else {
  //     this.lists.showUp = true;
  //   }
  //   if (this.lists.nowPage == this.lists.totalPage) {
  //     this.lists.showDown = false;
  //   } else {
  //     this.lists.showDown = true;
  //   }
  // },

  methods: {
    ajax(id) {
      this.$jsonp(
        `http://192.168.0.102:8888/detail?size=${this.lists.size}&id=${id}&nowPage=${this.lists.nowPage}`,
        {
          // params: {
          //   id,
          //   size: this.lists.size,
          //   nowPage: this.lists.nowPage,
          // },
        },
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            this.pros = data.result;
            this.lists.totalPage = Math.ceil(data.count / this.lists.size);
            // console.log(this.lists.totalPage,this.lists.nowPage);
          }
        }
      );
      // this.$axios
      //   .post("findDetail.json", {
      //     id, //哪个机台
      //     size: this.lists.size, //每页多少条
      //     nowPage: this.lists.nowPage, //当前第几页
      //   })
      //   .then((data) => {
      //     this.pros = data.data;
      //     // this.totalPage = data.totalPage;
      //   });
    },

    //上一页
    // pre() {
    //   if (this.lists.nowPage == 2) {
    //     this.lists.showUp = false;
    //     this.lists.nowPage -= 1;
    //   } else {
    //     this.lists.nowPage -= 1;
    //   }
    //   if (!this.lists.showDown) {
    //     this.lists.showDown = true;
    //   }
    //   this.ajax(this.$route.params.id);
    // },

    //下一页
    // next() {
    //   if (this.lists.nowPage == this.lists.totalPage - 1) {
    //     this.lists.showDown = false;
    //     this.lists.nowPage += 1;
    //   } else {
    //     this.lists.nowPage += 1;
    //   }
    //   if (!this.lists.showUp) {
    //     this.lists.showUp = true;
    //   }
    //   this.ajax(this.$route.params.id);
    // },

    //良品图片蒙层
    good() {
      this.showMask = true;
      this.showGood = true;
    },

    //不良品图片蒙层
    bad() {
      this.showMask = true;
      this.showBad = true;
    },

    close() {
      this.showMask = false;
      this.showGood = false;
      this.showBad = false;
      this.showImg = false;
    },

    badImg(self) {
      if (self.problem != "OK") {
        this.lists.id = self.id;
        this.showMask = true;
        this.showImg = true;
      }
    },
    handleCurrentChange(nowPage) {
      this.lists.nowPage = nowPage;
      this.ajax(this.$route.params.id);
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}

html,
body {
  height: 100%;
}

.detail {
  height: 100%;
  width: 100%;
  /* background-color: cadetblue; */
}

.detail .head2 {
  width: 100%;
  height: 50px;
  background-color: #666;
  text-align: center;
  line-height: 50px;
}

.detail .head2 span {
  color: #fff;
  font-size: 30px;
}

.detail .content2 {
  width: 100%;
  height: auto;
  background-color: #eee;
}

.detail .content2 .table2 {
  width: 100%;
  text-align: center;
  line-height: 30px;
}

.detail .content2 .table2 thead tr:last-child {
  background-color: #e3e8ee;
  color: #646987;
}

.detail .content2 .table2 thead {
  background-color: greenyellow;
  color: #f33;
}

.detail .content2 .table2 tbody {
  background-color: #fff;
}

.detail .button {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
}

.detail .button .btn1 {
  margin-right: 10px;
  margin-left: 10px;
}

.detail .button .btn2 {
  margin-left: 10px;
  margin-right: 10px;
}

.detail .button .btn3 {
  margin-right: 10px;
}

.el-pagination {
  text-align: center;
}
</style>
