import { useEffect, useState } from 'react'
import './AdminGallery.css'
import BottomMenu from './BottomMenu'
import Header from './Header'
import NotFount from './NotFount'
import { ref, listAll, getDownloadURL, getMetadata, deleteObject } from 'firebase/storage'
import { auth, storage } from '../config/FirebaseConfig'
import { IDadmin1 } from '../config/AdminIds'

export default function AdminGallery() {

    const imagesRef = ref(storage, 'flashphotos')

    const [gallery, setGallery] = useState([])

    useEffect(() => {
        getFlashphotos()
      }, [])

    const getFlashphotos = async () => {
        try {
            var testList = []
            
            if (auth?.currentUser?.uid == IDadmin1) {
                const data = await listAll(imagesRef)
                
                for (let i = 0; i < data.items.length; i++) {
                    const imageRef = data.items[i];
                    const metaData = await getMetadata(imageRef)
                    const url = await getDownloadURL(imageRef)
                    testList.push({"path": imageRef._location.path_, "url": url, "date": metaData.timeCreated});
                }

                testList.sort((a, b) => {
                    const dateA = a.date;
                    const dateB = b.date;
                    
                    if (dateA > dateB) return -1;
                    if (dateA < dateB) return 1;
                    
                    return 0;
                })
            }

            setGallery(testList)
            
        } catch (err) {
            console.error(err)
        }
    }

    const deletePhoto = async (path) => {
        try {
            const desertRef = ref(storage, path);
            await deleteObject(desertRef)
            getFlashphotos()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Header />
            {auth?.currentUser?.uid == IDadmin1 ?
                <div className='gallery-container'>
                {gallery.map((photo, index) => (
                    <div style={{ backgroundImage: `url('${photo.url}')` }} className={'flash-frame'} key={index}>
                        <div className='data' style={{ flexDirection: "column", alignItems: "flex-start" }}>
                            <p className='dt' >{photo.path}</p>
                            <p className='author' >{photo.date}</p>
                        </div>
                        <button className='moderatorButton' onClick={() => deletePhoto(photo.path)} >Delete</button>
                    </div>
                ))}
            </div>
            : <NotFount />}
            <BottomMenu />
        </>
    )
}
