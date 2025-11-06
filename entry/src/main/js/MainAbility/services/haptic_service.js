import Vibrator from '@system.vibrator';

export default class HapticService {
    constructor() {
        this.DOT = 120; // ms
        this.DASH = 360; // ms
    }

    dot(onComplete) {
        try {
            Vibrator.vibrate({ mode: 'short' });
        } catch (_) {
        }
        setTimeout(() => {
            if (onComplete) {
                onComplete();
            }
        }, this.DOT);
    }

    dash(onComplete) {
        try {
            Vibrator.vibrate({ mode: 'long' });
        } catch (_) {
        }
        setTimeout(() => {
            if (onComplete) {
                onComplete();
            }
        }, this.DASH);
    }

    gap(ms, onComplete) {
        setTimeout(() => {
            if (onComplete) {
                onComplete();
            }
        }, ms);
    }

    ok(onComplete) {
        this.dash(onComplete);
    }

    nok(onComplete) {
        this.dot(() => {
            setTimeout(() => {
                this.dot(onComplete);
            }, 140);
        });
    }
}
