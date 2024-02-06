import { redirect } from "react-router-dom"

// export const getTokenDuration = () => {
//     const storedExpirationDate = localStorage.getItem('expiration')
//     const expirationDate = new Date(storedExpirationDate)
//     // console.log(expirationDate)
//     const now = new Date()
//     const duration = expirationDate.getTime() - now.getTime()
//     return duration
// }

// getTokenDuration();

export const getAuthToken = () => {
    const token = localStorage.getItem('token');

    if(!token){
        return null
    }

    // const tokenDuration = getTokenDuration()

    // if(tokenDuration < 0 ){
    //     return 'EXPIRED'
    // }

    return token
}

export const loadToken = () => {
    return getAuthToken()
}


export const checkAuthLoader = () => {
    const token = getAuthToken()

    if(!token){
        return redirect('/auth')
    }

    return null;
}