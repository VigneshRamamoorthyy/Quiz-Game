import './index.css'

const GameReportImageOptionList = props => {
  const {options} = props

  return (
    <ul className="game-report-option-lists">
      {options.map(eachOption => {
        const checkCircleUrl = eachOption.isCorrect
          ? 'https://res.cloudinary.com/dwcp6zcbi/image/upload/v1718962838/Vector_ghwhf8.png'
          : ''

        return (
          <li className="game-report-image-option-list" key={eachOption.id}>
            <button className="game-report-image-option-button" type="button">
              <img
                src={eachOption.imageUrl}
                className="game-report-option-image"
                alt={eachOption.text}
              />
            </button>
            {eachOption.isCorrect ? (
              <img
                src={checkCircleUrl}
                className="image-option-check-circle"
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

export default GameReportImageOptionList
