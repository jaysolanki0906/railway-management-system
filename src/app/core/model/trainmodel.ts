export interface Profile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  gender: string;
  dateofbirth: string;
  created_at: string;
  updated_at: string;
}

export interface BookingDetail {
  id: string;
  booking_id: string;
  profile_id: string;
  seat_no: string;
  status: string;
  created_at: string;
  updated_at: string;
  profile: Profile;
}

export interface TrainPnr {
  id: string;
  user_id: string;
  train_id: string;
  train_class: string;
  source_station: string;
  destination_station: string;
  journey_date: string;
  amount: number;
  pnr: string;
  status: string;
  created_at: string;
  updated_at: string;
  booking_details: BookingDetail[];
}
