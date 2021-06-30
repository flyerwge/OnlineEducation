<template>
  <div class="dashboard-container">
    <h2>欢迎进入OnlineEducation在线教育后台管理</h2>

    <el-card class="dashboard-card">
      <el-row>
        <el-col :xs="24" :sm="24" :lg="8">
          <transaction-table />
        </el-col>

        <el-col :xs="24" :sm="24" :lg="8">
          <subject-chart />
        </el-col>

        <el-col :xs="24" :sm="24" :lg="8">
          <teacher-chart />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TeacherChart from "./components/TeacherChart.vue";
import SubjectChart from "./components/SubjectChart.vue";
import TransactionTable from "./components/TransactionTable.vue";

export default {
  components: {
    TransactionTable,
    TeacherChart,
    SubjectChart,
  },
  name: "Dashboard",

  computed: {
    ...mapGetters(["name"]),
  },
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  margin: 30px;
}

.dashboard-container h2 {
  margin-top: 20px;
  text-align: center;
}

.dashboard-card {
  margin-top: 45px;
}
</style>
