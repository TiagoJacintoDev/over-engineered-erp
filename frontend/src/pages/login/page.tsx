import { useMutation } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { axiosClient } from '../../shared/clients/axios';

type LoginFormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const navigateTo = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const response = await axiosClient.post<{ userId: string }>('/login', data);

      navigateTo(`/choose-company?userId=${response.data.userId}`);
    },
    onError: (error: AxiosError<{ error: string }>) => {
      alert(error.response?.data.error);
    },
  });

  const { register, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    disabled: isPending,
  });

  return (
    <div className="py-6 px-36">
      <h1 className="text-xl">Login</h1>
      <form onSubmit={handleSubmit((data) => mutate(data))} className="flex flex-col gap-4 mt-5">
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
          Login
        </button>
      </form>
    </div>
  );
}
