import UserForm from './UserForm';

const NewUserReg = () => {
  return (
    <>
      <h5>New user registration</h5>
      <UserForm isToUpdate={false} />
    </>
  );
};

export default NewUserReg;
