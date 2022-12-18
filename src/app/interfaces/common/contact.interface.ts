export interface Contact {
  _id?: string;
  name?: string;
  title?: string;
  email?: string;
  phoneNo?: string;
  address?: string;
  queryType?: string;
  subject?: string;
  message?: string;
  receivingMails?: string;
  emailSent?: string;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
}
