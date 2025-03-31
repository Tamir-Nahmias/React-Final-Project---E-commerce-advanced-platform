import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ dataForPie }) => {
  //the x axis, lables
  const dataLables = Object.keys(dataForPie);
  //the y axis for values
  const dataValues = Object.values(dataForPie);

  // a function to generate colors according to data size
  const bgColorArr = Array(dataLables.length)
    .fill('')
    .map(() => {
      return `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`; // Random hue, fixed saturation & lightness
    });

  const borderColor = bgColorArr.map((color) => color.replace('60%', '40%'));

  console.log(bgColorArr, borderColor);
  const data = {
    labels: dataLables,
    datasets: [
      {
        label: 'Votes',
        data: dataValues, //
        backgroundColor: bgColorArr,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Total Sold Products',
      },
      datalabels: {
        color: '#fff', // White text
        anchor: 'center', // Center the text in the slices
        align: 'center',
        font: {
          weight: 'bold',
          size: 16,
        },
        formatter: (value, context) => {
          return value; // Display raw values inside the pie chart
        },
      },
    },
  };

  return (
    <div style={{ height: '400px', width: '400px' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
