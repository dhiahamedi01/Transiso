import axios from "axios";

interface User {
  id: number;
  permission: string;
}

interface Permission {
  id: number;
  name: string;
}

interface UserPermissionsResponse {
  user: User;
  permissions: Permission[];
}

export async function fetchUserPermissions(userId: string): Promise<UserPermissionsResponse> {
  const res = await axios.get(`/api/users/permissions/${userId}`);
  return res.data;
}
