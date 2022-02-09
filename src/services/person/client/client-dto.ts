import {PersonDTO} from "../person-dto";

export class ClientDTO extends PersonDTO {
  constructor(idPerson: number, firstName: string, lastName: string, email: string, gender: boolean, phone: string,
              birthday: string, idPersonOrigin: number, public photo?: string, public comment?: string,
              public technicalComment?: string) {
    super(idPerson, firstName, lastName, email, gender, phone, birthday, idPersonOrigin);
  }

  public static updateFrom(ref: ClientDTO, toUpdate: ClientDTO) {
    ref.idPerson = toUpdate.idPerson;
    ref.firstName = toUpdate.firstName;
    ref.lastName = toUpdate.lastName;
    ref.email = toUpdate.email;
    ref.gender = toUpdate.gender;
    ref.phone = toUpdate.phone;
    ref.birthday = toUpdate.birthday;
    ref.idPersonOrigin = toUpdate.idPersonOrigin;
    ref.photo = toUpdate.photo;
    ref.comment = toUpdate.comment;
    ref.technicalComment = toUpdate.technicalComment;
  }

  public static clone(clientDTO: ClientDTO): ClientDTO {
    return new ClientDTO(clientDTO.idPerson, clientDTO.firstName, clientDTO.lastName, clientDTO.email, clientDTO.gender,
      clientDTO.phone, clientDTO.birthday, clientDTO.idPersonOrigin, clientDTO.photo, clientDTO.comment,
      clientDTO.technicalComment);
  }

  public static removePhonePrefix(clientDTO: ClientDTO): ClientDTO {
    let client = ClientDTO.clone(clientDTO);
    client.phone = client.phone.slice(4);
    client.phone = '0' + client.phone;
    return client
  }

  public static formatForSend(clientDTO: ClientDTO): ClientDTO {
    let client = ClientDTO.clone(clientDTO);
    client.phone = client.phone.slice(1);
    client.phone = '33' + client.phone;
    return client;
  }

  public static default(): ClientDTO {
    return new ClientDTO(-1, "DEFAULT_CLIENT_DTO", "DEFAULT_CLIENT_DTO",
      "DEFAULT_CLIENT_DTO", false, "DEFAULT_CLIENT_DTO", "DEFAULT_CLIENT_DTO", -1,
      "DEFAULT_CLIENT_DTO", "DEFAULT_CLIENT_DTO", "DEFAULT_CLIENT_DTO");
  }
}
