<template>
  <div class="wrapper">
    <div class="log">请登录</div>
    <div class="first">
      <span class="user">userName:</span
      ><input type="text" v-model="userName" />
    </div>
    <div class="second">
      <span class="user">passWord:</span
      ><input type="password" v-model="passWord" />
    </div>
    <div class="third">
      <button class="btn" @click="login">登录</button>
    </div>
    <div v-show="show" class="msg">用户名或密码有误！</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      passWord: "",
      show: false,
      timer: null,
    };
  },

  methods: {
    login() {
      if (
        this.userName === this.$store.state.adminName &&
        this.passWord === this.$store.state.adminPwd
      ) {
        localStorage.setItem("adminName", JSON.stringify(this.userName));
        localStorage.setItem("adminPwd", JSON.stringify(this.passWord));
        this.$router.push("/table1");
      } else if (
        this.userName === this.$store.state.clientName &&
        this.passWord === this.$store.state.clientPwd
      ) {
        localStorage.setItem("clientName", JSON.stringify(this.userName));
        localStorage.setItem("clientPwd", JSON.stringify(this.passWord));
        this.$router.push("/total");
      } else {
        this.show = true;
        this.passWord = "";
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.show = false;
        }, 2000);
        return;
      }
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}
.wrapper {
  width: 50%;
  height: 400px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 1px solid #000;
  box-sizing: border-box;
  padding: 40px;
}

.log {
  height: 50px;
  font-size: 40px;
  line-height: 50px;
  text-align: center;
  color: #444;
}

.first {
  height: 30%;
  /* background-color: aqua; */
  margin-bottom: 10px;
  padding-left: 20px;
  padding-top: 40px;
  box-sizing: border-box;
}
.second {
  height: 30%;
  /* background-color: aqua; */
  margin-bottom: 10px;
  padding-left: 20px;
  padding-top: 10px;
  box-sizing: border-box;
}
.third {
  height: 20%;
  /* background-color: aqua; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.user {
  display: inline-block;
  width: 40%;
  height: 40px;
  line-height: 40px;
  font-size: 30px;
}
.pwd {
  display: inline-block;
  width: 40%;
  height: 40px;
  line-height: 40px;
  font-size: 30px;
}
.first input {
  width: 50%;
  height: 30px;
  font-size: 30px;
  line-height: 30px;
}
.second input {
  width: 50%;
  height: 30px;
  font-size: 30px;
  line-height: 30px;
}
.btn {
  width: 100px;
  height: 40px;
  font-size: 30px;
  line-height: 30px;
}

.msg {
  width: 40%;
  border: 1px solid rgba(250, 0, 0, 0.5);
  border-radius: 4px;
  text-align: center;
  line-height: 30px;
  color: rgba(255, 0, 0, 1);
  height: 30px;
  background-color: rgba(240, 240, 240, 0.6);
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 270px;
  transition: all 0.5s;
}
</style>
