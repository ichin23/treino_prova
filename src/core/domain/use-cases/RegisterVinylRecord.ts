import { VinylRecord } from '../entities/VinylRecord';
import { IVinylRecordRepository } from '../repositories/IVinylRecordRepository';
import { Name } from '../value-objects/Name';
import { Photo } from '../value-objects/Photo';

export class RegisterVinylRecord {
  constructor(private readonly vinylRecordRepository: IVinylRecordRepository) {}

  async execute(params: {
    band: string;
    album: string;
    year: number;
    numberOfTracks: number;
    photoUrl: string;
  }): Promise<VinylRecord> {
    const { band, album, year, numberOfTracks, photoUrl } = params;

    const record = VinylRecord.create(
      Math.random().toString(),
      Name.create(band),
      Name.create(album),
      year,
      numberOfTracks,
      Photo.create(photoUrl)
    );

    await this.vinylRecordRepository.save(record);

    return record;
  }
}
