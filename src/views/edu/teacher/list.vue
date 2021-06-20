<template>
  <div class="list-container">
    <el-card class="list-card">
      <!-- 条件查询区域 -->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="讲师名称">
          <el-input
            v-model="teacherQuery.name"
            placeholder="讲师名称"
            lab
          ></el-input>
        </el-form-item>

        <el-form-item label="讲师头衔">
          <el-select
            v-model="teacherQuery.level"
            placeholder="讲师头衔"
            width="100"
          >
            <el-option label="高级讲师" :value="1"></el-option>
            <el-option label="首席讲师" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="添加时间">
          <el-col :span="11">
            <el-date-picker
              v-model="teacherQuery.begin"
              type="datetime"
              placeholder="请选择开始时间"
              style="width: 100%"
              value-format="yyyy-mm-dd hh:mm:ss"
              default-time="00:00:00"
            ></el-date-picker
          ></el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="teacherQuery.end"
              type="datetime"
              placeholder="请选择结束时间"
              style="width: 100%"
              value-format="yyyy-mm-dd hh:MM:ss"
              default-time="00:00:00"
            ></el-date-picker
          ></el-col>
        </el-form-item>

        <el-button type="primary" @click="getTeacherListPage">查询</el-button>
        <el-button type="primary" @click="resetData()">清空</el-button>
      </el-form>

      <!-- 表单区域 -->
      <el-table :data="teacherList" stripe style="width: 100%">
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="name" label="讲师姓名" width="180">
        </el-table-column>
        <el-table-column prop="intro" label="讲师简介" width="180">
        </el-table-column>
        <el-table-column prop="career" label="讲师资历"> </el-table-column>
        <el-table-column label="头衔">
          <template slot-scope="scope">
            {{ scope.row.level == 1 ? "高级讲师" : "首席讲师" }}
          </template>
        </el-table-column>
        <el-table-column prop="gmtCreate" label="添加时间"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="showEditDialog(scope.row.id)"
              >修改</el-button
            >
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="removeTeacherById(scope.row.id)"
              >删除</el-button
            >
            <el-tooltip
              effect="dark"
              content="分配权限"
              placement="top-start"
            ></el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <!-- size-change:每页最大变化数 -->
      <!-- current-change：当前页面变化数 -->
      <!-- layout：功能组件 -->
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current"
          :page-sizes="[1, 2, 5, 10, 100]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>

    <!-- 修改讲师信息区域 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClose"
    >
      <el-form ref="editFormRef" :model="eduTeacher" label-width="120px">
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
          <el-input v-model="eduTeacher.avatar" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="btnSubmitEduTeacherInfo()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import eduteacher from "@/api/eduteacher/eduteacher";

export default {
  data() {
    return {
      // 满足查询条件的讲师列表
      teacherList: [],
      teacherQuery: {},
      // 分页显示条件
      current: 1,
      limit: 10,
      total: 0,

      editDialogVisible: false,
      // 根据id查询的讲师信息
      eduTeacher: {
        name: "",
        sort: 0,
        intro: "",
        career: "",
        level: 1,
        avatar: "",
      },
    };
  },
  created() {
    this.getTeacherListPage();
  },
  methods: {
    // 条件查询讲师带分页
    getTeacherListPage() {
      eduteacher
        .getTeacherListPage(this.current, this.limit, this.teacherQuery)
        .then((res) => {
          // console.log(res);
          this.teacherList = res.data.rows;
          this.total = res.data.total;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 每页最大显示
    handleSizeChange(newSize) {
      this.limit = newSize;
      this.getTeacherListPage();
    },

    // 当前页
    handleCurrentChange(newPage) {
      this.current = newPage;
      this.getTeacherListPage();
    },

    // 清空查询条件并刷新
    resetData() {
      this.teacherQuery = {};
      this.getTeacherListPage();
    },

    // 显示讲师信息编辑框
    showEditDialog(id) {
      eduteacher.getTeacherInfoById(id).then((res) => {
        console.log(res);
        // this.eduTeacher = res.data.eduTeacher;

        // 代码有点冗余，后期需要修改   TODO
        this.eduTeacher.id = res.data.eduTeacher.id;
        this.eduTeacher.name = res.data.eduTeacher.name;
        this.eduTeacher.sort = res.data.eduTeacher.sort;
        this.eduTeacher.level = res.data.eduTeacher.level;
        this.eduTeacher.career = res.data.eduTeacher.career;
        this.eduTeacher.intro = res.data.eduTeacher.intro;
        this.eduTeacher.avatar = res.data.eduTeacher.avatar;
      });
      this.editDialogVisible = true;
    },

    // 关闭讲师信息编辑
    editDialogClose() {
      this.$refs.editFormRef.resetFields();
    },

    // 提交修改讲师信息
    btnSubmitEduTeacherInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (valid) {
          console.log(this.eduTeacher);
          eduteacher.updateTeacherInfo(this.eduTeacher).then((res) => {
            console.log(res);
            if (res.success) {
              this.$message.success("讲师信息修改成功！！！");
              this.editDialogVisible = false;
              this.getTeacherListPage();
            }
          });
        }
      });
    },

    removeTeacherById(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          eduteacher.removeTeacherById(id).then((res) => {
            this.$message.success("信息删除成功！！！");
            this.getTeacherListPage();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
</style>