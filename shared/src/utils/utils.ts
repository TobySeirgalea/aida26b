import { structure } from "../ssot/structure";
import type { TableKey, Role, httpMethod } from "../types/types";

export function getPkFields(tableKey: TableKey): string[] {
  const tableConfig = structure.tables[tableKey];
  return Array.isArray(tableConfig.pk) ? tableConfig.pk : [tableConfig.pk];
}

export function isRole(value: unknown): value is Role {
  return value === 'admin' || value === 'tutor' || value === 'child';
}

export function hasPermissionToHTTPRequest(role: Role, tableName: TableKey, httpRequestMethod: httpMethod): boolean{  
  const tablePermissions = structure.tables[tableName].permissions;

  return tablePermissions ? tablePermissions[httpRequestMethod].includes(role) : false;
}