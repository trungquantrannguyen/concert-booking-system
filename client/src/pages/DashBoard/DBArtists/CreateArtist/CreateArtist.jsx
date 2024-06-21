import React, { useContext, useState } from 'react';
import axios from 'axios';
import { concertImg, getDownloadURL, ref, uploadBytesResumable } from '../../../../firebase';
import { StoreContext } from '../../../../context/StoreContext';
import Sidebar from '../../../../components/Sidebar/Sidebar';
import Navbar from '../../../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom'
import '../..//DashBoard.css';
import { Row, Col } from 'react-bootstrap';

function CreateArtist() {
    const { _id, token,
        artist, setArtist,
        genre, setGenre } = useContext(StoreContext);

    const [imageFile, setImageFile] = useState(null);
    const navigate = useNavigate()

    async function handleImageUpload(e) {
        const file = e.target.files[0];
        setImageFile(file);
    }

    async function uploadImage(file) {
        return new Promise((resolve, reject) => {
            const storageRef = ref(concertImg, `artists/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                },
                (error) => {
                    // Handle unsuccessful uploads
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    }

    async function submit(e) {
        e.preventDefault();
        let imageUrl = '';
        if (imageFile) {
            imageUrl = await uploadImage(imageFile);
        }
        console.log(imageUrl)

        try {
            await axios.post(`http://localhost:3000/api/artist/${_id}`, {
                name: artist,
                genre: genre,
                imgURL: imageUrl
            }, {
                headers: {
                    'Authorization': `${token}`
                }
            })
                .then((res) => {
                    console.log(res);
                    if (res.status === 201 || res.data === 'Created successfully') {
                        navigate('/artists');
                    }
                })
                .catch((e) => {
                    alert('Wrong inputs!');
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <Row>
                <Navbar />
            </Row>
            <Row>
                <Col sm={2}>
                    <Sidebar />
                </Col>
                <Col sm={10}>
                    <form className='inputs' action='POST'>
                        <h3>New Artist</h3>
                        <div className='input'>
                            <span className='label-value'>Artist</span>
                            <div className='input-value'>
                                <input type='text' onChange={(e) => setArtist(e.target.value)} placeholder='' />
                            </div>
                        </div>
                        <div className='input'>
                            <span className='label-value'>Genre</span>
                            <div className='input-value'>
                                <input type='text' onChange={(e) => setGenre(e.target.value)} placeholder='' />
                            </div>
                        </div>
                        <div className='input'>
                            <span className='label-value'>Artist Photo</span>
                            <div className='input-value'>
                                <input type='file' onChange={handleImageUpload} />
                            </div>
                        </div>
                        <div className='d-grid gap-2 mt-3'>
                            <input className='btn btn-primary' type='submit' onClick={submit} value='create' />
                        </div>
                    </form>
                </Col>
            </Row>
        </div>
    );
}

export default CreateArtist;
