import type { EnvironmentConfig } from './@types/EnvironmentConfig.ts';

export const defaultEnvironments: Record<string, EnvironmentConfig> = {
  development: {},
  test: {},
  production: {},
};
