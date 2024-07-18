import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { axiosClient } from '../../../../shared/clients/axios';

type CreateUserFormValues = {
  email: string;
  firstName: string;
  lastName: string;
};

export default function CreateUser() {
  const [searchParams] = useSearchParams();
  const navigateTo = useNavigate();

  const companyId = searchParams.get('companyId')!;

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CreateUserFormValues) => {
      const response = await axiosClient.post<{ id: string }>(
        `/companies/${companyId}/users`,
        data,
      );

      navigateTo(`/dashboard/users/${response.data.id}?companyId=${companyId}`);
    },
    onError: (error: AxiosError<{ error: string }>) => {
      console.log(error);

      alert(error.response?.data.error);
    },
  });

  const { register, handleSubmit } = useForm<CreateUserFormValues>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
    },
    disabled: isPending,
  });

  return (
    <div className="py-6 px-36">
      <h1 className="text-xl">Create New User</h1>
      <form onSubmit={handleSubmit((data) => mutate(data))} className="flex flex-col gap-4 mt-5">
        <label>Email</label>
        <input
          type="text"
          className="border border-black rounded-lg h-9 pl-2.5"
          {...register('email')}
        />

        <label>First Name</label>
        <input
          type="text"
          className="border border-black rounded-lg h-9 pl-2.5"
          {...register('firstName')}
        />

        <label>Last Name</label>
        <input
          type="text"
          className="border border-black rounded-lg h-9 pl-2.5"
          {...register('lastName')}
        />

        <button type="submit" className="bg-black text-white h-11 rounded-lg w-64 self-center mt-3">
          Save
        </button>
      </form>
    </div>
  );
}
