import React, { useState, useEffect } from "react";
import { FaSearch, FaWindowClose } from "react-icons/fa";
import { User } from "../interfaces";
const SearchBox = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setUsers(data.results);
      });
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleClose = () => {
    setFilter("");
  };
  const usersFiltred = users.filter(
    (u) =>
      u.name.first.toLocaleLowerCase().includes(filter) ||
      u.name.last.toLocaleLowerCase().includes(filter)
  );

  return (
    <div>
      Serarch Box
      <header>
        <div className="search-container">
          <input type="text" onChange={handleFilterChange} value={filter} />
          {!filter && <FaSearch className="fa-search" />}
          {filter && (
            <FaWindowClose className="fa-window-close" onClick={handleClose} />
          )}
        </div>
      </header>
      <main>
        <h1>List Of Users</h1>

        {usersFiltred.length === 0 && <h3>No matches</h3>}

        {usersFiltred.map((u) => {
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
