import { useState, useEffect } from "react";
const SearchBox = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setUsers(data.results);
      });
  }, []);

  return (
    <div>
      Serarch Box
      <header>
        <input type="text" />
      </header>
      <main>
        <div>List Of Users</div>
        {users.map((u) => {
          return (
            <div key={u.login.uuid}>
              {u.name.first} {u.name.last}
            </div>
          );
        })}
      </main>
    </div>
  );
};
export default SearchBox;
