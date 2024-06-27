import {useState, useContext} from 'react'
import quizContext from '../../context/quizContext'
import './index.css'

const QuizSingleSelectOptionList = props => {
  const [showCheckCircle, setShowCheckCircle] = useState(false)
  const [wrongOptionCheckCircle, setWrongOptionCheckCircle] = useState('')
  const [rightOptionCheckCircle, setRightOptionCheckCircle] = useState('')
  const [selectedOptionId, setSelectedOptionId] = useState(null)
  const [correctOptionId, setCorrectOptionId] = useState(null)

  const {optionDetails, handleSetDisableOption, disableOptionButton} = props

  const {countCorrectAnswer, countInCorrectAnswer} = useContext(quizContext)

  const onChangeSingleSelectOption = eachOption => {
    const {id, isCorrect} = eachOption

    if (isCorrect) {
      setRightOptionCheckCircle(
        'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png',
      )
      countCorrectAnswer() // Increment score if the answer is correct
      setCorrectOptionId(id)
    } else {
      setWrongOptionCheckCircle(
        'https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png',
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
    <ul className="quiz-single-select-option-lists">
      {optionDetails.map(eachOption => {
        const {id, isCorrect, text} = eachOption
        const isSelected = selectedOptionId === id

        const showCorrectCheckCircle =
          showCheckCircle && isCorrect && (isSelected || correctOptionId === id)
        const showWrongCheckCircle = showCheckCircle && !isCorrect && isSelected

        return (
          <li className="quiz-single-select-option-list" key={id}>
            <input
              type="radio"
              name="option"
              id={text}
              className="quiz-single-select-option-input-element"
              onChange={() => onChangeSingleSelectOption(eachOption)}
              disabled={disableOptionButton}
            />
            <label htmlFor={text} className="quiz-single-select-option-label">
              {text}
            </label>
            {showCorrectCheckCircle && (
              <img
                src={rightOptionCheckCircle}
                className="single-select-option-check-circle"
                alt="correct checked circle"
              />
            )}
            {showWrongCheckCircle && (
              <img
                src={wrongOptionCheckCircle}
                className="single-select-option-check-circle"
                alt="incorrect close circle"
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default QuizSingleSelectOptionList
