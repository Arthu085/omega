import { EStatus } from "@/shared/domain";

export interface UserCreateDTO {
    name: string;
    username: string;
    email: string;
    password: string;
    status: EStatus;
    companyId?: number;
    roleId?: number;
    registration?: string | null;
}
