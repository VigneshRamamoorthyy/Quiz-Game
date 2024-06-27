import './index.css'

const GameReportSingleSelectOptionList = props => {
  const {options} = props

  return (
    <ul className="quiz-option-lists">
      {options.map(eachOption => {
        const checkCircleUrl = eachOption.isCorrect
          ? 'https://res.cloudinary.com/dwcp6zcbi/image/upload/v1718962838/Vector_ghwhf8.png'
          : ''
        return (
          <li
            className="game-report-single-select-option-list"
            key={eachOption.id}
          >
            <input
              type="radio"
              name="option"
              id={eachOption.text}
              className="game-report-singleselect-option-input-element"
            />
            <label
              htmlFor={eachOption.text}
              className="game-report-single-select-option-label"
            >
              {eachOption.text}
            </label>

            {eachOption.isCorrect ? (
              <img
                src={checkCircleUrl}
                className="game-report-option-check-circle"
                alt="checkcircle"
              />
            ) : (
              ''
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default GameReportSingleSelectOptionList
