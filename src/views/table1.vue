<template>
  <!-- 第一张表 -->
  <div class="main">
    <div class="head1">
      <span>机台状况</span>
    </div>
    <div class="content1">
      <table class="table1">
        <thead>
          <tr>
            <th>机器名</th>
            <th>批号</th>
            <th>料号</th>
            <th>本批已生产</th>
            <th>待生产</th>
            <th>良率</th>
            <th>查看</th>
          </tr>
        </thead>
        <tbody v-for="machine in machines" :key="machine.id">
          <tr>
            <td>{{ machine.id }}</td>
            <td>{{ machine.number }}</td>
            <td>{{ machine.num }}</td>
            <td>{{ machine.produced }}</td>
            <td>{{ machine.produce }}</td>
            <td>{{ machine.perc }}</td>
            <td>
              <router-link
                :to="{
                  name: 'Table2',
                  params: { id: machine.id },
                  query: {
                    lastId: machine.id,
                    lastPage: lists.nowPage,
                    nowPage: 1,
                  },
                }"
              >
                <button class="btn-check" type="button">
                  查看明细
                </button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <div class="button">
      <button class="up" v-show="lists.showUp" @click="pre">上一页</button>
      <button class="down" v-show="lists.showDown" @click="next">下一页</button>
    </div> -->
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
  </div>
</template>

<script>
import { mockMain } from "../assets/data.js";
mockMain();
export default {
  data() {
    return {
      machines: [
        // {
        //     id: 1,
        //     number: 1,
        //     num: 100000,
        //     produced: 10000,
        //     produce: 20000,
        //     perc: 90,
        // },
        // {
        //     id: 2,
        //     number: 2,
        //     num: 100001,
        //     produced: 10000,
        //     produce: 20000,
        //     perc: 90,
        // },
        // {
        //     id: 3,
        //     number: 3,
        //     num: 100002,
        //     produced: 10000,
        //     produce: 20000,
        //     perc: 90,
        // },
      ],

      //两张表传递的数据
      lists: {
        nowPage: 1,
        size: 10,
        totalPage: 1,
        // showUp: true,
        // showDown: true,
      },
    };
  },
  mounted() {
    this.ajax();

    //为保留第一张表页面而用的参数传递
    if (this.$route.params.nowPage) {
      this.lists.nowPage = this.$route.params.nowPage;
    }

    //上一页按钮的显示
    // if (this.lists.nowPage == 1) {
    //   this.lists.showUp = false;
    // }

    // //下一页按钮的显示
    // if (this.lists.nowPage == this.lists.totalPage) {
    //   this.lists.showDown = false;
    // }
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
    //获取后台数据的方法
    ajax() {
      this.$jsonp(
        `http://localhost:8888/all?size=${this.lists.size}&nowPage=${this.lists.nowPage}`,
        null,
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            // console.log(data);
            this.machines = data.all;
            this.lists.totalPage = Math.ceil(data.total / this.lists.size);
            // console.log(data);
          }
        }
      );
      // this.$axios
      //   .post(
      //     "findMain.json",
      //     {
      //       size: this.lists.size, //每页多少条
      //       nowPage: this.lists.nowPage, //当前第几页
      //     }
      //   )
      //   .then((data) => {
      //     this.machines = data.data;
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
    //   this.ajax();
    // },

    // //下一页
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
    //   this.ajax();
    // },

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

.main,
.detail {
  height: 100%;
  width: 100%;
  /* background-color: cadetblue; */
}

.main .head1 {
  width: 100%;
  height: 50px;
  background-color: #666;
  text-align: center;
  line-height: 50px;
}

.main .head1 span {
  color: #fff;
  font-size: 30px;
}

.main .content1 {
  width: 100%;
  height: auto;
  background-color: #eee;
}

.main .content1 .table1 {
  width: 100%;
  text-align: center;
  line-height: 30px;
}

.main .content1 .table1 thead {
  background-color: #e3e8ee;
  color: #646987;
}

.main .content1 .table1 tbody {
  background-color: #fff;
}

.main .content1 .table1 tbody button {
  background-color: #59f;
  width: 6em;
  height: 1.8em;
  color: #fff;
  cursor: pointer;
}

.main .button {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
}

.main .button .up {
  margin-right: 10px;
  margin-left: 10px;
}

.main .button .down {
  margin-left: 10px;
  margin-right: 10px;
}

.el-pagination {
  text-align: center;
}
</style>
