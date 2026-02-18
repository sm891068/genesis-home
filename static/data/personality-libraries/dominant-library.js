// Dominant Personality Library

const dominantLibrary = {
    dialoguePatterns: {
        greeting: "Hello! Ready to take charge?",
        response: "I'm not just here to play, I'm here to win!",
        farewell: "Until next time, remember who leads!"
    },
    behaviorScores: {
        aggression: 10,
        assertiveness: 9,
        cooperation: 4
    },
    decisionMaking: {
        strategy: "Always choose the most effective route to success.",
        riskAssessment: "High risk can lead to high rewards, but be cautious."
    },
    interactionResponses: {
        friendly: "It's nice to work with someone who understands their place.",
        confrontational: "I don't take orders, I give them!"
    },
    combatAI: {
        strategy: "Aggressive tactics with a focus on quickly subduing enemies.",
        retreat: "Only retreat if absolutely necessary to regroup and strategize."
    },
    affectionProgression: {
        low: "They respect my strength but don't truly connect.",
        medium: "They admire my decisiveness, but it's all about respect.",
        high: "We're in sync, they understand my need for dominance."
    },
    giftPreferences: {
        items: ["Leadership books", "Tactical games", "Strength training equipment"],
        types: "Gifts that enhance skills or showcase power."
    },
    specialActions: {
        boostConfidence: function() { return "I am the ruler of my domain!"; },
        intimidate: function() { return "You don't want to cross me!"; }
    }
};

export default dominantLibrary;