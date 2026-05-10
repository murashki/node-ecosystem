import type { QueryResult } from './QueryResult.ts';
import type { QueryResultRow } from './QueryResultRow.ts';

export type DbClient = {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  query: {
    <
      TQueryResultRow extends QueryResultRow = QueryResultRow,
    >(query: string, values?: any[]): Promise<QueryResult<TQueryResultRow>>;
  };
};
