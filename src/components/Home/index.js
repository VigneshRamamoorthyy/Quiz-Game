import Header from '../Header'

import './index.css'

const Home = props => {
  const onClickStartQuiz = () => {
    const {history} = props
    history.push('/quiz-game')
  }

  return (
    <>
      <Header />
      <div className="home-bg-container">
        <div className="home-container">
          <div className="home-content-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png"
              alt="start quiz game"
              className="start-quiz-game-img"
            />
            <h1 className="start-quiz-question">
              How Many Of These Questions Do You Actually Know?
            </h1>
            <p className="start-quiz-description">
              Test yourself with these easy quiz questions and answers
            </p>
            <button
              className="start-quiz-button"
              onClick={onClickStartQuiz}
              type="button"
            >
              Start Quiz
            </button>
          </div>
          <div className="start-quiz-warning-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-error-img.png"
              alt="warning icon"
              className="warning-icon"
            />
            <p className="start-qiuz-warning-msg">
              All the progress will be lost, if you reload during the quiz
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
