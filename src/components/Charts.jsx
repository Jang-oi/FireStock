import {Card, CardHeader} from "@mui/material";
import Chart from 'react-apexcharts'

export const PieChart = (props) => {
    return (
        <Card sx={{...props.chartOptions.cardOptions.sx}}>
            <CardHeader title={props.chartOptions.cardOptions.title}/>
            <Chart options={props.chartOptions.options} series={props.chartOptions.series} type="donut" width={props.chartOptions.width}/>
        </Card>
    )
}