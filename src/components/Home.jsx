import { React, useEffect, useState } from 'react'
import './Home.css'
import BottomMenu from './BottomMenu'
import { db } from '../config/FirebaseConfig'
import { getDocs, collection } from 'firebase/firestore'

export default function Home() {

  const [flashbacksList, setFlashbacksList] = useState([])

  const flasbacksCollectionRef = collection(db, 'flashbacks')

  useEffect(() => {
    getFlashbacksList()
  }, [])

  const getFlashbacksList = async () => {
    try {
      const data = await getDocs(flasbacksCollectionRef)
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

      filteredData.sort((a, b) => {
        const dateCompare = b.date.localeCompare(a.date)
        if (dateCompare === 0) {
          return b.time.localeCompare(a.time)
        }
        return dateCompare
      })
      setFlashbacksList(filteredData)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
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
          </div>
        ))}
      </div>
      <BottomMenu />
    </>
  )
}
