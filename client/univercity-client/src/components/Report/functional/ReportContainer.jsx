import React, {useEffect, useState} from 'react';
import ChartComponent from "./ChartComponent";
import API from "../../../API";
import dayjs from "dayjs";

const ReportContainer = () => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [group, setGroup] = useState('');
    const [user, setUser] = useState('');
    const [topic, setTopic] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [allGroups, setAllGroups] = useState([]);
    const [allTopics, setAllTopics] = useState([]);
    const [reportQuizzes, setReportQuizzes] = useState([]);

    useEffect(() => {
        API.get('/user/all/lite' + (!group ? '' : `?groupId=${group.id}`))
            .then(users => {
                setAllUsers(users.data);
            })
            .catch(e => {
            });
    }, [group]);

    useEffect(() => {
        API.get('/topic/all/lite')
            .then(topics => {
                setAllTopics(topics.data);
            })
            .catch(e => {
            });
    }, []);

    useEffect(() => {
        API.get('/group/all/lite')
            .then(groups => {
                setAllGroups(groups.data);
            })
            .catch(e => {
            });
    }, []);

    useEffect(() => {
        const searchCriteria = {
            endRange: !!toDate ? dayjs(toDate.$d).format('YYYY-MM-DDTHH:mm:ss') : null,
            groupId: !!group ? group.id : null,
            startRange: !!fromDate ? dayjs(fromDate.$d).format('YYYY-MM-DDTHH:mm:ss') : null,
            topicId: !!topic ? topic.id : null,
            userIdList: !!user ? [user.id] : null
        }
        if(!isObjectEmpty(searchCriteria)) {
            API.post('/quiz/generate/report', searchCriteria)
                .then(quizzes => {
                    setReportQuizzes(quizzes.data);
                })
                .catch(e => {
                });
        }
    }, [fromDate, toDate, group, user, topic]);


    return (
        <ChartComponent
            quizzes={reportQuizzes}
            fromDate={fromDate}
            toDate={toDate}
            setFromDate={setFromDate}
            setToDate={setToDate}
            topic={topic}
            setTopic={setTopic}
            setGroup={setGroup}
            group={group}
            user={user}
            setUser={setUser}
            allUsers={allUsers}
            setAllUsers={setAllUsers}
            allTopics={allTopics}
            allGroups={allGroups}
        />
    )
};

function isObjectEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key) && (obj[key] !== null && obj[key] !== undefined && obj[key] !== '')) {
            return false;
        }
    }
    return true;
}

export default ReportContainer;
