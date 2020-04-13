export const generateRandomNumber = () => Math.floor(Math.random()+100) + 1;

export const initialState = () => ({
    generatedNumber: generateRandomNumber(),
    guess: 0,
    allGuess: [],
    attempt: 0,
});