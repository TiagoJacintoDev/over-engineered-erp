import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { axiosClient } from '../../shared/clients/axios';

type SignupFormValues = {
  country: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export default function Signup() {
  const navigateTo = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SignupFormValues) => {
      const response = await axiosClient.post<{ userId: string }>('/auth/signup', data);

      navigateTo(`/dashboard?userId=${response.data.userId}`);
    },
    onError: (error: AxiosError<{ error: string }>) => {
      alert(error.response?.data.error);
    },
  });

  const { register, handleSubmit } = useForm<SignupFormValues>({
    defaultValues: {
      country: 'portugal',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    },
    disabled: isPending,
  });

  return (
    <div className="py-6 px-36">
      <h1 className="text-xl">Signup</h1>
      <form onSubmit={handleSubmit((data) => mutate(data))} className="flex flex-col gap-4 mt-5">
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

        <label>Country</label>
        <select className="border border-black rounded-lg h-9 pl-2.5" {...register('country')}>
          <option value="portugal">Portugal</option>
        </select>

        <label>Email</label>
        <input
          type="email"
          className="border border-black rounded-lg h-9 pl-2.5"
          {...register('email')}
        />

        <label>Password</label>
        <input
          type="password"
          className="border border-black rounded-lg h-9 pl-2.5"
          {...register('password')}
        />

        <button type="submit" className="bg-black text-white h-11 rounded-lg w-64 self-center mt-3">
          Signup
        </button>
      </form>
    </div>
  );
}
