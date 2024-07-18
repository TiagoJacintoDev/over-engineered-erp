import { prisma } from '@/prisma';
import { redirect } from 'next/navigation';

type LoginProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function Login({ searchParams }: LoginProps) {
  const companies = await prisma.company.findMany({
    where: {
      users: {
        some: {
          id: searchParams.id as string,
        },
      },
    },
  });

  return (
    <div className='py-6 px-36'>
      <h1 className='text-xl'>Choose Company</h1>
      <form
        action={async (formData) => {
          'use server';

          redirect(`/dashboard?company=${formData.get('company')}`);
        }}
        className='flex flex-col gap-4 mt-5'
      >
        <select name='company'>
          {companies.map((c) => (
            <option key={c.id}>{c.name}</option>
          ))}
        </select>

        <button type='submit' className='bg-black text-white h-11 rounded-lg w-64 self-center mt-3'>
          Go to Dashboard
        </button>
      </form>
    </div>
  );
}
