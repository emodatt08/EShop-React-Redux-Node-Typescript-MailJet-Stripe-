import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { getUsers } from '../../Actions/UserActions';

import { UserState } from '../../Reducers/UserReducer';

import { RootState } from '../../store';

import Users from '../../Types/Users';


export default function () {
  
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  
  const {users, isLoggedIn} = useSelector<RootState, UserState>((state) => state.users);


  const getAllUsers = () => {
    setIsLoading(true);
    setError(false);
    dispatch<any>(getUsers());
    setIsLoading(false);
  
    console.log(users);
  }



  const convertDate = (date: string | Date | undefined) => {
    const newDate = new Date(date ?? "");
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const setStatus = (status: number | boolean | undefined) => {
    if (status === 0){
      return "Pending";
    } else if (status === 1){
      return "Accepted";
    } else if (status === 2){ 
      return "Declined";
    }
  }



  React.useEffect(() => {
    getAllUsers();
    const redirect = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')! ) : navigate('/');
  }, []);


  return (
    <div>
      <table className='table table-striped'>
        <thead className='table-dark'>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>
                Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((user: Users) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{convertDate(user.createdAt)}</td>
              <td>
                <Link  to={`/edit/user/${user._id}`} className='btn btn-danger' >Edit</Link>&nbsp;
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
