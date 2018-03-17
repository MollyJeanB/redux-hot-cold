import reducer from "./reducer";
import { generateAuralUpdate, restartGame, makeGuess } from "./actions";

describe("Reducer", () => {
  it("should set the initial state", () => {
    const state = reducer(undefined, { type: "_UNKNOWN" });
    expect(state.guesses).toEqual([]);
    expect(state.feedback).toEqual("Make your guess!");
    expect(state.correctAnswer).toBeLessThanOrEqual(100);
    expect(state.auralStatus).toEqual("");
  });

  describe("generateAuralUpdate", () => {
    it("should generate an aural update on the statues of the game", () => {
      let state = {
        guesses: [5, 70, 22],
        feedback: "You're Warm.",
        correctAnswer: 25,
        auralStatus: ""
      };
      state = reducer(state, generateAuralUpdate());
      expect(state.auralStatus).toEqual(
        "Here's the status of the game right now: You're Warm. You've made 3 guesses. In order of most- to least-recent, they are: 22, 70, 5"
      );
    });
  });

  describe("restartGame", () => {
    it("should restart the game when the correct answer is guessed", () => {
      let state = {
        guesses: [33, 34],
        correctAnswer: 34,
        feedback: "You got it!"
      };
      const correctAnswer = 5;
      state = reducer(state, restartGame(correctAnswer));
      expect(state.guesses).toEqual([]);
      expect(state.feedback).toEqual("Make your guess!");
      expect(state.correctAnswer).toEqual(correctAnswer);
    });
  });

  describe("makeGuess", () => {
    it("should submit a guess and generate feedback", () => {
      let state = {
        guesses: [1, 8, 15],
        correctAnswer: 50
      };
      state = reducer(state, makeGuess(18));
      expect(state.feedback).toEqual("You're Cold...");
    });
  });
});
