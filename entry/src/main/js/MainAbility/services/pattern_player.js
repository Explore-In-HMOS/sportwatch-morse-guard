export default class PatternPlayer {
    constructor() {
        this.DOT = 120;
        this.DASH = 360;
        this.INTRA_GAP = 120;
        this.LETTER_GAP = 360;
    }

    setHapticService(h) {
        this.h = h;
    }

    play(pattern, onComplete) {
        if (!pattern) {
            if (onComplete) {
                onComplete();
            }
            return;
        }

        const parts = pattern.split('');
        const len = parts.length;

        const playStep = (i) => {
            if (i >= len) {
                this.h.gap(this.LETTER_GAP, () => {
                    if (onComplete) {
                        onComplete();
                    }
                });
                return true;
            }

            const ch = parts[i];
            let vibrate = null;
            if (ch === '.') {
                vibrate = (cb) => this.h.dot(cb);
            } else if (ch === '-') {
                vibrate = (cb) => this.h.dash(cb);
            } else {
                return playStep(i + 1);
            }

            vibrate(() => {
                if (i < len - 1) {
                    this.h.gap(this.INTRA_GAP, () => playStep(i + 1));
                } else {
                    this.h.gap(this.LETTER_GAP, () => {
                        if (onComplete) {
                            onComplete();
                        }
                    });
                }
            });
            return true;
        };

        playStep(0);
    }
}
