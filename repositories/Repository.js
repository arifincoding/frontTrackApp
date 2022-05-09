import CategoryRepo from '~/repositories/CategoryRepo'
import BrokenRepo from '~/repositories/BrokenRepo'
import EmployeeRepo from '~/repositories/EmployeeRepo'
import ResponbilityRepo from '~/repositories/ResponbilityRepo'
import ServiceRepo from '~/repositories/ServiceRepo'
import AuthRepo from '~/repositories/AuthRepo'
import ChatRepo from '~/repositories/ChatRepo'
import UserRepo from '~/repositories/UserRepo'

export default ($axios,store) => ({
    auth: AuthRepo($axios, store),
    category: CategoryRepo($axios, store),
    broken: BrokenRepo($axios, store),
    employee: EmployeeRepo($axios, store),
    responbility: ResponbilityRepo($axios, store),
    service: ServiceRepo($axios, store),
    chat: ChatRepo($axios, store),
    user: UserRepo($axios, store)
})