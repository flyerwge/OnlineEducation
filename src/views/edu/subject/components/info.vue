<template>
  <div>
    <!-- 课程基本信息表单 -->
    <el-card>
      <el-form label-width="120px">
        <el-form-item label="课程标题">
          <el-input v-model="courseInfo.title"></el-input>
        </el-form-item>

        <!-- 所属分类 -->
        <el-form-item label="课程分类">
          <el-select
            v-model="courseInfo.subjectParentId"
            placeholder="一级分类"
            @change="subjectOneChanged"
          >
            <el-option
              v-for="(subject, index) in subjectOneList"
              :key="index"
              :label="subject.title"
              :value="subject.id"
            ></el-option>
          </el-select>

          <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
            <el-option
              v-for="(subject, index) in subjectTwoList"
              :key="index"
              :label="subject.title"
              :value="subject.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 课程讲师 -->
        <el-form-item label="课程讲师">
          <el-select v-model="courseInfo.teacherId" placeholder="请选择">
            <el-option
              v-for="(teacher, index) in teacherList"
              :key="index"
              :label="teacher.name"
              :value="teacher.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="总课时">
          <el-input-number
            :min="0"
            v-model="courseInfo.lessonNum"
            controls-position="right"
          ></el-input-number>
        </el-form-item>

        <!-- 课程简介 -->
        <el-form-item label="课程简介">
          <el-input v-model="courseInfo.description"></el-input>
        </el-form-item>

        <!-- 课程封面 -->
        <el-form-item label="课程封面">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :action="baseUrl + '/eduoss/file/cover'"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="courseInfo.cover"
              class="avatar"
              :src="courseInfo.cover"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="课程价格">
          <el-input-number
            v-model="courseInfo.price"
            :min="0"
            controls-position="right"
          ></el-input-number>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import eduSubject from "@/api/edusubject/edusubject";
export default {
  name: "Information",
  data() {
    return {
      courseInfo: {
        title: "",
        subjectParentId: "",
        subjectId: "",
        teacherId: "",
        lessonNum: 0,
        description: "",
        cover: "",
        price: 0,
      },

      // 所有讲师
      teacherList: [],
      // 所有一级分类
      subjectOneList: [],
      // 所有二级分类
      subjectTwoList: [],
      // 获取请求服务端口号
      baseUrl: process.env.VUE_APP_BASE_API,
    };
  },

  created() {
    this.getOneSubjectList();
    this.getTeacherList();
  },

  methods: {
    getTeacherList() {
      eduSubject.getTeacherList().then((response) => {
        // console.log(response);
        this.teacherList = response.data.allTeacher;
      });
    },

    // 查询所有一级分类
    getOneSubjectList() {
      eduSubject.getAllSubject().then((res) => {
        this.subjectOneList = res.data.list;
      });
    },

    // 一级分类选择改变时触发
    subjectOneChanged(value) {
      for (let i = 0; i < this.subjectOneList.length; i++) {
        var oneSubeject = this.subjectOneList[i];
        if (value === oneSubeject.id) {
          this.subjectTwoList = oneSubeject.children;
          this.courseInfo.subjectId = "";
        }
      }
    },

    //上传封面前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
    },

    handleAvatarSuccess(res, file) {
      this.courseInfo.cover = res.data.imgUrl;
    },
  },

  beforeDestroy() {
    this.$emit("courseInfo", this.courseInfo);
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>