// multi-character interaction system

class Character {
    constructor(name, personality, affinity) {
        this.name = name;
        this.personality = personality; // e.g., 'friendly', 'jealous', 'rival'
        this.affinity = affinity; // relationship with the player
        this.rivalries = [];
        this.alliances = [];
    }

    addRival(character) {
        this.rivalries.push(character);
    }

    addAlliance(character) {
        this.alliances.push(character);
    }

    canInteract(withCharacter) {
        // Determine if they can interact based on personality compatibility
        if (this.rivalries.includes(withCharacter)) {
            return false; // cannot interact with rivals
        }
        // More complex logic can be added here
        return true;
    }
}

class InteractionManager {
    constructor(characters) {
        this.characters = characters;
    }

    manageInteraction(character1, character2, scenario) {
        if (character1.canInteract(character2)) {
            console.log(`${character1.name} interacts with ${character2.name} in scenario: ${scenario}`);
            // Logic to handle different scenarios
            this.handleScenario(character1, character2, scenario);
        } else {
            console.log(`${character1.name} cannot interact with ${character2.name} due to rivalry.`);
        }
    }

    handleScenario(character1, character2, scenario) {
        // Define the logic for various scenarios, e.g., group dialogues, alliances, etc.
        switch (scenario) {
            case 'dialogue':
                console.log(`Dialogue between ${character1.name} and ${character2.name}.`);
                break;
            case 'alliance':
                console.log(`${character1.name} and ${character2.name} form an alliance.`);
                character1.addAlliance(character2);
                character2.addAlliance(character1);
                break;
            case 'rivalry':
                console.log(`${character1.name} and ${character2.name} become rivals.`);
                character1.addRival(character2);
                character2.addRival(character1);
                break;
            default:
                console.log(`Generic interaction between ${character1.name} and ${character2.name}.`);
        }
    }
}

// Example usage
const characterA = new Character('Alice', 'friendly', 100);
const characterB = new Character('Bob', 'jealous', 75);

const interactionManager = new InteractionManager([characterA, characterB]);
interactionManager.manageInteraction(characterA, characterB, 'dialogue');
