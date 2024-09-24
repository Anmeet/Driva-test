import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'
import { Layout, ProtectedRoute } from './components'
import { useFormContext } from './context/FormContext'
import { LoanDetailsPage, PersonalDetailsPage, ResultsPage } from './pages'

function App() {
  const { formData } = useFormContext()

  const isPersonalDetailsComplete = !!(formData.firstName && formData.lastName)
  const isLoanDetailsComplete = !!(
    isPersonalDetailsComplete && formData.vehiclePrice
  )
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path='/' element={<PersonalDetailsPage />} />
          <Route
            element={<ProtectedRoute condition={isPersonalDetailsComplete} />}
          >
            <Route path='/loan' element={<LoanDetailsPage />} />
          </Route>
          <Route element={<ProtectedRoute condition={isLoanDetailsComplete} />}>
            <Route path='/results' element={<ResultsPage />} />
          </Route>
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Router>
    </Layout>
  )
}

export default App
