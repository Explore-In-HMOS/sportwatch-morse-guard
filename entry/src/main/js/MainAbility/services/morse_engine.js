export default class MorseEngine {
    constructor() {
        this.map = {
            'A': '.-',
            'B': '-...',
            'C': '-.-.',
            'D': '-..',
            'E': '.',
            'F': '..-.',
            'G': '--.',
            'H': '....',
            'I': '..',
            'J': '.---',
            'K': '-.-',
            'L': '.-..',
            'M': '--',
            'N': '-.',
            'O': '---',
            'P': '.--.',
            'Q': '--.-',
            'R': '.-.',
            'S': '...',
            'T': '-',
            'U': '..-',
            'V': '...-',
            'W': '.--',
            'X': '-..-',
            'Y': '-.--',
            'Z': '--..'
        };
        this.pool = Object.keys(this.map);
    }

    toMorse(letter) {
        const upper = (letter || '').toUpperCase();
        return this.map[upper] || '';
    }

    randomLetter() {
        return this.pool[Math.floor(Math.random() * this.pool.length)];
    }

    makeDistractor(correct) {
        const target = this.toMorse(correct);
        const len = target.length;
        const candidates = this.pool.filter(
            l => l !== correct && this.toMorse(l).length === len
        );
        if (candidates.length === 0) {
            return this.pool.find(l => l !== correct);
        }
        return candidates[Math.floor(Math.random() * candidates.length)];
    }
}
