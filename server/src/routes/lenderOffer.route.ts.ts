import { Router } from 'express'
import * as lenderOfferController from '../controllers/lenderOffer.controller'

const router = Router()

router.get('/lenders', lenderOfferController.getLenderOffers)
router.post('/lenders', lenderOfferController.lenderOfferRepayment)

export default router
