<template>
  <div>
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="active"
      align-center
      process-status="wait"
      style="margin-bottom: 40px"
    >
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="提交审核"></el-step>
    </el-steps>

    <!-- 课程信息发布 -->
    <div>
      <information v-if="active == 1"></information>
      <chapter v-if="active == 2"></chapter>
      <publish v-if="active == 3"></publish>
    </div>

    <el-form>
      <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button type="primary" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Information from "./components/info.vue";
import Chapter from "./components/chapter.vue";
import Publish from "./components/publish.vue";
import eduSubject from "@/api/edusubject/edusubject";
export default {
  components: {
    Information,
    Chapter,
    Publish,
  },

  data() {
    return {
      active: 1,

      //   如何接收子组件传值  TODO
      courseInfo: {},
    };
  },

  created() {},

  methods: {
    previous() {
      if (this.active > 1) {
        this.active--;
      }
    },
    next() {
      if (this.active < 3) {
        this.active++;
      }
      this.courseInfo = Information.courseInfo;
      console.log(this.courseInfo);
      //   this.$router.push({ path: "/edusubject/chapter/1" });
    },
  },
};
</script>

<style>
</style>