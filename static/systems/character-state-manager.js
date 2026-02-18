class CharacterStateManager {
    constructor() {
        this.emotionalState = 'neutral'; // Possible values: happy, sad, angry, etc.
        this.fatigueLevel = 0; // 0 (not fatigued) to 100 (fully fatigued)
        this.longingSystem = 0; // Tracking longing (0 is none, higher is more longing)
        this.trustValue = 100; // Trust level from 0 to 100
    }

    // Update emotional state
    updateEmotionalState(state) {
        this.emotionalState = state;
    }

    // Manage fatigue level
    updateFatigueLevel(amount) {
        this.fatigueLevel = Math.min(100, Math.max(0, this.fatigueLevel + amount));
    }

    // Manage longing system
    updateLongingSystem(value) {
        this.longingSystem = Math.max(0, value);
    }

    // Manage trust value
    updateTrustValue(change) {
        this.trustValue = Math.min(100, Math.max(0, this.trustValue + change));
    }

    // Get current state
    getCurrentState() {
        return {
            emotionalState: this.emotionalState,
            fatigueLevel: this.fatigueLevel,
            longingSystem: this.longingSystem,
            trustValue: this.trustValue,
        };
    }
}

// Export the CharacterStateManager class
module.exports = CharacterStateManager;
