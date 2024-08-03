import { useContext } from "react";
import UserContext from "../../Context/UserContext";

const UserAccount = () => {
  const { user, login, logout } = useContext(UserContext);

  console.log(user);

  return (
    <>
      {user ? (
        <>
          <p>Welcome, {user}</p> <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <p>Please login to view account.</p>{" "}
          <button onClick={login}>Login</button>
        </>
      )}
    </>
  );
};

export default UserAccount;
