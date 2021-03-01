<template>
  <ul>
    <li v-for="img in imgs" :key="img.id">
      {{ img.name }}
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      imgs: [
        {
          id: 1,
          name: "不良品1",
          url: "",
        },
      ],
    };
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
  background-color: rgba(255, 255, 255);
  margin: 5% 20%;
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
}
</style>
