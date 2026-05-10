import c from 'chalk';
import { getCommonMenuOptions } from '../../../../tools/getCommonMenuOptions.ts';

export enum EConfigMenuKey {
  BACK = `BACK`,
  EDIT_BASE_LOCAL_ENVS = `EDIT_BASE_LOCAL_ENVS`,
  EDIT_ENVIRONMENT_LOCAL_ENVS = `EDIT_ENVIRONMENT_LOCAL_ENVS`,
  DUMP_CURRENT_ENVS = `DUMP_CURRENT_ENVS`,
  DUMP_ENVIRONMENT_ENVS = `DUMP_ENVIRONMENT_ENVS`,
  VIEW_BASE_ENVS = `VIEW_BASE_ENVS`,
  VIEW_BASE_LOCAL_ENVS = `VIEW_BASE_LOCAL_ENVS`,
  VIEW_ECOSYSTEM_BOOTSTRAP_CONFIG = `VIEW_ECOSYSTEM_BOOTSTRAP_CONFIG`,
  VIEW_ENVIRONMENT_ENVS = `VIEW_ENVIRONMENT_ENVS`,
  VIEW_ENVIRONMENT_LOCAL_ENVS = `VIEW_ENVIRONMENT_LOCAL_ENVS`,
}

type ConfigMenuItemCustomProps = {
  environment?: string;
};

export function createConfigMenuOptions(environments: string[]) {
  return getCommonMenuOptions<ConfigMenuItemCustomProps>([
    {
      key: EConfigMenuKey.VIEW_ECOSYSTEM_BOOTSTRAP_CONFIG,
      label: `View ecosystem bootstrap config`,
    },
    {
      disabled: true,
      key: EConfigMenuKey.DUMP_CURRENT_ENVS,
      label: `Dump current environment variables`,
    },
    ...environments.map((environment) => ({
      disabled: true,
      environment,
      key: EConfigMenuKey.DUMP_ENVIRONMENT_ENVS,
      label: `Dump ${c.italic(environment)} environment variables`,
    })),
    {
      key: EConfigMenuKey.VIEW_BASE_ENVS,
      label: `View ${c.italic(`.env.base`)} file`,
    },
    {
      key: EConfigMenuKey.VIEW_BASE_LOCAL_ENVS,
      label: `View ${c.italic(`.env.base.local`)} file`,
    },
    ...environments.flatMap((environment) => ([
      {
        environment,
        key: EConfigMenuKey.VIEW_ENVIRONMENT_ENVS,
        label: `View ${c.italic(`.env.${environment}`)} file`,
      },
      {
        environment,
        key: EConfigMenuKey.VIEW_ENVIRONMENT_LOCAL_ENVS,
        label: `View ${c.italic(`.env.${environment}.local`)} file`,
      },
    ])),
    {
      key: EConfigMenuKey.EDIT_BASE_LOCAL_ENVS,
      label: `Edit ${c.italic(`.env.base.local`)} file`,
    },
    ...environments.map((environment) => ({
      environment,
      key: EConfigMenuKey.EDIT_ENVIRONMENT_LOCAL_ENVS,
      label: `Edit ${c.italic(`.env.${environment}.local`)} file`,
    })),
    {
      key: EConfigMenuKey.BACK,
      label: `Go back`,
    },
  ]);
}
