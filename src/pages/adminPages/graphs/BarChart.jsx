import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useCallback, useMemo, useState } from 'react';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ dataForBar }) => {
  //   //the x axis, lables
  //   const dataLables = Object.keys(dataForBar)
  //   //the y axis for values
  //   const dataValues = Object.values(dataForBar)
  const [dataLables, setDataLables] = useState([]);
  const [dataValues, setDataValues] = useState([]);

  console.log('from bar charts : ', dataLables, dataValues);

  const [selectedUserBarDisplay, setSelectedUserBarDisplay] = useState('');

  // Prepare data for the chart

  const onChangeOptionHandler = useCallback(
    (e) => {
      setSelectedUserBarDisplay(e.target.value);
    },
    [selectedUserBarDisplay]
  );

  const combined = dataValues.map((value, index) => ({
    label: dataLables[index],
    value: value,
  }));

  const sorted = combined.sort((a, b) => b.value - a.value);

  const sortedLabels = sorted.map((item) => item.label);
  const sortedDataValues = sorted.map((item) => item.value);

  const max = Math.max(...sortedDataValues);
  const min = Math.min(...sortedDataValues);

  const getColorForValue = (value) => {
    const ratio = (value - min) / (max - min); // Normalize 0-1
    const hue = (1 - ratio) * 240; // 240 = blue, 0 = red in HSL
    return `hsl(${hue}, 100%, 50%)`;
  };

  const optionHasChanged = useMemo(() => {
    dataForBar
      .filter((option) => option.name === selectedUserBarDisplay)
      .map((customer) => {
        setDataLables(Object.keys(customer.ordersByCustomer));
        setDataValues(Object.values(customer.ordersByCustomer));
      });
  }, [selectedUserBarDisplay]);

  const data = {
    labels: sortedLabels, // X-axis labels
    datasets: [
      {
        label: 'Sales Data',
        data: sortedDataValues, // Y-axis data values
        backgroundColor: sortedDataValues.map((value) => getColorForValue(value)),
        borderColor: 'rgba(138, 43, 226, 1)', // Solid purple border

        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Products Quantity Per Customer',
        font: {
          size: 20, // Title font size
        },
      },
    },
  };
  return (
    <div className="w-200 flex-row content-around  justify-around">
      <div>
        <label className="label-customer" htmlFor="customer">
          Customer :{' '}
        </label>
        <select className="beautiful-dropdown" id="customer" name="customer" onChange={onChangeOptionHandler}>
          <option value={null}>Select A customer...</option>
          {dataForBar.map((customer) => (
            <option value={customer.name} key={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
