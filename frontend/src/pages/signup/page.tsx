import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type SignupFormValues = {
  country: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  companyName: string;
};

export default function Signup() {
  const navigateTo = useNavigate();

  const { register, handleSubmit } = useForm<SignupFormValues>({
    defaultValues: {
      country: 'portugal',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      companyName: '',
    },
  });

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    const response = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Invalid credentials');

    const { companyName } = await response.json();

    navigateTo(`dashboard?company=${companyName}`);
  };

  return (
    <div className='py-6 px-36'>
      <h1 className='text-xl'>Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-5'>
        <label>Company Name</label>
        <input
          type='text'
          className='border border-black rounded-lg h-9 pl-2.5'
          {...register('companyName')}
        />

        <label>First Name</label>
        <input
          type='text'
          className='border border-black rounded-lg h-9 pl-2.5'
          {...register('firstName')}
        />

        <label>Last Name</label>
        <input
          type='text'
          className='border border-black rounded-lg h-9 pl-2.5'
          {...register('lastName')}
        />

        <label>Country</label>
        <select className='border border-black rounded-lg h-9 pl-2.5' {...register('country')}>
          <option value='portugal'>Portugal</option>
        </select>

        <label>Email</label>
        <input
          type='email'
          className='border border-black rounded-lg h-9 pl-2.5'
          {...register('email')}
        />

        <label>Password</label>
        <input
          type='password'
          className='border border-black rounded-lg h-9 pl-2.5'
          {...register('password')}
        />

        <button type='submit' className='bg-black text-white h-11 rounded-lg w-64 self-center mt-3'>
          Signup
        </button>
      </form>
    </div>
  );
}
