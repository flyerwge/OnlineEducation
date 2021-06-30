import request from "@/utils/request"

export default {
    /**
     * 
     * @returns 返回符合树形结构的List
     */
    getAllSubject() {
        return request({
            url: "/eduservice/edu-subject/getAllSubject",
            method: "get",
        })
    },

    /**
     * 添加课程信息
     * @param {*} courseInfo 
     * @returns 
     */
    addCourseInfo(courseInfo) {
        return request({
            url: "/eduservice/edu-course/addCourseInfo",
            method: "post",
            data: courseInfo
        })
    },

    /**
     * 获取所有讲师列表
     * @returns 
     */
    getTeacherList() {
        return request({
            url: "/eduservice/edu-teacher/findAll",
            method: "get",
        })
    },

    /**
     * 查询浏览次数前几位的课程
     * @param {*} nums 
     * @returns 
     */
    getTopCourse(nums) {
        return request({
            url: `/eduservice/edu-course/getTopCourse/${nums}`,
            method: "get",
        })
    },

    getCourseNum() {
        return request({
            url: "/eduservice/edu-course/getCourseNum",
            method: "get",
        })
    },


}
