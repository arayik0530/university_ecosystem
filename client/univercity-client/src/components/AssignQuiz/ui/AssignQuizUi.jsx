import React, {useEffect, useState} from 'react';
import {makeStyles} from 'tss-react/mui';
import {
    Button,
    Checkbox,
    InputAdornment,
    List,
    ListItem,
    ListItemIcon,
    OutlinedInput,
    Radio,
    TextField,
    Typography,
} from '@mui/material';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import API from "../../../API";
import {useDispatch, useSelector} from "react-redux";
import {setMessage} from '../../../redux/actions/message/messageActions';

const useStyles = makeStyles()({
    formControl: {
        // margin: theme.spacing(1),
        width: '100%',
    },
    listContainer: {
        border: '1px solid #ddd',
        // borderRadius: theme.spacing(1),
        // padding: theme.spacing(2),
        width: '100%',
        overflowY: 'auto',
        // marginBottom: theme.spacing(2),
        marginTop: '10px',
        // overflowY: 'scroll',
        "&::-webkit-scrollbar": {
            width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "silver",
            borderRadius: "5px",
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: '#EFE5D5',
        }
    },
    listItemText: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
});

const AssignQuizUi = () => {
    const message = useSelector((state) => state.message);
    const dispatch = useDispatch();

    const {classes} = useStyles();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [deadline, setDeadline] = useState(null);
    const [questionCount, setQuestionCount] = useState('');
    const [durationInMinutes, setDurationInMinutes] = useState('');
    const [searchTextUsers, setSearchTextUsers] = useState('');
    const [searchTextTopics, setSearchTextTopics] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [allTopics, setAllTopics] = useState([]);
    useEffect(() => {
        API.get('/user/all/lite')
            .then(users => {
                setAllUsers(users.data);
            })
            .catch(e => {
            });
        API.get('/topic/all/lite')
            .then(topics => {
                setAllTopics(topics.data);
            })
            .catch(e => {
            });
    }, []);

    const handleUserToggle = (user) => () => {
        const currentIndex = selectedUsers.indexOf(user);
        const newSelectedUsers = [...selectedUsers];

        if (currentIndex === -1) {
            newSelectedUsers.push(user);
        } else {
            newSelectedUsers.splice(currentIndex, 1);
        }

        setSelectedUsers(newSelectedUsers);
    };

    const handleTopicChange = (event) => {
        setSelectedTopic(event.target.value);
    };

    const handleDeadlineChange = (date) => {
        setDeadline(date);
    };

    const handleQuestionCountChange = (event) => {
        const value = event.target.value;
        if (/^[1-9]\d*$/.test(value) || value === '') {
            setQuestionCount(value);
        }
    };

    const handleDurationChange = (event) => {
        const value = event.target.value;
        if (/^[1-9]\d*$/.test(value) || value === '') {
            setDurationInMinutes(value);
        }
    };

    const handleSearchUsersChange = (event) => {
        setSearchTextUsers(event.target.value);
    };

    const handleSubmit = () => {
        // Send data to the server
        const data = {
            deadline,
            durationInMinutes,
            questionCount,
            topicId: selectedTopic.id,
            userIdList: selectedUsers.map(user => user.id),
        };
        API.post('/quiz/create-upcoming-quiz', data)
            .then(r => {
                setSelectedTopic('');
                setQuestionCount('');
                setDurationInMinutes('');
                setSelectedUsers([]);
                setDeadline(null);
                setSearchTextUsers('');
                setSearchTextTopics('');
                dispatch(setMessage('Quiz assigned successfully', 'success'));
            })
            .catch(e => {
            });
    };

    const isDisabled = !selectedUsers.length || !selectedTopic || !deadline || !questionCount || !durationInMinutes;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginTop: '10px',
            width: '100%',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginBottom: '20px'
            }}>
                <Typography variant="h5">Assign Quiz</Typography>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'baseline'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    height: '200px'
                }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker className={classes.datePicker}
                                        disablePast={true}
                                        onChange={handleDeadlineChange}
                                        label="Select deadline"
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                width: '220px',
                                            },
                                        }}
                                        format="DD/MM/YYYY"
                                        slotProps={{textField: {size: 'small', readOnly: true}}}
                                        value={deadline}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <TextField
                        label="Question Count"
                        value={questionCount}
                        onChange={handleQuestionCountChange}
                        className={classes.formControl}
                        style={{fontSize: 'small', width: '220px'}}
                        variant="outlined" size="small"
                    />
                    <TextField
                        label="Duration (minutes)"
                        value={durationInMinutes}
                        onChange={handleDurationChange}
                        className={classes.formControl}
                        style={{fontSize: 'small', width: '220px'}}
                        variant="outlined" size="small"
                    />
                </div>
                {/*<div style={{*/}
                {/*    display: 'flex',*/}
                {/*    flexDirection: 'column',*/}
                {/*    alignItems: 'baseline',*/}
                {/*    justifyContent: 'space-between',*/}
                {/*}}>*/}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: '1',
                    marginLeft: '20px'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            border: '1px solid gray',
                            borderRadius: '5px',
                            padding: '10px',
                            height: '350px',
                            width: '45%'
                        }}>
                            <Typography variant="subtitle1">Select Users</Typography>
                            <OutlinedInput
                                className={classes.formControl}
                                placeholder="Filter Users"
                                value={searchTextUsers}
                                onChange={handleSearchUsersChange}
                                startAdornment={<InputAdornment position="start">🔍</InputAdornment>}
                                style={{fontSize: 'small', width: '100%'}}
                                variant="outlined" size="small"
                            />
                            <div className={classes.listContainer}>
                                <List>
                                    {allUsers
                                        .filter((user) => `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTextUsers.toLowerCase()))
                                        .map((user) => (
                                            <ListItem key={user.id} dense button onClick={handleUserToggle(user)}>
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={selectedUsers.indexOf(user) !== -1}
                                                        tabIndex={-1}
                                                        disableRipple
                                                    />
                                                </ListItemIcon>
                                                <p
                                                    className={classes.listItemText}
                                                    title={`${user.firstName} ${user.lastName}`}
                                                >
                                                    {`${user.firstName} ${user.lastName}`}
                                                </p>
                                            </ListItem>
                                        ))}
                                </List>
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            border: '1px solid gray',
                            borderRadius: '5px',
                            padding: '10px',
                            height: '350px',
                            width: '45%'
                        }}>
                            <Typography variant="subtitle1">Select Topic</Typography>
                            <OutlinedInput
                                className={classes.formControl}
                                placeholder="Filter Topics"
                                value={searchTextTopics}
                                onChange={(e) => setSearchTextTopics(e.target.value)}
                                startAdornment={<InputAdornment position="start">🔍</InputAdornment>}
                                style={{fontSize: 'small', width: '100%'}}
                                variant="outlined" size="small"
                            />
                            <div className={classes.listContainer}>
                                <List>
                                    {allTopics
                                        .filter((topic) => topic.title.toLowerCase().includes(searchTextTopics.toLowerCase()))
                                        .map((topic) => (
                                            <ListItem key={topic.id} dense button onClick={() => {
                                                setSelectedTopic(topic);
                                            }}>
                                                <ListItemIcon>
                                                    <Radio
                                                        edge="start"
                                                        checked={selectedTopic === topic}
                                                        tabIndex={-1}
                                                        disableRipple
                                                    />
                                                </ListItemIcon>
                                                <p
                                                    className={classes.listItemText}
                                                    title={topic.title}
                                                >
                                                    {topic.title}
                                                </p>
                                            </ListItem>
                                        ))}
                                </List>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginTop: '10px'
            }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={isDisabled}
                    style={{width: '150px'}}
                >
                    Assign
                </Button>
            </div>
        </div>
    );
};

export default AssignQuizUi;
