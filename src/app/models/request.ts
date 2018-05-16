// clearance specific request for an office model

export class Request {
  id: string;

  state: string;
  reason: string;
  clearanceId: string;
  departmentId: string;

  // key value pair object i.e. departmentId:request.state
  preconditions: object;
}
