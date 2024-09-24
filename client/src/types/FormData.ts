export enum EmploymentStatus {
  Employed = 'Employed',
  SelfEmployed = 'Self-Employed',
  Unemployed = 'Unemployed',
}
export interface PersonalDetails {
  firstName: string
  lastName: string
  dateOfBirth: string
  email: string
  mobile: string
  address: string
  employmentStatus: EmploymentStatus
  employerName?: string
  annualIncome: number
}

export interface LoanDetails {
  vehiclePrice: number
  deposit: number
  loanPurpose: string
  loanTerm: number
}

export interface FormData extends PersonalDetails, LoanDetails {}
