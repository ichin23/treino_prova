import { IVinylRecordRepository } from '../../domain/repositories/IVinylRecordRepository';
import { VinylRecord } from '../../domain/entities/VinylRecord';

export class MockVinylRecordRepository implements IVinylRecordRepository {
  private static instance: MockVinylRecordRepository;
  private records: VinylRecord[] = [];

  private constructor() {}

  public static getInstance(): MockVinylRecordRepository {
    if (!MockVinylRecordRepository.instance) {
      MockVinylRecordRepository.instance = new MockVinylRecordRepository();
    }
    return MockVinylRecordRepository.instance;
  }

  async save(record: VinylRecord): Promise<void> {
    this.records.push(record);
  }

  async findById(id: string): Promise<VinylRecord | null> {
    return this.records.find(record => record.id === id) || null;
  }

  async findAll(): Promise<VinylRecord[]> {
    return this.records;
  }

  async update(record: VinylRecord): Promise<void> {
    const recordIndex = this.records.findIndex(r => r.id === record.id);
    if (recordIndex !== -1) {
      this.records[recordIndex] = record;
    }
  }

  async delete(id: string): Promise<void> {
    this.records = this.records.filter(record => record.id !== id);
  }

  public reset(): void {
    this.records = [];
  }
}
