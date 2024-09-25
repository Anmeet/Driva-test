import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { Request, Response } from 'express'
import { LoanDetailDto } from '../dtos/loanDetail.dto'
import * as offerService from '../services/lenderOffer.service'

export const getLenderOffers = (req: Request, res: Response): void => {
  const lenderOffers = offerService.getLenderOffers()
  res.json(lenderOffers)
}

export const lenderOfferRepayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const lenderOfferRepayment = plainToClass(LoanDetailDto, req.body)
  const errors = await validate(lenderOfferRepayment)

  if (errors.length > 0) {
    const errorMessages = errors
      .map((err) => Object.values(err.constraints || {}))
      .flat()
    res.status(400).json({ errors: errorMessages })
    return
  }

  const lenderOffers = offerService.lenderOfferRepayment(lenderOfferRepayment)
  res.status(201).json(lenderOffers)
}
