import { useEffect, useState } from 'react'
import './Home.css'
import BottomMenu from './BottomMenu'
import Header from './Header'
import { IDadmin1 } from '../config/AdminIds'
import { auth, db } from '../config/FirebaseConfig'
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore'

export default function Home() {

  const [flashbacksList, setFlashbacksList] = useState([])

  const flasbacksCollectionRef = collection(db, 'flashbacks')

  useEffect(() => {
    getFlashbacksList()
  }, [])

  function strToDate(textDt) {
    var parts = textDt.split(".");
    var date = new Date(parts[2], parts[1] - 1, parts[0]);

    return date
  }

  function strToTime(textTi) {
    var timeParts = textTi.split(":");
    var time = new Date();
    time.setHours(timeParts[0]);
    time.setMinutes(timeParts[1]);
    time.setSeconds(timeParts[2]);

    return time
  }

  const getFlashbacksList = async () => {
    try {
      const data = await getDocs(flasbacksCollectionRef)
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

      filteredData.sort((a, b) => {
        const dateA = strToDate(a.date);
        const dateB = strToDate(b.date);
        
        if (dateA > dateB) return -1;
        if (dateA < dateB) return 1;

        const timeA = strToTime(a.time);
        const timeB = strToTime(b.time);
        if (timeA < timeB) return 1;
        if (timeA > timeB) return -1;
        
        return 0;
      })
      setFlashbacksList(filteredData)
    } catch (err) {
      console.error(err)
    }
  }

  const deleteFlashback = async (flashback_id) => {
    try {
        const flashbackDoc = doc(db, 'flashbacks', flashback_id)
        await deleteDoc(flashbackDoc)
        getFlashbacksList()
    } catch (err) {
        console.log(err)
    }
  }

  return (
    <>
      <Header />
      <div className='home-container'>
        {flashbacksList.map((flashback, index) => (
          <div style={flashback.photo != '' ? { backgroundImage: `url('${flashback.photo}')` } : {}} className={flashback.photo != '' ? 'flash-frame' : 'flash-frame flash-frame-v' + String(Math.floor(Math.random() * 8) + 1)} key={index}>
            <div className='data'>
              <p className='dt' >{flashback.date}</p>
              <p className='author' >{flashback.userName}</p>
            </div>
            <div className='lines'>
              <p className='l1' >{flashback.line1}</p>
              <p className='l2' >{flashback.line2}</p>
              <p className='l3' >{flashback.line3}</p>
            </div>
            {auth?.currentUser?.uid == IDadmin1 ? <button className='moderatorButton' onClick={() => deleteFlashback(flashback.id)}>Delete</button> : null}
          </div>
        ))}
      </div>
      <BottomMenu />
    </>
  )
}
