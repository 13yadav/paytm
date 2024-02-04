import { destroyToken } from '../services/JwtService'
import { useNavigate } from 'react-router-dom'

export const Appbar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    destroyToken()
    navigate('/signin')
  }

  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">PayTM App</div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">Hello</div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">U</div>
        </div>
        <button
          className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 my-2 w-full bg-red-500 text-white mr-2"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}
