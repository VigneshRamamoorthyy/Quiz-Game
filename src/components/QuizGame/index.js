import {useState, useEffect, useCallback, useRef, useContext} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import QuizDefaultOptionList from '../QuizDefaultOptionList'
import QuizImageOptionList from '../QuizImageOptionList'
import QuizSingleSelectOptionList from '../QuizSingleSelectOptionList'

import quizContext from '../../context/quizContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const QuizGame = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [quizDetails, setQuizDetails] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [disableOptionButton, setDisableOptionButton] = useState(false)
  const [quizTimer, setQuizTimer] = useState(15)
  const [activeNextQuestionBtn, setActiveNextQuestionBtn] = useState(false)
  const [redirectToResults, setRedirectToResults] = useState(false)

  const intervalId = useRef(null)

  const {addUnattemptedQuestion} = useContext(quizContext)

  const getQuizDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress)

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/assess/questions'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      const formattedDataOption = data.questions.map(eachData => ({
        id: eachData.id,
        questionText: eachData.question_text,
        optionsType: eachData.options_type,
        options: eachData.options.map(eachOptionData => {
          if (eachData.options_type === 'IMAGE') {
            return {
              id: eachOptionData.id,
              imageUrl: eachOptionData.image_url,
              isCorrect: eachOptionData.is_correct === 'true',
              text: eachOptionData.text,
            }
          }
          return {
            id: eachOptionData.id,
            isCorrect: eachOptionData.is_correct === 'true',
            text: eachOptionData.text,
          }
        }),
      }))
      setQuizDetails(formattedDataOption)
      console.log(formattedDataOption)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getQuizDetails()
  }, [])

  const handleNextQuestion = useCallback(() => {
    if (questionIndex < quizDetails.length - 1) {
      setQuestionIndex(prevIndex => prevIndex + 1)
      setQuizTimer(15) // Reset timer when moving to next question
      setDisableOptionButton(false)
    } else {
      setRedirectToResults(true)
    }
  }, [questionIndex, quizDetails])

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setQuizTimer(prevTimer => {
        if (prevTimer === 1) {
          return 15 // Reset timer
        }
        return prevTimer - 1 // Decrease timer
      })
    }, 1000)

    intervalId.current = timerInterval // Store interval ID

    return () => {
      clearInterval(timerInterval) // Cleanup on unmount or change
    }
  }, [questionIndex, quizDetails])

  useEffect(() => {
    if (quizTimer === 1) {
      addUnattemptedQuestion(quizDetails[questionIndex])
      handleNextQuestion()
    }
  }, [
    quizTimer,
    addUnattemptedQuestion,
    handleNextQuestion,
    quizDetails,
    questionIndex,
  ])

  const handleSetDisableOption = () => {
    setDisableOptionButton(true)
    setActiveNextQuestionBtn(true)

    clearInterval(intervalId.current)
    intervalId.current = null // Reset intervalId.current
  }

  const onClickNextQuestionBtn = () => {
    if (activeNextQuestionBtn) {
      handleNextQuestion()
      setActiveNextQuestionBtn(false)
    }
  }

  const onClickRetryButton = () => {
    getQuizDetails()
  }

  const renderQuizOptionsList = (options, optionsType) => {
    switch (optionsType) {
      case 'DEFAULT':
        return (
          <QuizDefaultOptionList
            optionDetails={options}
            handleSetDisableOption={handleSetDisableOption}
            disableOptionButton={disableOptionButton}
          />
        )
      case 'IMAGE':
        return (
          <QuizImageOptionList
            optionDetails={options}
            handleSetDisableOption={handleSetDisableOption}
            disableOptionButton={disableOptionButton}
          />
        )
      case 'SINGLE_SELECT':
        return (
          <QuizSingleSelectOptionList
            optionDetails={options}
            handleSetDisableOption={handleSetDisableOption}
            disableOptionButton={disableOptionButton}
          />
        )
      default:
        return null
    }
  }

  const renderQuizDetailsView = () => {
    const {questionText, options, optionsType} = quizDetails[questionIndex]
    const activeNextquestionBtnClass = activeNextQuestionBtn
      ? 'active-next-btn'
      : ''
    return (
      <>
        <div className="question-number-timer-container">
          <div className="question-number-container">
            <p className="question-text">Question</p>
            <p className="question-number">
              {questionIndex + 1}/{quizDetails.length}
            </p>
          </div>
          <div className="timer-container">
            <p className="timer">{quizTimer}</p>
          </div>
        </div>
        <div className="quiz-question-content-container">
          <div className="quiz-question-and-option-container">
            <p className="quiz-question">{questionText}</p>
            {renderQuizOptionsList(options, optionsType)}
          </div>

          <button
            className={`next-question-button ${activeNextquestionBtnClass}`}
            onClick={onClickNextQuestionBtn}
            type="button"
          >
            {questionIndex === quizDetails.length - 1
              ? 'Submit'
              : 'Next Question'}
          </button>
        </div>
      </>
    )
  }

  const renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#263868" height={50} width={50} />
    </div>
  )

  const renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-assess-failure-img.png "
        className="failure-view-img"
        alt="failure view"
      />
      <h1 className="failure-view-heading">Something went wrong</h1>
      <p className="failure-view-description">
        Our servers are busy please try again
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  const renderQuizOutput = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoaderView()
      case apiStatusConstants.success:
        return renderQuizDetailsView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  if (redirectToResults) {
    return <Redirect to="/game-results" />
  }

  return (
    <>
      <Header />
      <div className="quiz-bg-container">
        <div className="quiz-container">{renderQuizOutput()}</div>
      </div>
    </>
  )
}

export default QuizGame
