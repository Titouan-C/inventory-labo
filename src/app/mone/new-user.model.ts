export class NewUser {
  id: number | null;
  Nom: string | null;
  Prenom: string | null;
  Mail: string | null;
  Ecole: string | null;
  Role: string | null;
  Password: string | null;

  constructor(
    id: number = 0,
    nom: string = '',
    prenom: string = '',
    mail: string = '',
    ecole: string = '',
    role: string = '',
    password: string = ''
  ) {
    this.id = id;
    this.Nom = nom;
    this.Prenom = prenom;
    this.Mail = mail;
    this.Ecole = ecole;
    this.Role = role;
    this.Password = password;
  }
}
