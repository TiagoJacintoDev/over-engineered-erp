import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  return (
    <div className='py-6 px-36'>
      <h1 className='text-xl'>Login</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          Object.values(formData).forEach((v) => {
            if (!v) {
              throw new Error('All fields are required');
            }
          });

          const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          if (!response.ok) throw new Error('Invalid credentials');

          const { userId } = await response.json();

          navigateTo(`/choose-company?userId=${userId}`);
        }}
        className='flex flex-col gap-4 mt-5'
      >
        <label>Email</label>
        <input
          type='email'
          name='email'
          className='border border-black rounded-lg h-9 pl-2.5'
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <label>Password</label>
        <input
          type='password'
          name='password'
          className='border border-black rounded-lg h-9 pl-2.5'
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <button type='submit' className='bg-black text-white h-11 rounded-lg w-64 self-center mt-3'>
          Login
        </button>
      </form>
    </div>
  );
}
