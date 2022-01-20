export class PersonDTO {
  constructor(public idPerson: number, public firstName: string, public lastName: string, public email: string, public gender: boolean,
              public phone: string, public birthday: string, public idPersonOrigin: number) {
  }
}
