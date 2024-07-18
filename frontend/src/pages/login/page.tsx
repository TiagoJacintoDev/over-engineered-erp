import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type LoginFormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const navigateTo = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Invalid credentials');

    const { userId } = await response.json();

    navigateTo(`/choose-company?userId=${userId}`);
  };

  return (
    <div className='py-6 px-36'>
      <h1 className='text-xl'>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-5'>
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
          Login
        </button>
      </form>
    </div>
  );
}
