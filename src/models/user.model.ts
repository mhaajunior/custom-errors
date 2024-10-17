interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Doe", email: "jane@example.com" },
];

export const getUserById = (id: number): User | undefined => {
  return users.find((user) => user.id === id);
};

export const getAllUsers = (): User[] => {
  return users;
};
