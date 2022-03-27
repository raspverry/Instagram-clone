import React, { useEffect, useState } from 'react'
import { SignedInStack, SignedOutStack } from './navigation'
import {auth} from './firebase'
import { onAuthStateChanged } from 'firebase/auth'

const AuthNavigation = () => {
    const [currentUser, setCurrentuser] = useState(null)

    const userHandler = user => user ? setCurrentuser(user) : setCurrentuser(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => userHandler(user))
        return unsubscribe
    }, [])
    return <>{currentUser ? <SignedInStack/> : <SignedOutStack/> }</>
}

export default AuthNavigation
