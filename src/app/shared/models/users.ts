export interface Users {
  id: number;
  uid: string;
  first_name: string;
  last_name: string;
  nickname?: any;
  email: string;
  is_verifying_otp: number;
  birthday: string;
  username: string;
  role: string;
  image_id: number;
  status: string;
  language_id: number;
  deleted_at?: any;
  icons: Icons;
  last_active: string;
  role_name: string;
  image: Image;
}
export interface Icons {
  facebook: string;
  instagram: string;
  address: string;
  phone: string;
  email: string;
  web_address: string;
  info: string;
}

export interface Image {
  id: number;
  name: string;
  path: string;
  url: string;
  type: number;
  deleted_at?: any;
}


