import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { axiosClient } from '../../shared/clients/axios';

type Company = {
  id: number;
  name: string;
};

export default function ChooseCompany() {
  const [searchParams] = useSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const response = await axiosClient.get<Company[]>(
        `/user/${searchParams.get('userId')}/companies`,
      );

      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Failed to fetch companies</div>;

  return (
    <div className="py-6 px-36">
      <h1 className="text-xl">Choose Company</h1>
      <ChooseCompanyForm companies={data} />
    </div>
  );
}

function ChooseCompanyForm({ companies }: { companies: Company[] }) {
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    company: companies[0].name,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        navigateTo(`/dashboard?companyId=${formData.company}`);
      }}
      className="flex flex-col gap-4 mt-5"
    >
      <select
        name="company"
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

      <button type="submit" className="bg-black text-white h-11 rounded-lg w-64 self-center mt-3">
        Go to Dashboard
      </button>
    </form>
  );
}
