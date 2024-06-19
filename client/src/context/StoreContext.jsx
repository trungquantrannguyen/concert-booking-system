import React, { createContext, useState, useEffect } from 'react'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    // user
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [_id, setID] = useState('')
    const [isAdmin, setIsAdmin] = useState(false);
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

    //artist
    const [genre, setGenre] = useState()

    //venue
    const [location, setLocation] = useState('');
    const [capacity, setCapacity] = useState('');
    const [seatClass, setSeatClass] = useState({});
    const [priceRange, setPriceRange] = useState({});


    const contextValue = {
        token, setToken,
        _id, setID,
        isAdmin, setIsAdmin,
        user, setUser,
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
        venue, setVenue,
        genre, setGenre,
        location, setLocation,
        capacity, setCapacity,
        seatClass, setSeatClass,
        priceRange, setPriceRange
    }

    useEffect(() => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }, [token, user]);

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider