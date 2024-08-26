import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div>
        <div>
            <h1>Quick Chat</h1>
            <Link to={'/signup'} ><button>Signup</button></Link>
        </div>
    </div>
  )
}

export default Landing