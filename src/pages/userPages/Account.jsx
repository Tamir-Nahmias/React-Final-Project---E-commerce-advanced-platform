import UserForm from '../UserForm';

const Account = () => {
  return (
    <div className="center">
      <div className="generic-container">
        <h3>My account</h3>
        <UserForm isToUpdate={true} />
      </div>
    </div>
  );
};

export default Account;
