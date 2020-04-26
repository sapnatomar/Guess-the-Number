export const generateRandomNumber = () => Math.floor(Math.random()*100) + 1;

export const initialState = () => ({
    generatedNumber: generateRandomNumber(),
    guess: 0,
    allGuess: [],
    attempt: 0,
    feedback: "",
});

export const sendFeedback = (diff) => {
    if (diff > 0) {
        return "High";
    }
    else if (diff < 0) {
        return "Low";
    }
    return "You guessed it";
};