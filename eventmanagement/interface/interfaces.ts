export interface FetchDataInterface {
  success: Boolean;
  data: any;
  error: any;
}

export interface EventInterface {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  created_at: string;
}

export interface UserInterface {
  id: string;
  event_id: string;
  name: string;
  email: string;
  status: string;
  cancel_reason: string;
  cancelled_at: string;
  created_at: string;
}
