import { IVinylRecordRepository } from '../domain/repositories/IVinylRecordRepository';
import { DeleteVinylRecord } from '../domain/use-cases/DeleteVinylRecord';
import { FindVinylRecord } from '../domain/use-cases/FindVinylRecord';
import { RegisterVinylRecord } from '../domain/use-cases/RegisterVinylRecord';
import { UpdateVinylRecord } from '../domain/use-cases/UpdateVinylRecord';
import { MockVinylRecordRepository } from '../infra/repositories/MockVinylRecordRepository';

export function makeVinylRecordUseCases() {
  const vinylRecordRepository: IVinylRecordRepository = new MockVinylRecordRepository();

  const registerVinylRecord = new RegisterVinylRecord(vinylRecordRepository);
  const updateVinylRecord = new UpdateVinylRecord(vinylRecordRepository);
  const deleteVinylRecord = new DeleteVinylRecord(vinylRecordRepository);
  const findVinylRecord = new FindVinylRecord(vinylRecordRepository);

  return {
    registerVinylRecord,
    updateVinylRecord,
    deleteVinylRecord,
    findVinylRecord,
  };
}
