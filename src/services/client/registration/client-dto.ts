export class ClientDTO {
  constructor(public firstName: string, public lastName: string, public email: string, public gender: boolean,
              public phone: string, public birthday: string, public idPersonOrigin: number, public photo?: string,
              public comment?: string, public technicalComment?: string,) {
  }
}
