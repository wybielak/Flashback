import React from 'react'
import './Auth.css'
import { auth, googleProvider } from '../config/FirebaseConfig'
import { signInWithPopup } from 'firebase/auth'

export default function Auth() {

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <div className='main-auth-container'>
                <div className='second-auth-container'>
                    <h1>Flashback</h1>
                    <p>
                        Zapamiętuj chwile i<br />wracaj do swoich wspomnień<br />jak nigdy wcześniej.
                    </p>
                    <div className='google-auth'>
                        <h4>Zaloguj się</h4>
                        <button onClick={signInWithGoogle}>
                            <div>
                                <div className='icon-frame'>
                                    <div className='google-icon'></div>
                                </div>
                                <span>Continue with Google</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
