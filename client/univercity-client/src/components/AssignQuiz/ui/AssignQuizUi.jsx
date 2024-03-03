import React from 'react';
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
import {UserIcon} from "./UserIcon";

const useStyles = makeStyles()({
    formControl: {
        width: '100%',
    },
    listContainer: {
        border: '1px solid #ddd',
        width: '100%',
        overflowY: 'auto',
        marginTop: '10px',
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
    },
    userIcon: {
        height: '60px',
        width: '60px'
    },
    userContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '85%'
    },
    listBlock: {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid gray',
        borderRadius: '5px',
        padding: '10px',
        height: '350px',
        width: '45%'
    },
    d_flex: {
        display: 'flex',
    },
    flex_column: {
        flexDirection: 'column',
    },
    flex_row: {
        flexDirection: 'row',
    },
    flex_start: {
        justifyContent: 'flex-start'
    },
    space_around: {
        justifyContent: 'space-around'

    },
    space_between: {
        justifyContent: 'space-between'

    },
    align_items_start: {
        alignItems: 'flex-start'
    },
    align_items_center: {
        alignItems: 'center'
    },
    align_items_baseline: {
        alignItems: 'baseline'
    },
    main_container: {
        marginTop: '10px',
        width: '85%',
    },
    width_100: {
        width: '100%',
    },
    inputs_container: {
        height: '200px',
        width: '20%'
    }
});

const AssignQuizUi = ({
                          handleDeadlineChange,
                          deadline,
                          questionCount,
                          handleQuestionCountChange,
                          durationInMinutes,
                          handleDurationChange,
                          searchTextUsers,
                          handleSearchUsersChange,
                          allUsers,
                          selectedUsers,
                          searchTextTopics,
                          handleUserToggle,
                          setSearchTextTopics,
                          allTopics,
                          setSelectedTopic,
                          selectedTopic,
                          handleSubmit,
                          isDisabled
                      }) => {

    const {classes} = useStyles();

    return (
        <div
            className={`${classes.main_container} ${classes.d_flex} ${classes.flex_column} ${classes.align_items_start}`}>
            <div className={`${classes.d_flex} ${classes.align_items_center} ${classes.flex_row} ${classes.flex_start}`}
                 style={{
                     marginBottom: '20px'
                 }}>
                <Typography variant="h5">Assign Quiz</Typography>
            </div>
            <div
                className={`${classes.width_100} ${classes.d_flex} ${classes.align_items_baseline} ${classes.flex_row} ${classes.space_between}`}>
                <div
                    className={`${classes.d_flex} ${classes.inputs_container} ${classes.align_items_baseline} ${classes.flex_column} ${classes.space_between}`}>
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
                <div className={`${classes.d_flex} ${classes.flex_column}`} style={{
                    flexGrow: '1',
                    marginLeft: '20px',
                    width: '65%'
                }}>
                    <div className={`${classes.d_flex} ${classes.flex_row} ${classes.space_around}`}>
                        <div className={classes.listBlock}>
                            <Typography variant="subtitle1">Select Users</Typography>
                            <OutlinedInput
                                className={classes.formControl}
                                placeholder="Filter Users"
                                value={searchTextUsers}
                                onChange={handleSearchUsersChange}
                                startAdornment={<InputAdornment position="start">🔍</InputAdornment>}
                                style={{fontSize: 'small'}}
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
                                                <div className={classes.userContainer}>
                                                    <p
                                                        className={classes.listItemText}
                                                        title={`${user.firstName} ${user.lastName}`}
                                                    >
                                                        {`${user.firstName} ${user.lastName}`}
                                                    </p>
                                                    <UserIcon user={user} classes={classes}/>
                                                </div>
                                            </ListItem>
                                        ))}
                                </List>
                            </div>
                        </div>
                        <div className={classes.listBlock}>
                            <Typography variant="subtitle1">Select Topic</Typography>
                            <OutlinedInput
                                className={classes.formControl}
                                placeholder="Filter Topics"
                                value={searchTextTopics}
                                onChange={(e) => setSearchTextTopics(e.target.value)}
                                startAdornment={<InputAdornment position="start">🔍</InputAdornment>}
                                style={{fontSize: 'small'}}
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
            <div className={`${classes.d_flex} ${classes.align_items_center} ${classes.flex_row} ${classes.flex_start}`}
                 style={{
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
