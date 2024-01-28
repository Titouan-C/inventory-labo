export class NewUser {
  mail: string | null;

  constructor(
    mail: string = '',
  ) {
    this.mail = mail;
  }
}
