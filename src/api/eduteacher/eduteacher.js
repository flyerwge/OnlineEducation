import request from "@/utils/request"

export default {
    /**
     * 条件查询带分页
     * @param {*} current :当前页
     * @param {*} limit ：每页记录数
     * @param {*} teacherQuery ：TeacherQuery条件对象
     * @returns 
     */
    getTeacherListPage(current, limit, teacherQuery) {
        return request({
            // url: "/eduservice/edu-teacher/pageTeacherCondition/" + current + "/" + limit,
            url: `/eduservice/edu-teacher/pageTeacherCondition/${current}/${limit}`,
            method: "post",
            // 后端使用RequestBody获取JSON数据，data将对象转换成JSON数据传递到接口
            data: teacherQuery,
        })
    },

    /**
     * 根据id逻辑删除讲师
     * @param {*} id 
     * @returns 
     */
    removeTeacherById(id) {
        return request({
            url: `/eduservice/edu-teacher/delete/${id}`,
            method: "delete",
        })
    },

    /**
     * 添加讲师
     * @param {*} eduTeacher 
     * @returns 
     */
    addTeacher(eduTeacher) {
        return request({
            url: "/eduservice/edu-teacher/addTeacher",
            method: "post",
            data: eduTeacher,
        })
    },

    /**
     * 根据id查询讲师信息
     * @param {*} id 
     * @returns 
     */
    getTeacherInfoById(id) {
        return request({
            url: `/eduservice/edu-teacher/getTeacherInfoById/${id}`,
            method: "get",
        })
    },

    /**
     * 更新讲师信息
     * @param {*} eduTeacher 
     * @returns 
     */
    updateTeacherInfo(eduTeacher) {
        return request({
            url: "/eduservice/edu-teacher/updateTeacherInfo",
            method: "post",
            data: eduTeacher,
        })
    }
}
