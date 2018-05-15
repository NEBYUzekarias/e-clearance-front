// clearance request model

import {Office} from "./office";
import {Request} from "./request";

export class Clearance {
  id: string;

  academic_year: string;
  semester: string;
  reason: string;

  state: string;

  student: Account;
  requests: Request[];
  departments: Office[];
}
