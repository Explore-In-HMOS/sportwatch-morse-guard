import router from '@ohos.router'

export default {
    data: {
        score: 0
    },
    onPlayAgainClicked() {
        router.replace({
            uri: 'pages/game/game',
            params: {}
        });
    }
};
