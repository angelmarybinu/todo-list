/*import React, { useState } from 'react';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = () => {
    // Check if username and password are provided
    if (!username || !password) {
      setError('Please provide both username and password.');
      return;
    }

    // Store user data in local storage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    
    // Reset input fields
    setUsername('');
    setPassword('');
    
    // Optionally, you can navigate the user to another page upon successful signup
    console.log('Signed up successfully');
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Signup;
*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  username: string;
  password: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<FormValues>({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (values.username && values.password) {
      if (!localStorage.getItem(values.username)) {
        localStorage.setItem(values.username, JSON.stringify(values));
        navigate('/');
      } else {
        setError('User already registered');
      }
    } else {
      setError('Please provide both username and password');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={values.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Signup;
