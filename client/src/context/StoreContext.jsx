import React, { createContext, useState } from 'react'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    // user
    const [token, setToken] = useState('')
    const [_id, setID] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState()
    const [phoneNumber, setPhone] = useState()
    const [gender, setGender] = useState('')
    const [dob, setDoB] = useState()

    // concert
    const [name, setConcert] = useState('')
    const [artist, setArtist] = useState()
    const [date, setDate] = useState()
    const [time, setTime] = useState('')
    const [venue, setVenue] = useState()


    const contextValue = {
        token, setToken,
        _id, setID,
        username, setUsername,
        email, setEmail,
        password, setPassword,
        phoneNumber, setPhone,
        gender, setGender,
        dob, setDoB,
        name, setConcert,
        artist, setArtist,
        date, setDate,
        time, setTime,
        venue, setVenue
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider