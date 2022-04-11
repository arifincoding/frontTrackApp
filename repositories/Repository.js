import CategoryRepo from '~/repositories/CategoryRepo'
import DiagnosaRepo from '~/repositories/DiagnosaRepo'
import EmployeeRepo from '~/repositories/EmployeeRepo'
import ResponbilityRepo from '~/repositories/ResponbilityRepo'
import ServiceRepo from '~/repositories/ServiceRepo'
import AuthRepo from './AuthRepo'

export default ($axios,store) => ({
    auth: AuthRepo($axios, store),
    category: CategoryRepo($axios, store),
    diagnosa: DiagnosaRepo($axios, store),
    employee: EmployeeRepo($axios, store),
    responbility: ResponbilityRepo($axios, store),
    service: ServiceRepo($axios, store)
})