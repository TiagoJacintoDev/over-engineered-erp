import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    country: 'portugal',
    email: 't@t.t',
    firstName: 't',
    lastName: 't',
    password: 't',
    companyName: 't',
  });

  return (
    <div className='py-6 px-36'>
      <h1 className='text-xl'>Signup</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          Object.values(formData).forEach((v) => {
            if (!v) {
              throw new Error('All fields are required');
            }
          });

          const response = await fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          if (!response.ok) throw new Error('Invalid credentials');

          const { companyName } = await response.json();

          navigateTo(`dashboard?company=${companyName}`);
        }}
        className='flex flex-col gap-4 mt-5'
      >
        <label>Company Name</label>
        <input
          type='text'
          name='companyName'
          className='border border-black rounded-lg h-9 pl-2.5'
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
        />

        <label>First Name</label>
        <input
          type='text'
          name='firstName'
          className='border border-black rounded-lg h-9 pl-2.5'
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        />

        <label>Last Name</label>
        <input
          type='text'
          name='lastName'
          className='border border-black rounded-lg h-9 pl-2.5'
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        />

        <label>Country</label>
        <select
          name='country'
          className='border border-black rounded-lg h-9 pl-2.5'
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
        >
          <option value='portugal'>Portugal</option>
        </select>

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
          Signup
        </button>
      </form>
    </div>
  );
}
