import {ClientDto} from "../../dto/client/client.dto";

export interface ClientContext {
  readonly clientList: ClientDto[];
}
