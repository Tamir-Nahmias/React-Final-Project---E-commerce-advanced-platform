import "./App.css";
import Table from "../Table";
//this is how I ran the example with the table
function App() {
  const users = [
    {
      name: "Tamir",
      age: 37,
      //an array of object address example
      address: [
        { city: "Dimona", zipcode: 90790, address: "RabbiCook 14" },
        { city: "Dimona", zipcode: 90790, address: "RabbiCook 14" },
      ],
    },
    {
      name: "Shalom",
      age: 37,
      // a single object example
      address: { city: "Dimona", zipcode: 90790, address: "HarSnir4/2" },
    },
    {
      name: "Rinat",
      age: 38,
    },
    {
      name: "Erez",
      age: 39,
    },
  ];
  const obj = {
    name: "Tamir",
    age: 37,
  };

  return (
    <>
      <Table data={users} />
    </>
  );
}

export default App;
