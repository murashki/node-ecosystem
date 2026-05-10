import { getCommonMenuOptions } from '../../../../tools/getCommonMenuOptions.ts';

export enum ESetEnvironmentMenuKey {
  BACK = `BACK`,
  MAINTENANCE = `MAINTENANCE`,
}

export function createSetEnvironmentMenuOptions(environments: string[]) {
  return getCommonMenuOptions([
    ...environments.map((env) => ({ key: env, label: env })),
    ...SET_ENVIRONMENT_MENU_OPTIONS,
  ]);
}

const SET_ENVIRONMENT_MENU_OPTIONS = [
  {
    key: ESetEnvironmentMenuKey.MAINTENANCE,
    label: `Activate Maintenance Mode`,
  },
  {
    key: ESetEnvironmentMenuKey.BACK,
    label: `Go back`,
  },
];
