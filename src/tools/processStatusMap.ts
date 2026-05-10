import { EProcessStatus } from '../@types/EProcessStatus.ts';

/** Display names shown on screen. */
export const processStatusMap: Record<EProcessStatus, string> = {
  [`errored`]: `errored`,
  [`finished`]: `finished`,
  [`launching`]: `launching`,
  [`new`]: `new (unstarted)`,
  [`one-launch-status`]: `one launch status`,
  [`online`]: `online`,
  [`stopping`]: `stopping`,
  [`stopped`]: `stopped`,
  [`unknown`]: `unknown`,
  [`waiting restart`]: `waiting restart`,
};
