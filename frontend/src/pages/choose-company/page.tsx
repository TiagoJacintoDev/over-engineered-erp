import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function ChooseCompany() {
  const navigateTo = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    company: '',
  });

  const {
    data: companies,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const companies = await fetch(
        `http://localhost:3000/api/user/${searchParams.get('userId')}/companies`
      ).then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch companies');
        }

        return res.json() as Promise<{ id: number; name: string }[]>;
      });

      return companies;
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setFormData({
        company: companies[0].name,
      });
    }
  }, [isSuccess, companies]);

  if (isLoading) return <div>Loading...</div>;
  if (!companies) return <div>Failed to fetch companies</div>;

  return (
    <div className='py-6 px-36'>
      <h1 className='text-xl'>Choose Company</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          navigateTo(`/dashboard?company=${formData.company}`);
        }}
        className='flex flex-col gap-4 mt-5'
      >
        <select
          name='company'
          value={formData.company}
          onChange={(e) =>
            setFormData({
              ...formData,
              company: e.target.value,
            })
          }
        >
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
