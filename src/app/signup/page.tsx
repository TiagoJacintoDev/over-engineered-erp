import { prisma } from '@/prisma';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';

export default function Signup() {
  return (
    <div className='py-6 px-36'>
      <h1 className='text-xl'>Signup</h1>
      <form
        action={async (formData) => {
          'use server';

          const data = {
            country: formData.get('country')!.toString(),
            email: formData.get('email')!.toString(),
            name: formData.get('firstName')!.toString() + formData.get('lastName')!.toString(),
            password: formData.get('password')!.toString(),
            companyName: formData.get('companyName')!.toString(),
          };

          Object.values(data).forEach((v) => {
            if (!v) {
              throw new Error('All fields are required');
            }
          });

          await prisma.user.create({
            data: {
              country: data.country,
              email: data.email,
              name: data.name,
              password: await bcrypt.hash(data.password, 10),
              companies: {
                create: {
                  name: data.companyName,
                },
              },
            },
          });

          redirect(`/dashboard=${data.companyName}`);
        }}
        className='flex flex-col gap-4 mt-5'
      >
        <label>Company Name</label>
        <input
          type='text'
          name='companyName'
          className='border border-black rounded-lg h-9 pl-2.5'
        />

        <label>First Name</label>
        <input type='text' name='firstName' className='border border-black rounded-lg h-9 pl-2.5' />

        <label>Last Name</label>
        <input type='text' name='lastName' className='border border-black rounded-lg h-9 pl-2.5' />

        <label>Country</label>
        <select name='country' className='border border-black rounded-lg h-9 pl-2.5'>
          <option value='portugal'>Portugal</option>
        </select>

        <label>Email</label>
        <input type='email' name='email' className='border border-black rounded-lg h-9 pl-2.5' />

        <label>Password</label>
        <input
          type='password'
          name='password'
          className='border border-black rounded-lg h-9 pl-2.5'
        />

        <button type='submit' className='bg-black text-white h-11 rounded-lg w-64 self-center mt-3'>
          Signup
        </button>
      </form>
    </div>
  );
}
