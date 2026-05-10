import type { EcosystemBootstrapConfig } from '../../config/@types/EcosystemBootstrapConfig.ts';

export function testEcosystemConfig(config: EcosystemBootstrapConfig) {
  if ( ! (`apps` in config)) {
    throw new Error(`The config must have an \`apps\` field`);
  }

  const moduleNames: string[] = [];

  config.apps.forEach((app) => {
    if (typeof app.moduleName !== `string` || ! app.moduleName) {
      throw new Error(`The \`apps[].name\` field has an invalid value`);
    }
    else {
      if (moduleNames.includes(app.moduleName)) {
        throw new Error(`The \`apps[].name\` is not unique`);
      }
      else {
        moduleNames.push(app.moduleName);
      }
    }
    if (typeof app.npmScript !== `string` || ! app.npmScript || ! app.npmScript.startsWith(`npm `)) {
      throw new Error(`The \`apps[].script\` field has an invalid value`);
    }
    if (`restartDelay` in app && typeof app.restartDelay !== `number`) {
      throw new Error(`The \`apps[].restartDelay\` field has an invalid value`);
    }
    if (`killTimeout` in app && typeof app.killTimeout !== `number`) {
      throw new Error(`The \`apps[].killTimeout\` field has an invalid value`);
    }
    if (`logsDatePrefix` in app && typeof app.logsDatePrefix !== `boolean`) {
      throw new Error(`The \`apps[].logsDatePrefix\` field has an invalid value`);
    }
  });
}
