// Index file for all personality libraries

export const personalityLibraries = {
    library1: require('./library1'),
    library2: require('./library2'),
    library3: require('./library3'),
    // add other libraries as needed
};

export function getLibrary(name) {
    return personalityLibraries[name] || null;
}

export function listLibraries() {
    return Object.keys(personalityLibraries);
}