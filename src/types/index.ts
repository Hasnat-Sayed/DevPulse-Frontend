export type UserRole = "contributor" | "maintainer";

export type IssueType = "bug" | "feature_request";

export type IssueStatus = "open" | "in_progress" | "resolved";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Reporter {
  id: number;
  name: string;
  role: UserRole;
}

export interface Issue {
  id: number;
  title: string;
  description: string;
  type: IssueType;
  status: IssueStatus;
  reporter: Reporter;
  created_at: string;
  updated_at: string;
}

export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
}

export interface LoginData {
  token: string;
  user: User;
}

export interface SignupInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface IssueInput {
  title: string;
  description: string;
  type: IssueType;
}

export interface IssueFilters {
  sort?: "newest" | "oldest";
  type?: IssueType;
  status?: IssueStatus;
}
