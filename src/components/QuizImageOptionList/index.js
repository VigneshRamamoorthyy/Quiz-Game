import {useState, useContext} from 'react'
import quizContext from '../../context/quizContext'
import './index.css'

const QuizImageOptionList = props => {
  const [showCheckCircle, setShowCheckCircle] = useState(false)
  const [wrongOptionCheckCircle, setWrongOptionCheckCircle] = useState('')
  const [rightOptionCheckCircle, setRightOptionCheckCircle] = useState('')
  const [selectedOptionId, setSelectedOptionId] = useState(null)
  const [correctOptionId, setCorrectOptionId] = useState(null)

  const {optionDetails, handleSetDisableOption, disableOptionButton} = props

  const {countCorrectAnswer, countInCorrectAnswer} = useContext(quizContext)

  const onClickImageOption = eachOption => {
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
    <ul className="quiz-image-option-lists">
      {optionDetails.map(eachOption => {
        const {id, isCorrect} = eachOption
        const isSelected = selectedOptionId === id

        const showCorrectCheckCircle =
          showCheckCircle && isCorrect && (isSelected || correctOptionId === id)
        const showWrongCheckCircle = showCheckCircle && !isCorrect && isSelected

        return (
          <li className="quiz-image-option-list" key={id}>
            <button
              className="quiz-image-option-button"
              onClick={() => onClickImageOption(eachOption)}
              disabled={disableOptionButton}
              type="button"
            >
              <img
                src={eachOption.imageUrl}
                alt={eachOption.text}
                className="quiz-option-image"
              />
            </button>
            {showCorrectCheckCircle && (
              <img
                src={rightOptionCheckCircle}
                className="image-option-check-circle"
                alt="correct checked circle"
              />
            )}
            {showWrongCheckCircle && (
              <img
                src={wrongOptionCheckCircle}
                className="image-option-check-circle"
                alt="incorrect close circle"
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default QuizImageOptionList
