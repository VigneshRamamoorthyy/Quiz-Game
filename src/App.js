import {useState, useCallback} from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import QuizGame from './components/QuizGame'
import GameResults from './components/GameResults'
import GameReport from './components/GameReport'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import quizContext from './context/quizContext'
import './App.css'

const App = () => {
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  const [inCorrectAnswersCount, setInCorrectAnswer] = useState(0)
  const [unattemptedQuestions, setUnattemptedQuestions] = useState([])

  const countCorrectAnswer = useCallback(() => {
    setCorrectAnswersCount(prevState => prevState + 1)
  }, [])

  const countInCorrectAnswer = useCallback(() => {
    setInCorrectAnswer(prevState => prevState + 1)
  }, [])

  const addUnattemptedQuestion = useCallback(unattemptedQuestion => {
    if (unattemptedQuestion !== undefined) {
      setUnattemptedQuestions(prevQuestions => [
        ...prevQuestions,
        unattemptedQuestion,
      ])
    }
  }, [])

  return (
    <quizContext.Provider
      value={{
        correctAnswersCount,
        inCorrectAnswersCount,
        countCorrectAnswer,
        countInCorrectAnswer,
        unattemptedQuestions,
        addUnattemptedQuestion,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/quiz-game" component={QuizGame} />
        <ProtectedRoute exact path="/game-results" component={GameResults} />
        <ProtectedRoute exact path="/game-report" component={GameReport} />
        <Route component={NotFound} />
      </Switch>
    </quizContext.Provider>
  )
}

export default App
