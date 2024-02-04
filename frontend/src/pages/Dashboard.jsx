import { useEffect, useState } from 'react'
import { Appbar } from '../components/Appbar'
import { Balance } from '../components/Balance'
import { Users } from '../components/Users'
import ApiService from '../services/ApiService'
import { toast } from 'react-hot-toast'

export const Dashboard = () => {
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    ApiService.get(`/account/balance`)
      .then((response) => {
        if (response.status === 200) {
          setBalance(response.data.balance)
        } else {
          console.error(response)
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
  }, [])

  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  )
}
