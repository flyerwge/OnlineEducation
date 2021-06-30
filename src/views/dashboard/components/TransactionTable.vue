<template>
  <el-table :data="topCourse" style="width: 100%; padding-top: 15px">
    <!-- 显示推荐课程部分信息后期美化     TODO -->

    <el-table-column label="课程名称" min-width="100" prop="title">
    </el-table-column>

    <el-table-column label="价格" width="195" align="center" prop="price">
    </el-table-column>

    <el-table-column
      label="浏览次数"
      width="80"
      align="center"
      prop="viewCount"
    >
    </el-table-column>
  </el-table>
</template>

<script>
import eduSubject from "@/api/edusubject/edusubject";

export default {
  data() {
    return {
      topCourse: null,
      // 热门课程数
      nums: 10,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      eduSubject.getTopCourse(this.nums).then((res) => {
        this.topCourse = res.data.topCourse;
      });
    },
  },
};
</script>
