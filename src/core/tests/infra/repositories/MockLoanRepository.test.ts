import { MockLoanRepository } from '../../../infra/repositories/MockLoanRepository';
import { Loan } from '../../../domain/entities/Loan';

describe('MockLoanRepository', () => {
  it('should not throw when updating a non-existent loan', async () => {
    const loanRepository = new MockLoanRepository();
    const loan = Loan.create('1', 'user-1', 'record-1', new Date());

    await expect(loanRepository.update(loan)).resolves.not.toThrow();
  });
});
