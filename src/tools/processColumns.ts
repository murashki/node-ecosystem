import c from 'chalk';
import type { TableColumn } from 'proprompt';
import type { ProcessCommon } from '../@types/ProcessCommon.ts';
import { EProcessStatus } from '../@types/EProcessStatus.ts';
import { bytesToString } from './bytesToString.ts';
import { msToSecondsString } from './msToSecondsString.ts';
import { processStatusMap } from './processStatusMap.ts';
import { secToString } from './secToString.ts';

export const autoColumn: TableColumn<ProcessCommon> = {
  title: `auto`,
  render: (proc) => {
    if (proc.pm2NormalizedProcess?.autoStart == null && proc.pm2NormalizedProcess?.autoRestart == null) {
      return ``;
    }
    else {
      const start = proc.pm2NormalizedProcess?.autoStart == null ? c.yellow(`S?`) : proc.pm2NormalizedProcess?.autoStart ? c.green(`S+`) : c.red(`S-`);
      const restart = proc.pm2NormalizedProcess?.autoRestart == null ? c.yellow(`R?`) : proc.pm2NormalizedProcess?.autoRestart ? c.green(`R+`) : c.red(`R-`);
      return `${start} / ${restart}`;
    }
  },
};

export const cpuColumn: TableColumn<ProcessCommon> = {
  title: `cpu`,
  render: (proc) => {
    return `${proc.pm2NormalizedProcess?.cpu ?? 0}%`;
  },
};

export const environmentColumn: TableColumn<ProcessCommon> = {
  title: `environment`,
  render: (proc) => {
    return proc.environment || c.bold(c.red(`unknown`));
  },
};

export const memoryColumn: TableColumn<ProcessCommon> =  {
  title: `memory`,
  render: (proc) => {
    return bytesToString(proc.pm2NormalizedProcess?.memory ?? 0);
  },
};

export const nameColumn: TableColumn<ProcessCommon> = {
  title: `name`,
  render: (proc) => {
    return proc.pm2NormalizedProcess?.name ?? proc.proposedProcessName ?? (proc.appConfig ? proc.appConfig.moduleName : `unknown`);
  },
};

export const namespaceColumn: TableColumn<ProcessCommon> = {
  title: `namespace`,
  render: (proc) => {
    return proc.namespace ?? ``;
  },
};

export const pidColumn: TableColumn<ProcessCommon> = {
  title: `pid`,
  render: (proc) => {
    return proc.pm2NormalizedProcess?.pid == null ? `` : String(proc.pm2NormalizedProcess.pid);
  },
};

export const pm2IdColumn: TableColumn<ProcessCommon> = {
  title: `pm2 id`,
  render: (proc) => {
    return proc.pm2NormalizedProcess?.id == null ? `` : String(proc.pm2NormalizedProcess.id);
  },
};

export const restartsColumn: TableColumn<ProcessCommon> = {
  title: `restarts`,
  render: (proc) => {
    if (proc.pm2NormalizedProcess) {
      const a = proc.pm2NormalizedProcess.restartTime ? c.bold.red(proc.pm2NormalizedProcess.restartTime) : c.bold.green(`0`);
      const b = proc.pm2NormalizedProcess.unstableRestarts ? c.bold.red(proc.pm2NormalizedProcess.unstableRestarts) : c.bold.green(`0`);
      return `${a} / ${b}`;
    }
    else {
      return ``;
    }
  },
};

export const statusColumn: TableColumn<ProcessCommon> = {
  title: `status`,
  render: (proc) => {
    const status = processStatusMap[proc.status];
    switch (proc.status) {
      case EProcessStatus.ERRORED: {
        return c.bold(c.red(status));
      }
      case EProcessStatus.LAUNCHING: {
        return c.cyan(status);
      }
      case EProcessStatus.ONLINE: {
        return c.bold(c.green(status));
      }
      case EProcessStatus.STOPPED: {
        return c.bold(c.red(status));
      }
      case EProcessStatus.WAITING_RESTART: {
        if (proc.pm2NormalizedProcess) {
          const restartDelay = proc.pm2NormalizedProcess.prevRestartDelay || proc.pm2NormalizedProcess.restartDelay || 0;
          return `${c.bold(c.red(status))} (${msToSecondsString(restartDelay)})`;
        }
        else {
          return ``;
        }
      }
      default: {
        return status;
      }
    }
  },
};

export const uptimeColumn: TableColumn<ProcessCommon> = {
  title: `uptime`,
  render: (proc) => {
    const uptime = proc.status === EProcessStatus.ONLINE && proc.pm2NormalizedProcess?.uptime
      ? Math.floor((Date.now() - proc.pm2NormalizedProcess.uptime) / 1000)
      : 0;
    return secToString(uptime);
  },
};

export const ecosystemStatusColumns = [
  nameColumn,
  namespaceColumn,
  environmentColumn,
  statusColumn,
  restartsColumn,
  autoColumn,
  uptimeColumn,
  pidColumn,
  pm2IdColumn,
  cpuColumn,
  memoryColumn,
];
