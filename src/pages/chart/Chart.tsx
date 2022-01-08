import './Chart.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


function Chart() {

    const options = {
        chart: {
            type: "spline",
        },

        xAxis: {
            categories: ["maart", "april", "mei", "juni", "juli", "augustus"] 
        },
        title: {
            text: "Aantal bezoekers",
        },
        series: [
            {
            name: "Hema",
            color: "#D53226",
            data: [100, 200, 130, 100, 200, 230]
            },
            {
            name: "Albert Heijn",
            color: "#4DAAE1",
            data: [140, 170, 230, 200, 100, 90]
            },
            {
            name: "McDonalds",
            color: "#F6CA4E",
            data: [130, 240, 200, 150, 180, 250]
            }
        ]
    };

  return (
    <div className="chart">
        <h1>HighCharts</h1>
        <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default Chart;
