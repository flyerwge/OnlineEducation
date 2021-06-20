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

    addCourseInfo(courseInfo) {
        return request({
            url: "/eduservice/edu-course/addCourseInfo",
            method: "post",
            data: courseInfo
        })
    }
}
