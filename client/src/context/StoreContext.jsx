import React, { createContext, useState } from 'react'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const [token, setToken] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState()
    const [phoneNumber, setPhone] = useState()
    const [gender, setGender] = useState('')
    const [dob, setDoB] = useState()

    const contextValue = {
        token, setToken,
        username, setUsername,
        email, setEmail,
        password, setPassword,
        phoneNumber, setPhone,
        gender, setGender,
        dob, setDoB
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider