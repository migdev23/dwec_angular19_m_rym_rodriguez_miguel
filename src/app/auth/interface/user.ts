import { UserRole } from "../models/userRole";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}
