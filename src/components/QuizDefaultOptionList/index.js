import {useState, useContext} from 'react'
import quizContext from '../../context/quizContext'

import './index.css'

const QuizDefaultOptionList = props => {
  const [showCheckCircle, setShowCheckCircle] = useState(false)
  const [wrongOptionCheckCircle, setWrongOptionCheckCircle] = useState('')
  const [rightOptionCheckCircle, setRightOptionCheckCircle] = useState('')
  const [selectedOptionId, setSelectedOptionId] = useState(null)
  const [correctOptionId, setCorrectOptionId] = useState(null)

  const {optionDetails, handleSetDisableOption, disableOptionButton} = props

  const {countCorrectAnswer, countInCorrectAnswer} = useContext(quizContext)

  const onClickDefaultOption = eachOption => {
    const {id, isCorrect} = eachOption

    if (isCorrect) {
      setRightOptionCheckCircle(
        'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png',
      )
      countCorrectAnswer() // Increment score if the answer is correct
      setCorrectOptionId(id)
    } else {
      setWrongOptionCheckCircle(
        'https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png ',
      )
      setRightOptionCheckCircle(
        'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png',
      )
      countInCorrectAnswer()
      const correctOption = optionDetails.find(option => option.isCorrect)
      setCorrectOptionId(correctOption.id)
    }

    setShowCheckCircle(true) // Always show the check circle
    setSelectedOptionId(id) // Set selected option id for highlighting
    handleSetDisableOption()
  }

  return (
    <ul className="quiz-default-option-lists">
      {optionDetails.map(eachOption => {
        const {id, isCorrect} = eachOption
        const isSelected = selectedOptionId === id
        const shouldHighlight =
          isSelected || (correctOptionId === id && showCheckCircle)
        const showCorrectCheckCircle =
          showCheckCircle && isCorrect && (isSelected || correctOptionId === id)
        const showWrongCheckCircle = showCheckCircle && !isCorrect && isSelected

        let buttonClassName = 'quiz-default-option-container'

        let optionTextColor

        if (shouldHighlight) {
          optionTextColor = 'highlight-option-text'
        }

        if (shouldHighlight) {
          buttonClassName += isCorrect
            ? ' correct-default-option-bg'
            : ' wrong-default-option-bg'
        }

        return (
          <li className="quiz-default-option-list" key={id}>
            <div
              className={buttonClassName.trim()}
              onClick={() => onClickDefaultOption(eachOption)}
              role="button"
              tabIndex={0}
              onKeyPress={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onClickDefaultOption(eachOption)
                }
              }}
              disabled={disableOptionButton}
            >
              <p className={`quiz-default-option ${optionTextColor}`}>
                {eachOption.text}
              </p>
            </div>
            {showCorrectCheckCircle && (
              <img
                src={rightOptionCheckCircle}
                className="default-option-check-circle"
                alt="correct checked circle"
              />
            )}
            {showWrongCheckCircle && (
              <img
                src={wrongOptionCheckCircle}
                className="default-option-check-circle"
                alt="incorrect close circle"
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default QuizDefaultOptionList
