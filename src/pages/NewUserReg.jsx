import UserForm from './UserForm';

const NewUserReg = () => {
  return (
    <div className="center">
      <h2>New user registration</h2>
      <div className="generic-container">
        <UserForm isToUpdate={false} />
      </div>
    </div>
  );
};

export default NewUserReg;
