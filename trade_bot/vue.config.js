module.exports = {
    devServer: {
        port: 3000,
        // 프록시 설정
        proxy: {
            // 프록시 요청을 보낼 api의 시작 부분
            '/send': {
                // 프록시 요청을 보낼 서버의 주소
                target: process.env.VUE_APP_URL
            }
        }
    }
}