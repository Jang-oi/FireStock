import {Card, CardHeader} from "@mui/material";
import Chart from 'react-apexcharts'
import {getArrayKey} from "../utils/arrayUtil";

export const PieChart = ({detailData}) => {

    const setting = {
        options : {
            labels:  getArrayKey(detailData, 'stockName'),
            legend: {
                position : 'bottom'
            },
            responsive: [{
                breakpoint: 600,
                options: {
                    chart: {
                        width: 250
                    },
                }
            }],
        },
        series: getArrayKey(detailData, 'totalSum'),
    }
    return (
        <Card sx={{mt: 3}}>
            <CardHeader title="종목 구성"/>
            <Chart options={setting.options} series={setting.series} type="donut" width="350"/>
        </Card>
    )
}