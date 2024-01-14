import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { getExistingTopics } from "../../redux/actions/topic/topicActions";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
    root: {
        width: 300
    }
});

const AddEditTopicsContainer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getExistingTopics());
    }, [dispatch]);

    const topics = useSelector((state) => state.topic.topics);

    const [selectedValue, setSelectedValue] = useState(topics.length ? topics[0].title : '');

    if (!topics.length) {
        return <p>Loading...</p>;
    }

    const handleInputChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div>
            <h1>Topics</h1>
            <Select
                value={selectedValue}
                onChange={handleInputChange}
                renderValue={(selected) => (
                    <TextField
                        value={selected}
                        onChange={handleInputChange}
                        variant="standard"
                    />
                )}
            >
                {topics.map((option) => (
                    <MenuItem key={option.id} value={option.title}>
                        {option.title}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
}

export default AddEditTopicsContainer;
