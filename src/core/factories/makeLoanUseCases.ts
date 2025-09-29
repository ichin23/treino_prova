import { ILoanRepository } from '../domain/repositories/ILoanRepository';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IVinylRecordRepository } from '../domain/repositories/IVinylRecordRepository';
import { BorrowVinylRecord } from '../domain/use-cases/BorrowVinylRecord';
import { ReturnVinylRecord } from '../domain/use-cases/ReturnVinylRecord';
import { MockLoanRepository } from '../infra/repositories/MockLoanRepository';
import { MockUserRepository } from '../infra/repositories/MockUserRepository';
import { MockVinylRecordRepository } from '../infra/repositories/MockVinylRecordRepository';

export function makeLoanUseCases() {
  const loanRepository: ILoanRepository = new MockLoanRepository();
  const userRepository: IUserRepository = new MockUserRepository();
  const vinylRecordRepository: IVinylRecordRepository = new MockVinylRecordRepository();

  const borrowVinylRecord = new BorrowVinylRecord(
    loanRepository,
    userRepository,
    vinylRecordRepository
  );
  const returnVinylRecord = new ReturnVinylRecord(loanRepository);

  return {
    borrowVinylRecord,
    returnVinylRecord,
  };
}
