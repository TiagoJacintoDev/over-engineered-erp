import { useMutation, useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';

import { queryClient } from '../../../main';
import { axiosClient } from '../../../shared/clients/axios';

type User = {
  firstName: string;
  lastName: string;
  status: 'active' | 'inactive';
  type: 'admin' | 'user';
  id: string;
};

export default function UsersList() {
  const [searchParams] = useSearchParams();

  const companyId = searchParams.get('companyId')!;

  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axiosClient.get<User[]>(`companies/${companyId}/users`);

      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Failed to fetch users</div>;

  return <UsersTable companyId={companyId} users={data} />;
}

function UsersTable({ companyId, users }: { companyId: string; users: User[] }) {
  const { mutate: deleteUser, isPending: isDeletingUser } = useMutation({
    mutationFn: async (userId: string) => {
      await axiosClient.delete(`companies/${companyId}/users/${userId}`);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
  });

  return (
    <div className="p-7">
      <Link
        to={`/dashboard/users/new?companyId=${companyId}`}
        className="bg-black text-white px-5 py-2.5 rounded-md"
      >
        Create new user
      </Link>

      <table className="w-full">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Status</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <div className="flex w-full">
                <tr key={user.id} className="text-center flex">
                  <Link to={`/dashboard/users/${user.id}?companyId=${companyId}`} className="flex">
                    <td>{`${user.firstName} ${user.lastName}`}</td>
                    <td>{user.status}</td>
                    <td>{user.type}</td>
                  </Link>
                </tr>
                <button onClick={() => deleteUser(user.id)} disabled={isDeletingUser}>
                  DELETE
                </button>
              </div>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
