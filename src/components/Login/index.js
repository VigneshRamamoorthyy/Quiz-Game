import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const history = useHistory()

  useEffect(() => {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      history.replace('/')
    }
  }, [history])

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onChangeShowPassword = event => {
    setShowPassword(event.target.checked)
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  const onSubmitFailure = errorMessage => {
    setShowSubmitError(true)
    setErrorMsg(errorMessage)
  }

  const onSubmitLoginForm = async event => {
    event.preventDefault()

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const renderUsernameField = () => (
    <div className="input-feild-container">
      <label className="input-label" htmlFor="username">
        USERNAME
      </label>
      <input
        className="input-field"
        type="text"
        id="username"
        value={username}
        onChange={onChangeUsername}
      />
    </div>
  )

  const renderPasswordField = () => (
    <div className="input-feild-container">
      <label className="input-label" htmlFor="password">
        PASSWORD
      </label>
      <input
        className="input-field"
        type={showPassword ? 'text' : 'password'}
        id="password"
        value={password}
        onChange={onChangePassword}
      />
    </div>
  )

  return (
    <div className="login-form-bg-container">
      <div className="login-form-container">
        <img
          src="https://res.cloudinary.com/dwcp6zcbi/image/upload/v1717953659/Frame_8004_d6iilq.png"
          className="login-website-logo"
          alt="login website logo"
        />
        <form className="form-container" onSubmit={onSubmitLoginForm}>
          {renderUsernameField()}
          {renderPasswordField()}
           <div className="checkbox-container">
            <input
              type="checkbox"
              className="password-checkbox"
              onChange={onChangeShowPassword}
              id="showpassword"
            />
            <label
              className="show-password-text"
              htmlFor="showpassword"
              type="checkbox"
            >
              Show Password
            </label>
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
          {showSubmitError && <p className="login-error-msg">{errorMsg}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login
