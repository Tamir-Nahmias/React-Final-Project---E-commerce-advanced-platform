const TableCopy = ({ cols, rows, data }) => {
  // a way to know the number of objects in array
  const arrayOfProprties = Object.getOwnPropertyNames(data[0]);
  return (
    <div>
      {/* <h1>Table</h1> */}
      <table style={{ borderCollapse: "collapse", border: "1px solid black" }}>
        <thead>
          <tr>
            {arrayOfProprties.map((property, index) => {
              return <th key={index}>{property}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((obj) => {
            return (
              <tr>
                {arrayOfProprties.map((property) => {
                  return <td>{obj[property]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableCopy;
