import express from 'express'
import { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import { sanitizeInput } from './middlewares/validation.middleware'
import lenderOfferRoutes from './routes/lenderOffer.route.ts'
import swaggerUi from 'swagger-ui-express'
import { swaggerDocs } from './swagger'

const app = express()
const cors = require('cors')

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000'],
}

app.use(bodyParser.json())
app.use(sanitizeInput)
app.use(cors(corsOptions))

app.use('/api', lenderOfferRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message)
  res.status(500).send('Internal Server Error')
})

export { app }
