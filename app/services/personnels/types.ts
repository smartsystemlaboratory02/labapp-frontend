export interface PersonnelInfo {
  id: string
  email: string
  first_name: string
  last_name: string
  role:  "admin" | "intern" | "lead"
  stack: "software" | "hardware"
  niche: string
  bio: string
  phone_number: string
  profile_img: string | null
}

export interface Personnel {
  id: string
  email: string
  first_name: string
  last_name: string
  profile_img: string | null
}