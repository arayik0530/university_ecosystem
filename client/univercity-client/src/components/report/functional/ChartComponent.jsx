import React, {useState} from 'react';
import {FormControl, FormHelperText, InputLabel, MenuItem, Paper, Select} from '@mui/material';
import {BarChart, PieChart} from "@mui/x-charts";
import {makeStyles} from "tss-react/mui";
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

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
        justifyContent: 'flex-start',
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

    const generateChartData = () => {
        return quizzes.map((quiz, index) => ({
            name: quiz.userName,
            value: quiz.percentage,
            label: quiz.userName
        }));
    };

    const renderChart = () => {
        const chartData = generateChartData();

        switch (chartType) {
            case 'pie':
                return <PieChart
                    series={[
                        {
                            data: chartData
                        },
                    ]}
                    width={1000}
                    height={300}
                />

            case 'bar':
                return <BarChart
                    xAxis={[
                        {
                            id: 'barCategories',
                            data: chartData.map(q => q.name),
                            scaleType: 'band',
                        },
                    ]}
                    series={[
                        {
                            data: chartData.map(q => q.value),
                            color: chartData.map((q, index) => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.9)`)
                        },
                    ]}
                    width={1000}
                    height={300}
                />
            // Add more cases for other chart types if needed
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
                                // onChange={handleFromDateChange}
                                        label="From"
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                width: '220px',
                                            },
                                        }}
                                        format="DD/MM/YYYY"
                                        slotProps={{textField: {size: 'small', readOnly: true}}}
                                // value={fromDate}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
                <div className={classes.headerElement}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker className={classes.datePicker}
                                // onChange={handleToDateChange}
                                        label="To"
                                        sx={{
                                            '& .MuiInputBase-root': {
                                                width: '220px',
                                            },
                                        }}
                                        format="DD/MM/YYYY"
                                        slotProps={{textField: {size: 'small', readOnly: true}}}
                                // value={toDate}
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
            <Paper className={classes.paper}>
                {renderChart()}
            </Paper>
        </div>
    );
};

export default ChartComponent;
