export class Contact {
  id: number;
  name: string;
  email: string;
  relation: string;

  constructor(contact: Contact) {
    this.id = contact.id;
    this.name = contact.name || '';
    this.email = contact.email || '';
    this.relation = contact.relation || '';
  }

  static createEmpty(): Contact {
    return {
      id: 0, // Puedes usar 0 o un valor que indique un nuevo registro
      name: '',
      email: '',
      relation: ''
    };
  }
}
