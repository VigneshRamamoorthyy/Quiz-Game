import {useContext} from 'react'

import Header from '../Header'

import quizContext from '../../context/quizContext'

import './index.css'

const GameResults = props => {
  const {correctAnswersCount} = useContext(quizContext)
  const total = 10

  const scorePercentage = (correctAnswersCount / 10) * 100

  const backgroundImageUrl =
    scorePercentage >= 60
      ? 'url("https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-card-bg.png")'
      : ''

  const onClickReportBtn = () => {
    const {history} = props
    history.push('/game-report')
  }

  return (
    <>
      <Header />
      <div className="game-result-bg-container">
        <div
          className="result-container"
          style={{backgroundImage: backgroundImageUrl}}
        >
          {scorePercentage >= 60 ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-trophy-img.png"
              className="quiz-result-won-image"
              alt="won"
            />
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-lose-img.png"
              className="quiz-result-lose-image"
              alt="lose"
            />
          )}

          <h1 className="quiz-congrats-message">
            {scorePercentage >= 60 ? 'Congrats' : 'You lose'}
          </h1>
          <h1 className="quiz-result-percentage">
            {scorePercentage}% Correctly Answered
          </h1>

          {scorePercentage >= 60 ? (
            <p className="quiz-completion-message">
              Quiz completed successfully
            </p>
          ) : (
            ''
          )}

          <p className="quiz-attempt-summary">
            You attempted {correctAnswersCount} out of {total} questions as
            correct
          </p>
          <button
            className="quiz-report-btn"
            onClick={onClickReportBtn}
            type="button"
          >
            Report
          </button>
        </div>
      </div>
    </>
  )
}

export default GameResults
