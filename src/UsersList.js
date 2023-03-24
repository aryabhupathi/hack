import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Pagination } from "antd";
import "./UserList.css";
export default function UsersList() {
  const [men, setmen] = useState([]);
  const [searchUser] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const itemPerPage = 10;
  let pageVisited = pageCount * itemPerPage;

  const totalPages = Math.ceil(men.length / itemPerPage);
  const pageChange = ({ selected }) => {
    setPageCount(selected);
  };
  useEffect(() => {
    getmenDetails();
  }, []);
  const getmenDetails = () => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setmen(data);
      });
  };
  const deleteUser = (selectedUser) => {
    let userAfterDeletion = men.filter((user) => {
      return user.id !== selectedUser;
    });
    setmen(userAfterDeletion);
  };

  function filterUser(e) {
    const newdata = men.filter((row) => {
      return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setmen(newdata);
  }

  return (
    <div className="container">
      <br />
      <input
        type="text"
        name="name"
        placeholder=" Search by any field "
        onChange={filterUser}
        className="filterme"
      />
      <br />
      <table className="table">
        <tr>
          <th>Name </th>
          <th>Email </th>
          <th> Role</th>
          <th>Action</th>
        </tr>

        {men
          .filter((user) => {
            if (searchUser === "") return user;
            return user;
          })
          .slice(pageVisited, pageVisited + itemPerPage)
          .map((user) => (
            <tr key={user.id}>
              <td> {user.name} </td>
              <td> {user.email} </td>
              <td> {user.role} </td>
              <td className="btn">
                <button>
                  <AiFillEdit />
                </button>{" "}
                <button onClick={() => deleteUser(user.id)}>
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
      </table>
      <br />
      <br />

      {/* pagination */}

      <ReactPaginate
        className="pagination"
        previousLabel={"Prev"}
        nextLabel={"Next"}
        pageCount={totalPages}
        onPageChange={pageChange}
        containerClassName={<Pagination />}
      />
    </div>
  );
}
