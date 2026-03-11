import { Dayjs } from "dayjs";
export interface AddAuthorFormValues {
  firstName: string;
  lastName: string;
  countryOfOrigin: string;
  dateOfBirth: Dayjs;     
  dateOfDeath?: Dayjs | null;
  profilePicture: string;
}