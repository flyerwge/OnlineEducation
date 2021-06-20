<template>
  <div>
    <!-- 课程基本信息表单 -->
    <el-card>
      <el-form label-width="120px">
        <el-form-item label="课程标题">
          <el-input v-model="courseInfo.title"></el-input>
        </el-form-item>

        <!-- 所属分类 -->

        <!-- 课程讲师 -->

        <el-form-item label="总课时">
          <el-input-number
            :min="0"
            v-model="courseInfo.lessonNum"
            controls-position="right"
          ></el-input-number>
        </el-form-item>

        <!-- 课程简介 -->

        <!-- 课程封面 -->

        <el-form-item label="课程价格">
          <el-input-number :min="0" controls-position="right"></el-input-number>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Information",
  data() {
    return {
      courseInfo: {
        title: "",
        subjectId: "",
        teacherId: "",
        lessonNum: 0,
        description: "",
        cover: "",
        price: 0,
      },
    };
  },
};
</script>

<style>
</style>