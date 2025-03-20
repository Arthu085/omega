import { ERoleReference } from "../enums";

export interface RoleCreateDTO {
    name: string,
    reference: ERoleReference,
    companyId?: number | null,
    permissionsIds: number[]
}
