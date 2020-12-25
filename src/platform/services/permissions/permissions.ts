import {RoleEnum} from "../../enums/role";
import {PermissionsEnum} from "../../enums/premissionsEnum";
import AuthStorage from "../storages/authStorage";

const permissions = {
	[RoleEnum.User] : [PermissionsEnum.favorite],
	[RoleEnum.Guest] : []
}

export function havePermission(permission : PermissionsEnum) {
	return permissions[AuthStorage.getRole()] ? !!permissions[AuthStorage.getRole()].includes(permission) : false
}
