export class PersonOriginDTO {

  constructor(public idPersonOrigin: number, public type: string) {
  }

  public static default() {
    return new PersonOriginDTO(-1, "DEFAULT_PERSON_ORIGIN");
  }

}
