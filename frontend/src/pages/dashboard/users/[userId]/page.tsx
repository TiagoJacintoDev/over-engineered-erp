import { useMutation, useQuery } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { axiosClient } from '../../../../shared/clients/axios';

type User = {
  email: string;
  firstName: string;
  lastName: string;
};

export default function EditUser() {
  const params = useParams();

  const userId = params.userId!;

  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await axiosClient.get<User>(`users/${userId}`);

      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Failed to fetch user</div>;

  return <EditUserForm userId={userId} user={data} />;
}

type EditUserFormValues = {
  email: string;
  firstName: string;
  lastName: string;
};

function EditUserForm({ userId, user }: { userId: string; user: User }) {
  const navigateTo = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: EditUserFormValues) => {
      const response = await axiosClient.put<{ id: string }>(`users/${userId}`, data);

      navigateTo(`/dashboard/users/${response.data.id}`);
    },
    onError: (error: AxiosError<{ error: string }>) => {
      console.log(error);

      alert(error.response?.data.error);
    },
  });

  const { register, handleSubmit } = useForm<EditUserFormValues>({
    defaultValues: user,
    disabled: isPending,
  });

  return (
    <div className="py-6 px-36">
      <h1 className="text-xl">Edit User</h1>
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
