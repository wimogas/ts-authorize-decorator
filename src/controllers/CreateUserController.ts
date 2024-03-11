import {randomUUID} from "crypto";
import {authorize} from "../security/authorization/authorize";

export class CreateUserController {
    @authorize("create:user")
    public execute(request: any): string{
        return randomUUID()
    }
}