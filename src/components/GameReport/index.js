import {useContext} from 'react'
import Header from '../Header'
import GameReportDefaultOptionList from '../GameReportDefaultOptionList'
import GameReportImageOptionList from '../GameReportImageOptionList'
import GameReportSingleSelectOptionList from '../GameReportSingleSelectOptionList'
import quizContext from '../../context/quizContext'
import './index.css'

const GameReport = () => {
  const {correctAnswersCount, inCorrectAnswersCount} = useContext(quizContext)

  const {unattemptedQuestions} = useContext(quizContext)

  const unattempted = unattemptedQuestions.length

  const renderGameReportOptionsList = (options, optionsType) => {
    switch (optionsType) {
      case 'DEFAULT':
        return <GameReportDefaultOptionList options={options} />
      case 'IMAGE':
        return <GameReportImageOptionList options={options} />
      case 'SINGLE_SELECT':
        return <GameReportSingleSelectOptionList options={options} />
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="game-report-bg-container">
        <div className="report-container">
          <div className="score-report-container">
            <div className="score-container">
              <p className="quiz-score">
                {correctAnswersCount} <span className="score-divider">/</span>
                <span className="total-score">10</span>
              </p>
            </div>
            <div className="answer-summary-container">
              <div className="answer-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-right-check-img.png"
                  className="correct-answer-image"
                  alt="correct answer icon"
                />
                <p className="answers-summary">
                  {correctAnswersCount} Correct answers
                </p>
              </div>
              <div className="answer-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-wrong-check-img.png"
                  className="wrong-answer-image"
                  alt="incorrect answer icon"
                />
                <p className="answers-summary">
                  {inCorrectAnswersCount} Wrong answers
                </p>
              </div>
              <div className="answer-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-un-answered-img.png "
                  className="unattempted-answer-image"
                  alt="nattempted icon"
                />
                <p className="answers-summary">{unattempted} Unattempted</p>
              </div>
            </div>
          </div>
          <div className="unattempted-questions-container">
            {unattemptedQuestions.length === 0 ? (
              <h1 className="questions-completed-message">
                Attempted all the questions
              </h1>
            ) : (
              <>
                <p className="unattempted-questions-title">
                  Unattempted Questions
                </p>

                {unattemptedQuestions.map(eachQuestion => (
                  <div
                    key={eachQuestion.id}
                    className="game-report-question-and-option-container"
                  >
                    <p className="unattempted-question">
                      {eachQuestion.questionText}
                    </p>
                    {renderGameReportOptionsList(
                      eachQuestion.options,
                      eachQuestion.optionsType,
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default GameReport
