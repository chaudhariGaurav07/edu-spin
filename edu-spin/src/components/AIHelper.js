// src/components/AIHelper.js

const AIHelper = {
  getQuestion: (category) => {
    const questions = {
      Math: {
        text: "What is 2 + 3?",
        correct: "5",
        audio: "/audio/math-1.mp3",
        difficulty: "easy",
      },
      Spelling: {
        text: "Spell the word 'cat'.",
        correct: "cat",
        audio: "/audio/spelling-1.mp3",
        difficulty: "easy",
      },
      Shapes: {
        text: "What shape has four equal sides?",
        correct: "Square",
        audio: "/audio/shapes-1.mp3",
        difficulty: "easy",
      },
      Colors: {
        text: "What color is a banana?",
        correct: "Yellow",
        audio: "/audio/colors-1.mp3",
        difficulty: "easy",
      },
      History: {
        text: "Who was the first person to walk on the moon?",
        correct: "Neil Armstrong",
        audio: "/audio/history-1.mp3",
        difficulty: "easy",
      },
      Science: {
        text: "What do we breathe to stay alive?",
        correct: "Oxygen",
        audio: "/audio/science-1.mp3",
        difficulty: "easy",
      },
    };

    return questions[category] || { text: "No question available", correct: "" };
  },

  getDifficulty: (category) => {
    return AIHelper.getQuestion(category).difficulty;
  },
};

export default AIHelper;
