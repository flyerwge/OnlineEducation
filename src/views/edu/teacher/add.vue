<template>
  <div class="addteacher">
    <el-form ref="form" :model="eduTeacher" label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="eduTeacher.name" />
      </el-form-item>

      <el-form-item label="讲师排序">
        <el-input-number
          v-model="eduTeacher.sort"
          controls-position="right"
          :min="0"
        />
      </el-form-item>

      <el-form-item label="讲师头衔">
        <el-select v-model="eduTeacher.level" placeholder="请选择">
          <el-option label="高级讲师" :value="1" />
          <el-option label="首席讲师" value="2" />
        </el-select>
      </el-form-item>

      <el-form-item label="讲师资历">
        <el-input v-model="eduTeacher.career" />
      </el-form-item>

      <el-form-item label="讲师简介">
        <el-input v-model="eduTeacher.intro" type="textarea" :rows="10" />
      </el-form-item>

      <el-form-item label="讲师头像">
        <!-- 头像缩略图 -->
        <pan-thumb :image="eduTeacher.avatar" />
        <!-- 选择头像 -->
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="imageCropperShow = true"
        ></el-button>

        <image-cropper
          v-show="imageCropperShow"
          :width="300"
          :height="300"
          :key="imageCropperKey"
          :url="baseUrl + '/eduoss/file/avatar'"
          field="uploadAvatar"
          @close="closeHandler"
          @crop-upload-success="cropSuccess"
        ></image-cropper>
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="btnSubmitDisabled"
          type="primary"
          @click="btnSubmitOrUpdate()"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import eduTeacher from "@/api/eduteacher/eduteacher";
import PanThumb from "@/components/PanThumb";
import ImageCropper from "@/components/ImageCropper";
export default {
  components: {
    PanThumb,
    ImageCropper,
  },
  data() {
    return {
      eduTeacher: {
        name: "",
        sort: 0,
        intro: "",
        career: "",
        level: 1,
        avatar: "",
      },
      // 提交按钮是否禁用
      btnSubmitDisabled: false,
      // 上传头像弹框是否显示
      imageCropperShow: false,
      // 上传组件key
      imageCropperKey: 0,
      // 获取请求服务端口号
      baseUrl: process.env.VUE_APP_BASE_API,
    };
  },
  methods: {
    btnSubmitOrUpdate() {
      eduTeacher.addTeacher(this.eduTeacher).then((res) => {
        this.$message.success("讲师信息添加成功！！！");
        this.$router.push({ path: "/eduteacher/table" });
      });
    },

    // 关闭头像框
    closeHandler() {
      this.imageCropperShow = false;
      this.imageCropperKey = this.imageCropperKey + 1;
    },

    // 上传头像成功
    cropSuccess(data) {
      this.eduTeacher.avatar = data.imgUrl;
      this.imageCropperShow = false;
      this.imageCropperKey = this.imageCropperKey + 1;
    },
  },
};
</script>

<style scoped>
</style>

