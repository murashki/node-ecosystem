import type { EProcessStatus} from '../../@types/EProcessStatus.ts';

export type ProcessSelectOpts = {
  acceptedEnvironment?: (null | string)[];
  acceptedStatuses?: EProcessStatus[];
  unstarted?: boolean;
};
