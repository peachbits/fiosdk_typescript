import { GetObtDataRecord } from './GetObtDataRecord'

export interface GetObtDataResponse {
  obt_data_records: GetObtDataRecord[],
  more: number
}
