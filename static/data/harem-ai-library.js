const AFFECTION_STAGES = {
    0: 'Stranger',
    1: 'Acquaintance',
    2: 'Friend',
    3: 'Close Friend',
    4: 'Best Friend',
    5: 'Crush',
    6: 'Girlfriend',
    7: 'Fiancee',
    8: 'Wife',
    9: 'Soulmate'
};

class HaremCharacterAI {
    constructor(character) {
        this.character = character;
        this.affectionProgression = {};
        this.currentStage = 0;
    }

    updateAffection(points) {
        this.currentStage = Math.min(9, Math.max(0, this.currentStage + points));
    }

    getDialogue(stage) {
        return this.character.dialogues[this.currentStage];
    }

    interact(action) {
        // AI decision logic based on character personality traits
        if (action === 'flirt' && this.currentStage < 5) {
            this.updateAffection(1);
        } else if (action === 'confess' && this.currentStage === 5) {
            this.updateAffection(4);
        }
        // Add more interactions as needed
    }
}

const characters = {
    lr_002: {
        name: '琉璃女王',
        personality: 'Elegant and Wise',
        affectionProgression: new HaremCharacterAI(this),
        dialogues: [
            'Hello, stranger!',
            'Nice to meet you!',
            'You are special to me.',
            'I cherish our friendship.',
            'You make me happy.',
            'I have feelings for you.',
            'I want to be with you.',
            'You are my everything!',
            'I love you!',
            'You are my soulmate!'
        ]
    },
    ur_002: {
        name: '紅姐',
        personality: 'Passionate and Outgoing',
        affectionProgression: new HaremCharacterAI(this),
        dialogues: [
            'Hey there!',
            'You are fun!',
            'I adore you.',
            'Let’s be close friends!',
            'You light up my day.',
            'I really like you.',
            'You mean a lot to me.',
            'You are my love!',
            'I am so in love with you!',
            'We are destined to be together!'
        ]
    },
    ur_003: {
        name: '冰心',
        personality: 'Calm and Gentle',
        affectionProgression: new HaremCharacterAI(this),
        dialogues: [
            'Greetings.',
            'You are kind.',
            'I appreciate your company.',
            'You are dear to me.',
            'My heart feels warmth with you.',
            'I feel a connection with you.',
            'I wish to cherish you.',
            'You are my comfort.',
            'I treasure our bond.',
            'You are my everything!'
        ]
    },
    ssr_001: {
        name: '白琴',
        personality: 'Charming and Witty',
        affectionProgression: new HaremCharacterAI(this),
        dialogues: [
            'Nice to see you!',
            'What a pleasant surprise!',
            'I find you intriguing.',
            'You are interesting!',
            'I enjoy being with you.',
            'I feel a spark with you.',
            'You are someone I think about.',
            'I have feelings for you.',
            'I adore you!',
            'You are my soulmate!'
        ]
    },
    ssr_002: {
        name: '算盤林',
        personality: 'Smart and Observant',
        affectionProgression: new HaremCharacterAI(this),
        dialogues: [
            'Hello there.',
            'You have a sharp mind.',
            'I enjoy our conversations.',
            'Your intellect appeals to me.',
            'You inspire me.',
            'I admire you greatly.',
            'I feel a strong bond with you.',
            'I want to get to know you better.',
            'I care for you deeply.',
            'You are my soulmate!'
        ]
    },
    ssr_005: {
        name: '妖姬',
        personality: 'Mysterious and Enigmatic',
        affectionProgression: new HaremCharacterAI(this),
        dialogues: [
            'Who are you?',
            'You seem interesting.',
            'I sense a connection.',
            'You match my vibe.',
            'I feel curious about you.',
            'You intrigue me.',
            'I like being around you.',
            'You are special.',
            'I cherish our moments together.',
            'You are my soulmate!'
        ]
    },
    ssr_006: {
        name: '羅奈米傲嬌系統',
        personality: 'Tsundere and Playful',
        affectionProgression: new HaremCharacterAI(this),
        dialogues: [
            'W-What do you want?',
            'I’m not interested! (Lie)',
            'Why are you still here?',
            'I guess you are okay enough.',
            'Don’t get the wrong idea!',
            'I actually like you, okay?',
            'Stop making me blush!',
            'You can’t be serious!',
            'You mean a lot to me.',
            'I love you!
        ]
    },
    sr_008: {
        name: '櫻花',
        personality: 'Sweet and Caring',
        affectionProgression: new HaremCharacterAI(this),
        dialogues: [
            'Hi there!',
            'You are wonderful!',
            'I’m glad we met.',
            'You make me smile.',
            'Your happiness is my joy.',
            'I feel close to you.',
            'You are precious to me.',
            'I want to protect you.',
            'You mean the world to me.',
            'You are my soulmate!'
        ]
    },
    sr_009: {
        name: '黑寡婦',
        personality: 'Strong and Independent',
        affectionProgression: new HaremCharacterAI(this),
        dialogues: [
            'Hey there.',
            'You have guts.',
            'I respect you.',
            'You keep me on my toes.',
            'I value your opinion.',
            'I want to know you better.',
            'You are impressive.',
            'I care for you.',
            'You make me feel alive.',
            'You are my soulmate!'
        ]
    },
    r_003: {
        name: '小紅',
        personality: 'Cheerful and Energetic',
        affectionProgression: new HaremCharacterAI(this),
        dialogues: [
            'Yo!',
            'You are awesome!',
            'I love hanging out with you.',
            'You brighten my day.',
            'I feel excited just being with you.',
            'You are the best!',
            'I think you are special.',
            'Let’s have fun together!',
            'I wanna be close to you.',
            'You are my soulmate!'
        ]
    }
};

module.exports = { AFFECTION_STAGES, HaremCharacterAI, characters };