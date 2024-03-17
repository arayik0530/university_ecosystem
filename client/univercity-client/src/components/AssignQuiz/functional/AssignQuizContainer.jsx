import React, {useEffect, useState} from 'react';
import API from "../../../API";
import {useDispatch} from "react-redux";
import {setMessage} from '../../../redux/actions/message/messageActions';
import AssignQuizUi from "../ui/AssignQuizUi";
import dayjs from "dayjs";

const AssignQuizContainer = () => {
    const dispatch = useDispatch();

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
                return users.data;
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
        const data = {
            deadline: dayjs(deadline.$d).format('YYYY-MM-DDTHH:mm:ss'),
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
        <AssignQuizUi
            handleDeadlineChange={handleDeadlineChange}
            deadline={deadline}
            questionCount={questionCount}
            handleQuestionCountChange={handleQuestionCountChange}
            durationInMinutes={durationInMinutes}
            handleDurationChange={handleDurationChange}
            searchTextUsers={searchTextUsers}
            handleSearchUsersChange={handleSearchUsersChange}
            allUsers={allUsers}
            selectedUsers={selectedUsers}
            searchTextTopics={searchTextTopics}
            handleUserToggle={handleUserToggle}
            setSearchTextTopics={setSearchTextTopics}
            allTopics={allTopics}
            setSelectedTopic={setSelectedTopic}
            selectedTopic={selectedTopic}
            handleSubmit={handleSubmit}
            isDisabled={isDisabled}
        />
    )
};

export default AssignQuizContainer;
