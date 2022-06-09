export interface User {
  displayName: string;
  uid: string;
}
export default interface ShoutOutModel {
  _id?: string;
  to: string;
  from: string;
  text: string;
  photoURL?: string;
  image?: string;
  likes?: User[];
}
