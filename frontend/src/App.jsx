import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from 'react-router-dom'
import { history } from './helpers/history'
import { Home } from './pages/Home'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Dashboard } from './pages/Dashboard'
import { SendMoney } from './pages/SendMoney'
import { Error404 } from './pages/errors/Error404'
import { getToken } from './services/JwtService'
import { Toaster } from 'react-hot-toast'

function App() {
  history.navigate = useNavigate()
  history.location = useLocation()

  const isAuthenticated = !!getToken()

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/signin"
          element={!isAuthenticated ? <Signin /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />}
        />
        <Route
          path="/send"
          element={isAuthenticated ? <SendMoney /> : <Navigate to="/signin" />}
        />

        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  )
}

export default App
