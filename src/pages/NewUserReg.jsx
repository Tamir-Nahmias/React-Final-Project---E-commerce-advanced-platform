import UserForm from './UserForm';

const NewUserReg = () => {
  return (
    <div className="center">
      <h5>New user registration</h5>
      <div className="generic-container">
        <UserForm isToUpdate={false} />
      </div>
    </div>
  );
};

export default NewUserReg;
