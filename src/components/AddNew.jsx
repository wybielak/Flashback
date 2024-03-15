import { useState } from 'react'
import React from 'react'
import './AddNew.css'
import BottomMenu from './BottomMenu'
import { v4 } from 'uuid' 
import { auth } from '../config/FirebaseConfig'
import { db } from '../config/FirebaseConfig'
import { storage } from '../config/FirebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default function AddNew() {

    const flasbacksCollectionRef = collection(db, 'flashbacks')

    const [newLine1, setNewLine1] = useState('')
    const [newLine2, setNewLine2] = useState('')
    const [newLine3, setNewLine3] = useState('')

    const [currentDate, setCurrentDate] = useState(new Date());

    const [fileUploaded, setFileUploaded] = useState(null)
    const [fileUrl, setFileUrl] = useState('')

    const [disabled1, setDisabled1] = useState(false)

    const compressImage = async (file, { quality = 1, type = file.type }) => {
        const imageBitmap = await createImageBitmap(file);

        const canvas = document.createElement('canvas');
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(imageBitmap, 0, 0);

        const blob = await new Promise((resolve) =>
            canvas.toBlob(resolve, type, quality)
        );

        return new File([blob], file.name, {
            type: blob.type,
        });
    };

    const onSubmitFlashback = () => {
        addDoc(flasbacksCollectionRef, { line1: newLine1, line2: newLine2, line3: newLine3, photo: fileUrl, date: currentDate.toLocaleDateString(), time: currentDate.toLocaleTimeString(), userName: auth?.currentUser?.displayName, userId: auth?.currentUser?.uid }).then(() => {
            setNewLine1('')
            setNewLine2('')
            setNewLine3('')

            setFileUploaded(null)
            setDisabled1(false)
            setFileUrl('')
            setCurrentDate(new Date())
        })
    }

    const uploadImage = () => {
        if (fileUploaded == null || !fileUploaded.type.startsWith('image')) {
            setFileUploaded(null)
            setDisabled1(false)
            setFileUrl('')
            setCurrentDate(new Date())
            return
        }

        compressImage(fileUploaded, {quality: 0.1, type: 'image/jpeg'}).then((compressedFile) => {
            const imageRef = ref(storage, `flashphotos/${auth?.currentUser?.displayName + v4()}`)
            uploadBytes(imageRef, compressedFile).then(() => {
                getDownloadURL(imageRef).then((url) => {
                    setFileUrl(url)
                })
                setDisabled1(true)
            })
        })
    }

    return (
        <>
            <div className='addnew-container'>
                <h1>Utwórz nowy<br /><span>Flashback</span></h1>
                <p className='subtitle'>Co najbardziej<br />kojarzy ci się ze wspomnieniem?</p>
                <div className='add-form'>
                    <div style={fileUrl != '' ? {backgroundImage: `url('${fileUrl}')`} : {}} className='flash-frame-new'>
                        <div className='data'>
                            <p className='dt' >{currentDate.toLocaleDateString()}</p>
                            <p className='author' >{auth?.currentUser?.displayName}</p>
                        </div>
                        <div className='lines'>
                            <input placeholder='Pisz tutaj' type="text" value={newLine1} onChange={(e) => setNewLine1(e.target.value)} />
                            <input placeholder='Śmiało' type="text" value={newLine2} onChange={(e) => setNewLine2(e.target.value)} />
                            <input placeholder='Wymyś coś kreatywnego' type="text" value={newLine3} onChange={(e) => setNewLine3(e.target.value)} />
                        </div>
                    </div>
                    <div className='buttons'>
                        <label style={ fileUploaded == null ? {} : {opacity: '0.5', cursor: 'not-allowed'} } htmlFor="file" className="custom-file-upload">
                            Wybierz zdjęcie
                        </label>
                        <input disabled={ fileUploaded == null ? false : true } style={{ display: 'none' }} type="file"  id='file' accept='image/*' onChange={(e) => setFileUploaded(e.target.files[0])} />
                        <button disabled={ fileUploaded == null || disabled1 ? true : false } onClick={uploadImage}><MdOutlineAddPhotoAlternate /></button>
                    </div>
                        <button className='upload-button' onClick={onSubmitFlashback}>Utwórz</button>
                </div>
            </div>
            <BottomMenu />
        </>
    )
}
