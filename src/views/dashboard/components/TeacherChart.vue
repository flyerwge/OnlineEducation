<template>
  <!-- 显示讲师级别比例  -->
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
import eduTeacher from "@/api/eduteacher/eduteacher";

export default {
  components: {
    eduTeacher,
  },
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "300px",
    },
  },

  data() {
    return {
      chart: null,
      levelOneNum: 10,
      levelTwoNum: 1,
    };
  },

  created() {},

  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },

  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },

  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");

      //获取不同级别讲师数目,并显示在饼状图中
      eduTeacher.getLevelTeachers().then((res) => {
        if (res.success) {
          this.levelOneNum = res.data.levelTeacherNum.levelOneNum;
          this.levelTwoNum = res.data.levelTeacherNum.levelTwoNum;
          this.chart.setOption({
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)",
            },

            legend: {
              left: "center",
              bottom: "10",
              data: ["高级讲师", "首席讲师"],
            },

            series: [
              {
                name: "Teacher Chart",
                type: "pie",
                roseType: "radius",
                radius: [15, 95],
                center: ["50%", "38%"],
                data: [
                  { value: this.levelOneNum, name: "高级讲师" },
                  { value: this.levelTwoNum, name: "首席讲师" },
                ],
                animationEasing: "cubicInOut",
                animationDuration: 2600,
              },
            ],
          });
        }
      });
    },
  },
};
</script>
