export const generateRandomNumber = () => Math.floor(Math.random()*100) + 1;

export const initialState = () => ({
    generatedNumber: generateRandomNumber(),
    guess: 0,
    allGuess: [],
    attempt: 0,
    feedback: "",
    successDialogBoxOpen: false,
    score: 100,
});

export const sendFeedback = (guess, diff) => {
    if (guess > 100) 
        return "Enter a number in range [1, 100]";

    if (diff > 30) 
        return "Too High!";
    if (diff > 10)
        return "High!";
    if (diff > 0)
        return "Keep going! You are near. Try a smaller number.";
    if (diff >= -10) 
        return "Keep going! You are near. Try a larger number.";
    if (diff >= -30)
        return "Low!";
    return "Too Low!";
};