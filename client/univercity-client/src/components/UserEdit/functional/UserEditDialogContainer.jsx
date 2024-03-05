import React, {useEffect, useRef, useState} from 'react';
import API from "../../../API";
import {useDispatch} from "react-redux";
import {setMessage} from "../../../redux/actions/message/messageActions";
import UserEditDialogUi from "../ui/UserEditDialogUi";

const UserEditDialogContainer = ({open, setIsDialogOpen}) => {
    const dispatch = useDispatch();

    const [user, setUser] = useState({});
    const [avatarImage, setAvatarImage] = useState(null);
    const [iconFile, setIconFile] = useState(null);

    const uploadRef = useRef(null);

    useEffect(() => {
        API.get('/user/getMe')
            .then(response => {
                const user = response.data;
                setUser(user);
                return user;
            })
            .then(user => {
                if (user.imageId) {
                    API.get(`user/image/${user.id}`, {
                        responseType: 'arraybuffer'
                    })
                        .then(response => {
                            const data = response.data;
                            if (data && data.byteLength > 0) {
                                const blob = new Blob([data], {type: response.headers['content-type']});
                                setIconFile(new File([blob], 'image', {type: blob.type}))
                                const src = URL.createObjectURL(blob);
                                setAvatarImage(src);
                            }
                        })
                        .catch(e => {
                        });
                }
            })
            .catch(e => {
            });
    }, []);

    const handleSubmit = () => {
        let valid = true;
        let errorMessage = '';
        if (!user.firstName) {
            valid = false;
            errorMessage = errorMessage.concat(`First Name can't be empty \n`);
        }
        if (!user.lastName) {
            valid = false;
            errorMessage = errorMessage.concat(`Last Name can't be empty \n`);
        }
        if (!user.email || !isEmailValid(user.email)) {
            valid = false;
            errorMessage = errorMessage.concat(`Please enter a valid email address. \n`);
        }

        if (user.email) {
            API.get(`/user/exists-email?email=${user.email}&userId=${user.id}`)
                .then(res => {
                    if (res.data) {//if another user with the same email exists
                        errorMessage = errorMessage.concat(`A User with this email already exists \n`);
                        valid = false;
                    }
                    processSubmit();
                })
                .catch(e => {
                });
        } else {
            processSubmit();
        }

        function processSubmit() {
            if (user.password && !isPasswordComplex(user.password)) {
                valid = false;
                errorMessage = errorMessage.concat(`Password must be at least 6 characters long and contain at least one letter and one number.`);
                dispatch(setMessage(errorMessage, 'error'));
            }
            if (valid) {
                const formData = new FormData();
                formData.append('image', iconFile);

                API.post('/user/upload-image', formData, {
                    headers: {
                        ...API.defaults.headers,
                        "Content-Type": "multipart/form-data"
                    }
                })
                    .then(r => {
                        API.put('/user/update', user)
                            .then(data => {
                                dispatch(setMessage('User Info SuccessFully Updated', 'success'));
                            }).catch(e => {
                        })
                    })
                    .catch(e => {
                    });
                setIsDialogOpen(false);
            } else {
                dispatch(setMessage(errorMessage, 'error'));
            }
        }
    };

    const handleClose = () => {
        setIsDialogOpen(false);
    };

    const handleAvatarClick = () => {
        uploadRef.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setIconFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteClick = () => {
        setAvatarImage("");
        setIconFile(null);
        uploadRef.current.value = '';
    };

    const isPasswordComplex = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
        return passwordRegex.test(password);
    };

    const isEmailValid = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };

    return (
        <UserEditDialogUi
            open={open}
            handleClose={handleClose}
            uploadRef={uploadRef}
            handleImageChange={handleImageChange}
            avatarImage={avatarImage}
            handleSubmit={handleSubmit}
            user={user}
            setUser={setUser}
            handleAvatarClick={handleAvatarClick}
            handleDeleteClick={handleDeleteClick}
        />
    );
};

export default UserEditDialogContainer;
