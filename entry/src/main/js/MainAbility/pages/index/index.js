import router from '@ohos.router'

export default {
    onStartGameClicked() {
        router.replace({
            uri: 'pages/game/game',
            params: {}
        });
    }
};
