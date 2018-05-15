// users account model
import {Office} from "./office";

export class Account {
  id: string;

  // basic student and office user details
  username: string;
  password: string;
  user_role: string;
  department: Office;
  first_name: string;
  last_name: string;

  // student user additional details
  year: string;
  semester: number;
}
