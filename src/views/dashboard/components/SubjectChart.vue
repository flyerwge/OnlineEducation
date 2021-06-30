<template>
  <!-- 显示课程占比         TODO -->
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
import eduSubject from "@/api/edusubject/edusubject";
import { validUsername } from "@/utils/validate";

export default {
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
      courseNum: [],
      subjectTitle: [],
      courseTotalNum: [],
    };
  },
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

      eduSubject.getCourseNum().then((res) => {
        if (res.success) {
          this.courseNum = res.data.courseNum;
          console.log(this.courseNum);
          for (let i = 0; i < this.courseNum.length; i++) {
            this.subjectTitle[i] = this.courseNum[i].name;
            this.courseTotalNum[i] = this.courseNum[i].value;
          }
          this.chart.setOption({
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)",
            },

            legend: {
              left: "center",
              bottom: "10",
              data: this.subjectTitle,
            },

            series: [
              {
                name: "Subject Chart",
                type: "pie",
                roseType: "radius",
                radius: [15, 95],
                center: ["50%", "38%"],
                data: this.courseNum,
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
