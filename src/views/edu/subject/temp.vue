<template>
  <div>
    <!-- 视频点播，未完成将视频存储向数据库         TODO  P147未看 -->
    <el-upload
      class="avatar-uploader"
      :action="baseUrl + '/vodService/video/uploadVideo'"
      :on-success="handleVodUploadSuccess"
      :on-remove="handleVodRemove"
      :before-remove="beforeVodRemove"
      :on-exceed="handleUploadExceed"
      :file-list="fileList"
      :limit="1"
    >
      <el-button size="small" type="primary">上传视频</el-button>

      <el-tooltip placement="right-end">
        <div slot="content">
          最大支持1G，<br />
          支持3GP、MP4、FLV等视频格式
          <i class="el-icon-question" />
        </div>
      </el-tooltip>
    </el-upload>
  </div>
</template>

<script>
import eduVideo from "@/api/edusubject/eduvideo";
export default {
  data() {
    return {
      fileList: [],
      baseUrl: process.env.VUE_APP_BASE_API,
      video: {
        title: "",
        sort: 0,
        free: 0,
        videoSourceId: "",
        videoOriginId: "",
      },
    };
  },

  methods: {
    handleVodUploadSuccess(response, file, fileList) {
      video.videoSourceId = response.data.videoId;
    },

    // 确认删除，调用接口删除视频
    handleVodRemove() {
      eduVideo.removeVideoById(this.video.videoSourceId).then((res) => {
        this.$message.success("视频删除成功！");
        // 文件列表清空
        this.fileList = [];
        this.video.videoSourceId = "";
        this.video.videoOriginId = "";
      });
    },

    beforeVodRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    handleUploadExceed(files, fileList) {
      this.$message.warning("想要重新上传视频，请删除已上传的视频！");
    },
  },
};
</script>

<style>
</style>