import router from '@ohos.router'
import HapticService from '../../services/haptic_service';
import MorseEngine from '../../services/morse_engine';
import PatternPlayer from '../../services/pattern_player';

export default {
    data: {
        solved: false,
        targetLetter: '',
        targetPattern: '',
        options: [],
        score: 0,
        round: 1,
        isPlaying: false,
        haptic: new HapticService(),
        eng: new MorseEngine(),
        player: new PatternPlayer()
    },
    onInit() {
        this.player.setHapticService(this.haptic);
        this.startRound();
    },
    startRound() {
        this.isPlaying = true;
        this.targetLetter = this.eng.randomLetter();
        this.targetPattern = this.eng.toMorse(this.targetLetter);
        const distractor = this.eng.makeDistractor(this.targetLetter);
        this.options = this.shuffle([this.targetLetter, distractor]);
        this.solved = false;
        this.player.play(this.targetPattern, () => (this.isPlaying = false));
    },
    resetGame() {
        this.isPlaying = false;
        this.score = 0;
        this.round = 1;
        this.targetLetter = '';
        this.targetPattern = '';
        this.options = [];
        this.startRound();
    },
    replayPattern() {
        if (!this.solved && !this.isPlaying) {
            this.isPlaying = true;
            this.player.play(this.targetPattern, () => (this.isPlaying = false));
        }
    },

    shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
        return arr;
    },
    chooseFirst() {
        this.choose(this.options[0]);
    },
    chooseSecondOpt() {
        this.choose(this.options[1]);
    },
    choose(letter) {
        if (this.isPlaying || this.solved) {
            return;
        }
        this.solved = true;
        const ok = letter === this.targetLetter;
        if (ok) {
            this.score += 10;
            this.haptic.ok();

            if (this.score >= 100) {
                router.replace({
                    uri: 'pages/win_page/win_page',
                    params: { score: this.score }
                });
                return;
            }
            this.round += 1;
            setTimeout(() => this.startRound(), 2500);
        } else {
            this.score = Math.max(0, this.score - 2);
            this.haptic.nok();
            this.round += 1;
            setTimeout(() => this.startRound(), 2500);
        }
    }
};
