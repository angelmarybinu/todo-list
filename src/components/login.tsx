

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface FormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<FormValues>({
    username: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (values.username && values.password) {
      const storedUser = localStorage.getItem(values.username);
      if (storedUser) {
        const user = JSON.parse(storedUser) as FormValues;
        if (values.password === user.password) {
          localStorage.setItem('loggedInUser', values.username);
          navigate('/todo'); // Redirect to the todo page
        } else {
          alert('Password does not match');
        }
      } else {
        alert('User not found');
      }
    } else {
      alert('Fill complete form');
    }
  };

  return (
    <div className='container'>
      <form className="new-item-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={values.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <button className="btn" type="submit">Sign in</button>
        <span>Don't have an account? <a href='/signup'>REGISTER</a></span>
      </form>
    </div>
  );
};

export default Login;
