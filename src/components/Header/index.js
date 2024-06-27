import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogoutBtn = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="nav-header">
      <div className="nav-content">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dwcp6zcbi/image/upload/v1717953659/Frame_8004_d6iilq.png"
            alt="website logo"
            className="nav-website-logo"
          />
        </Link>

        <button
          className="nav-logout-mobile-btn"
          onClick={onClickLogoutBtn}
          aria-label="Logout"
          type="button"
        >
          <img
            src="https://res.cloudinary.com/dwcp6zcbi/image/upload/v1717954167/log-out-02_rrr3yr.png"
            alt="logout"
            className="nav-logout-img"
          />
        </button>
        <button
          className="nav-logout-desktop-btn"
          onClick={onClickLogoutBtn}
          aria-label="Logout"
          type="button"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
