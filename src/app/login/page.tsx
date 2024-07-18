import { prisma } from '@/prisma';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';

export default function Login() {
  return (
    <div className='py-6 px-36'>
      <h1 className='text-xl'>Login</h1>
      <form
        action={async (formData) => {
          'use server';

          const data = {
            email: formData.get('email')!.toString(),
            password: formData.get('password')!.toString(),
          };

          Object.values(data).forEach((v) => {
            if (!v) {
              throw new Error('All fields are required');
            }
          });

          const user = await prisma.user.findUnique({
            where: {
              email: data.email,
            },
          });

          if (!user) throw new Error('User not found');

          const passwordMatches = await bcrypt.compare(data.password, user.password);

          if (!passwordMatches) throw new Error('Invalid password');

          redirect(`/choose-company?userId=${user.id}`);
        }}
        className='flex flex-col gap-4 mt-5'
      >
        <label>Email</label>
        <input type='email' name='email' className='border border-black rounded-lg h-9 pl-2.5' />

        <label>Password</label>
        <input
          type='password'
          name='password'
          className='border border-black rounded-lg h-9 pl-2.5'
        />

        <button type='submit' className='bg-black text-white h-11 rounded-lg w-64 self-center mt-3'>
          Login
        </button>
      </form>
    </div>
  );
}
