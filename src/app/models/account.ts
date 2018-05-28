// users account model
import {Office} from "./office";

export class Account {
  id: string;

  // basic student and office user details
  username: string;
  password: string;
  user_role: string;
  departmentId: string;
  department: Office;
  first_name: string;
  last_name: string;
  email: string;

  // student user additional details
  year: string;
}
