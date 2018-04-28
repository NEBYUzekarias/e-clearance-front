// users account model
export class Account {
  // basic student and office user details
  username: string;
  password: string;
  user_role: string;
  department: string;
  first_name: string;
  last_name: string;

  // student user additional details
  year: string;
  semester: number;
}
