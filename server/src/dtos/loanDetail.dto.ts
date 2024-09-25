import { IsNumber, IsNotEmpty, Max, Min } from 'class-validator'

export class LoanDetailDto {
  @IsNotEmpty({ message: 'Loan Amount is required' })
  @IsNumber({}, { message: 'Loan Amount must be a number' })
  @Min(2000, { message: 'Loan Amount must be at least 2000' })
  loanAmount!: number

  @IsNotEmpty({ message: 'Loan Term is required' })
  @IsNumber({}, { message: 'Loan term must be a number' })
  @Min(1, { message: 'Loan Term must be at least 1 year' })
  @Max(7, { message: 'Loan Term must be at most 7 years' })
  loanTerm!: number
}
