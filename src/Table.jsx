import { v4 as uuidv } from 'uuid';

const Table = ({ data }) => {
  // a way to know the number of attributes , retrieve them in array
  // I assumed that all documents/objects must have the same attributes, a perfect match
  // this why I've selected the first object's attributes

  const arrayOfProprties = data[0] === undefined || data[0] === null ? [] : Object.getOwnPropertyNames(data[0]);
  return (
    <>
      <table>
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
              <tr key={uuidv()}>
                {arrayOfProprties.map((property) => {
                  //checks if the attribute type is an array of objects and treats it accordingly
                  if (Array.isArray(obj[property])) {
                    return (
                      <td>
                        <Table td key={uuidv()} data={obj[property]} />
                      </td>
                    );
                    //checking if its a stand alone object and handles it accordingly
                  } else if (obj[property] instanceof Object) {
                    return (
                      <td>
                        <Table td key={uuidv()} data={[obj[property]]} />
                      </td>
                    );
                  }
                  // if not an Array or Object (...primitive)
                  return <td key={uuidv()}>{obj[property]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
