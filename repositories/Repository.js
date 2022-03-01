import CategoryRepo from '~/repositories/CategoryRepo'
import DiagnosaRepo from '~/repositories/DiagnosaRepo'
import EmployeeRepo from '~/repositories/EmployeeRepo'
import ResponbilityRepo from '~/repositories/ResponbilityRepo'
import ServiceRepo from '~/repositories/ServiceRepo'

export default ($axios) => ({
    category: CategoryRepo($axios),
    diagnosa: DiagnosaRepo($axios),
    employee: EmployeeRepo($axios),
    responbility: ResponbilityRepo($axios),
    service: ServiceRepo($axios)
})