import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Grid, Paper } from '@mui/material';
import {BarChart, LineChart, PieChart} from "@mui/x-charts";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
    formControl: {
        margin: '10px',
        minWidth: 120,
    },
    paper: {
        padding: '20px',
        textAlign: 'center',
        color: 'yellow',
    }
});

const ChartComponent = ({ quizzes }) => {
    const classes = useStyles();
    const [chartType, setChartType] = useState('line');

    const handleChange = (event) => {
        setChartType(event.target.value);
    };

    // Generate mock data for the chart based on quiz data
    const generateChartData = () => {
        return quizzes.map((quiz, index) => ({
            name: `Quiz ${index + 1}`,
            value: quiz.percentage,
        }));
    };

    const renderChart = () => {
        const chartData = generateChartData();

        alert('chartType is' + chartType)

        switch (chartType) {
            case 'line':
                return <LineChart data={chartData} series={[
                    {
                        data: [2, 5, 3, 1, 7, 8, 9, 10, 4, 6],
                    }
                ]} />;
            case 'pie':
                return <PieChart  data={chartData} series={[
                    {
                        data: [2, 5, 3, 1, 7, 8, 9, 10, 4, 6],
                    }
                ]} />;

            case 'bar':
                return <BarChart
                    xAxis={[
                        {
                            id: 'barCategories',
                            data: ['bar A', 'bar B', 'bar C'],
                            scaleType: 'band',
                        },
                    ]}
                    series={[
                        {
                            data: [2, 5, 3],
                        },
                    ]}
                    width={500}
                    height={300}
                />
            // Add more cases for other chart types if needed
            default:
                return null;
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Chart Type</InputLabel>
                        <Select
                            value={chartType}
                            onChange={handleChange}
                        >
                            <MenuItem value="line">Line Chart</MenuItem>
                            <MenuItem value="pie">Pie Chart</MenuItem>
                            <MenuItem value="bar">Bar Chart</MenuItem>
                            {/* Add more MenuItem for other chart types */}
                        </Select>
                    </FormControl>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    {renderChart()}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ChartComponent;
