import React from 'react'

const quizContext = React.createContext({
  correctAnswersCount: 0,
  inCorrectAnswersCount: 0,
  countCorrectAnswer: () => {},
  countInCorrectAnswer: () => {},
  addUnattemptedQuestion: () => {},
  unattemptedQuestions: [],
})

export default quizContext
