import React, { useEffect, useState } from 'react'
import './Profile.css'
import BottomMenu from './BottomMenu'
import { auth } from '../config/FirebaseConfig'
import { db } from '../config/FirebaseConfig'
import { signOut } from 'firebase/auth'
import { getDocs, collection } from 'firebase/firestore'

export default function Profile() {

    const [flashbacksCount, setFlashbacksCount] = useState(0)

    const [flashbacksList, setFlashbacksList] = useState([])
    const flasbacksCollectionRef = collection(db, 'flashbacks')

    useEffect(() => { getFlashbacksList() }, [])

    const getFlashbacksList = async () => {
        try {
            const data = await getDocs(flasbacksCollectionRef)
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

            const filteredData2 = filteredData.filter((item) => {
                if (item.userId == auth?.currentUser?.uid) {
                    return item
                }
            })

            filteredData2.sort((a, b) => {
                const dateCompare = b.date.localeCompare(a.date)
                if (dateCompare === 0) {
                    return b.time.localeCompare(a.time)
                }
                return dateCompare
            })
            setFlashbacksList(filteredData2)
            setFlashbacksCount(filteredData2.length)
        } catch (err) {
            console.error(err)
        }
    }

    const logOut = async () => {
        try {
            await signOut(auth)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className='profile-container'>
                <div className={'profile-background flash-frame-v' + String(Math.floor(Math.random() * 8) + 1)}>
                    <h1>Flashbacks</h1>
                    <h1>{flashbacksCount}</h1>
                </div>
                <div className='user-container'>
                    <img src={auth?.currentUser?.photoURL} alt="" />
                    <h2>{auth?.currentUser?.displayName}</h2>
                    <p>{auth?.currentUser?.email}</p>
                </div>
                <h3>Moje</h3>
                <div className='your-content'>
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
                <button className='logout-button' onClick={logOut}>Wyloguj</button>
            </div>
            <BottomMenu />
            <div className='appauthor'>Created by DNw 2024</div>
        </>
    )
}
