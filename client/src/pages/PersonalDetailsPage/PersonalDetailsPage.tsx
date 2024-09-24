import { useNavigate } from 'react-router-dom'
import { PageHeader, PersonalDetails } from '../../components'

export const PersonalDetailsPage = () => {
  const navigate = useNavigate()
  const nextStep = () => navigate('/loan')
  return (
    <PageHeader title='Personal Details'>
      <PersonalDetails next={nextStep} />
    </PageHeader>
  )
}

export default PersonalDetailsPage
