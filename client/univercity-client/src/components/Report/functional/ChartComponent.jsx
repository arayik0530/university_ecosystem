import React, {useState} from 'react';
import {FormControl, FormHelperText, InputLabel, MenuItem, Paper, Select} from '@mui/material';
import {axisClasses, BarChart, PieChart} from "@mui/x-charts";
import {makeStyles} from "tss-react/mui";
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {format} from "date-fns";

const useStyles = makeStyles()({
    paper: {
        padding: '20px',
        textAlign: 'center',
        color: 'yellow',
        width: '1100px'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '550px',
    },
    headerElement: {
        marginRight: '5px',
    },
    headerSelect: {
        width: '170px'
    },
    reportHeader: {
        marginTop: '10px',
        marginBottom: '10px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'end',
        justifyContent: 'flex-start'
    }
});
const ChartComponent = ({
                            quizzes,
                            fromDate,
                            toDate,
                            setFromDate,
                            setToDate,
                            topic,
                            setTopic,
                            setGroup,
                            group,
                            user,
                            setUser,
                            allUsers,
                            setAllUsers,
                            allTopics,
                            allGroups
}) => {
    const {classes} = useStyles();
    const [chartType, setChartType] = useState('bar');

    const handleChartTypeChange = (event) => {
        setChartType(event.target.value);
    };

    const generateBarChartData = () => {
        return quizzes.map((quiz, index) => ({
            successPercent: quiz.successPercent,
            Quiz: (quiz.userName + '\n' + (!!quiz.endTime && format(new Date(quiz.endTime), 'dd-MM-yyyy-HH:mm:ss')))
        }));
    };

    const generatePieChartData = () => {
        return quizzes.map((quiz, index) => ({
            id: index,
            value: quiz.successPercent,
            label: quiz.userName + ' ' +quiz.successPercent + '%'
        }));
    };

    const renderChart = () => {
        switch (chartType) {
            case 'pie': {
                return <PieChart
                    series={[
                        {
                             data: generatePieChartData()
                        }
                    ]}
                    width={1000}
                    height={300}
                />
            }
            case 'bar': {
                const chartSetting = {
                    yAxis: [
                        {
                            label: '%',
                            max: 100
                        },
                    ],
                    width: 1000,
                    height: 300,
                    sx: {
                        [`.${axisClasses.left} .${axisClasses.label}`]: {
                            transform: 'translate(-10px, 0)',
                        },
                    }
                };
                const chartData = generateBarChartData();
                return <BarChart
                    dataset={chartData}
                    xAxis={[{
                        scaleType: 'band',
                        dataKey: 'Quiz',
                    }]}
                    series={[
                        { dataKey: 'successPercent'}
                    ]}
                    {...chartSetting}

                />
            }
            default:
                return null;
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.reportHeader}>
                <div className={classes.headerElement}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker className={classes.datePicker}
                                onChange={(val)=> setFromDate(val)}
                                        label="From"
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                width: '220px',
                                            },
                                        }}
                                        format="DD/MM/YYYY"
                                        slotProps={{textField: {size: 'small', readOnly: true}}}
                                value={fromDate}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
                <div className={classes.headerElement}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker className={classes.datePicker}
                                        onChange={(val)=> setToDate(val)}
                                        label="To"
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                width: '220px',
                                            },
                                        }}
                                        format="DD/MM/YYYY"
                                        slotProps={{textField: {size: 'small', readOnly: true}}}
                                value={toDate}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
                <div className={`${classes.headerElement} ${classes.headerSelect}`}>
                    <FormControl>
                        <InputLabel>Select group</InputLabel>
                        <Select
                            size="small"
                            sx={{width: 170}}
                            value={group}
                            label='Select group'
                            onChange={e => setGroup(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {allGroups.map((option) => (
                                <MenuItem key={option.id} value={option}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className={`${classes.headerElement} ${classes.headerSelect}`}>
                    <FormControl>
                        <InputLabel>Select user</InputLabel>
                        <Select
                            size="small"
                            sx={{width: 170}}
                            value={user}
                            label='Select user'
                            onChange={e => setUser(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {allUsers.map((option) => (
                                <MenuItem key={option.id} value={option}>
                                    {option.firstName}&nbsp;{option.lastName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className={`${classes.headerElement} ${classes.headerSelect}`}>
                    <FormControl>
                        <InputLabel>Select topic</InputLabel>
                        <Select
                            size="small"
                            sx={{width: 170}}
                            value={topic}
                            label='Select topic'
                            onChange={e => setTopic(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {allTopics.map((option) => (
                                <MenuItem key={option.id} value={option}>
                                    {option.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className={classes.headerElement}>
                    <FormControl>
                        <InputLabel>Chart type</InputLabel>
                        <Select
                            size="small"
                            sx={{width: 120}}
                            value={chartType}
                            label='Select chart'
                            onChange={handleChartTypeChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="pie">Pie Chart</MenuItem>
                            <MenuItem value="bar">Bar Chart</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            {!!quizzes.length && !!chartType && <Paper className={classes.paper}>
                {renderChart()}
            </Paper>}
        </div>
    );
};

export default ChartComponent;
