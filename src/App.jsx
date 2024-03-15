import './App.css'
import Auth from './components/Auth'
import UserContent from './components/UserContent';
import { auth } from './config/FirebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'

function App() {

  const [user] = useAuthState(auth)

  return (
    <>
      <div className='main-container'>
        {user == null ? <Auth /> : <UserContent />}
      </div>
    </>
  )
}

export default App
