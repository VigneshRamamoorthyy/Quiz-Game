import './index.css'

const GameReportDefaultOptionList = props => {
  const {options} = props

  return (
    <ul className="game-report-default-option-lists">
      {options.map(eachOption => {
        const defaultOptionBgClass = eachOption.isCorrect
          ? 'correct-default-option-bg'
          : ''
        const checkCircleUrl = eachOption.isCorrect
          ? 'https://res.cloudinary.com/dwcp6zcbi/image/upload/v1718962838/Vector_ghwhf8.png'
          : ''

        const highlightedOptionText = eachOption.isCorrect
          ? 'highlight-option-text'
          : ''

        return (
          <li className="game-report-default-option-list" key={eachOption.id}>
            <div
              className={`game-report-default-option-container ${defaultOptionBgClass}`}
              type="button"
            >
              <button
                className={`game-report-option-button ${highlightedOptionText}`}
              >
                {eachOption.text}
              </button>
            </div>
            {eachOption.isCorrect ? (
              <img
                src={checkCircleUrl}
                className="default-option-check-circle"
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

export default GameReportDefaultOptionList

