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

  const optionHasChanged = useMemo(() => {
    dataForBar
      .filter((option) => option.name === selectedUserBarDisplay)
      .map((customer) => {
        setDataLables(Object.keys(customer.ordersByCustomer));
        setDataValues(Object.values(customer.ordersByCustomer));
      });
  }, [selectedUserBarDisplay]);

  const data = {
    labels: dataLables, // X-axis labels
    datasets: [
      {
        label: 'Sales Data',
        data: dataValues, // Y-axis data values
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)', // Bar border color
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
      },
    },
  };
  return (
    <div style={{ height: '400px' }}>
      <div>
        <label htmlFor="customer">Customer : </label>
        <select id="customer" name="customer" onChange={onChangeOptionHandler}>
          <option value={null}></option>
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
