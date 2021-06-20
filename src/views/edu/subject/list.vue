<template>
  <div>
    <div class="add-subject">
      <label>选择excel文件</label>
      <el-upload
        class="upload-demo"
        ref="upload"
        accept=".xlsx"
        :action="baseUrl + '/eduservice/edu-subject/addSubject'"
        :auto-upload="false"
        :disabled="importBtnDisabled"
        :on-success="fileUploadSuccess"
        :on-error="fileUploadError"
      >
        <el-button slot="trigger" size="small" type="primary"
          >选取文件</el-button
        >
        <el-button
          :loading="loading"
          style="margin-left: 10px"
          size="small"
          type="success"
          @click="submitUpload"
          >上传到服务器</el-button
        >
      </el-upload>
    </div>

    <div class="subject-tree">
      <el-card>
        <el-form :inline="true">
          <el-form-item>
            <el-input
              v-model="filterText"
              placeholder="输入关键字进行过滤"
            ></el-input>
          </el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form>
        <el-tree
          ref="subjectTree"
          :data="subjectList"
          :props="defaultProps"
          :filter-node-method="filterNode"
        ></el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import eduSubject from "@/api/edusubject/edusubject";
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
      loading: false,
      importBtnDisabled: false,
      filterText: "",
      subjectList: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },

  created() {
    this.getAllSubject();
  },

  methods: {
    //上传文件到接口
    submitUpload() {
      this.loading = true;
      this.importBtnDisabled = true;
      this.$refs.upload.submit();
    },

    fileUploadSuccess() {
      this.loading = false;
      this.importBtnDisabled = false;
      this.getAllSubject();
      this.$message.success("上传成功！！！");
    },
    fileUploadError() {
      this.loading = false;
      this.importBtnDisabled = false;
      this.$message.error("上传失败！！！");
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    },

    //获取课程数据
    getAllSubject() {
      eduSubject.getAllSubject().then((response) => {
        console.log(response);
        this.subjectList = response.data.list;
      });
    },
  },

  watch: {
    filterText(val) {
      this.$refs.subjectTree.filter(val);
    },
  },
};
</script>

<style>
.add-subject {
  height: 80px;
  float: flex;
}

.subject-tree {
  margin-top: 15px;
}
</style>