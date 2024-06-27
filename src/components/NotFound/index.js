import './index.css'

const NotFound = () => (
  <div className="no-found-container">
    <img
      src="https://res.cloudinary.com/dwcp6zcbi/image/upload/v1719217161/Not-Found_bd2zqu.png"
      className="no-found-img"
      alt="not found"
    />
    <h1 className="no-found-heading">Page Not Found</h1>
    <p className="no-found-description">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
