import React, {useEffect, useState} from 'react';
import noImage from "../../../assets/images/no-image-icon.png";
import API from "../../../API";

export const UserIcon = ({user, classes}) => {
    const [imageSource, setImageSource] = useState(noImage);
    useEffect(() => {
        API.get(`/user/small-image/${user.id}`, {
            responseType: 'arraybuffer'
        })
            .then(response => {
                const data = response.data;
                if (data && data.byteLength > 0) {
                    const blob = new Blob([data], {type: response.headers['content-type']});
                    const src = URL.createObjectURL(blob);
                    setImageSource(src);
                }
            })
            .catch(e => {
            });
    }, []);
    return (
        <span>
            <img src={imageSource} alt="no-image-icon.png"
                 className={classes.userIcon}/>
        </span>
    )
}