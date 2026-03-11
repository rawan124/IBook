export type AuthorDetails = {
    id: string;
    fullName: string;
    //biography: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    dateOfDeath?: string;
    countryOfOrigin: string;
    profilePicture: string;
    isActive: boolean;
    createdByUserId: string;
};