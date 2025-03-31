import UserForm from '../UserForm';

const Account = () => {
  return (
    <div>
      <h4>My account</h4>
      <UserForm isToUpdate={true} />
    </div>
  );
};

export default Account;
