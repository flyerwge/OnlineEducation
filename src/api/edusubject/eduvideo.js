import request from "@/utils/request"

export default {
    removeVideoById(videoId) {
        return request({
            url: `/vodService/video/removeVod/${videoId}`,
            method: "delete",
        })
    }
}
