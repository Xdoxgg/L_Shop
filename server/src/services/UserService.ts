import UserDto from "../DTO/UserDto";
import {DataRepository} from "../repositories/DataRepository";
import userRoutes from "../routes/userRoutes";


class UserService {
    private static instance: UserService;
    private dataRepository: DataRepository<UserDto>;

    private constructor() {
        this.dataRepository = new DataRepository<UserDto>();
    }

    public static getInstance(): UserService {
        if (this.instance == null) {
            this.instance = new UserService();
        }
        return this.instance;
    }

    private getUsers(): UserDto[] {
        return this.dataRepository.readArray('users');
    }
    
    private setUsers(data: UserDto[]): void {
        this.dataRepository.writeArray('users', data);
    }

    public addUser(data: UserDto): string {
        let arr =this.getUsers();
        let dataId: number;
        if (arr.length == 0) {
            arr = []
            dataId = 1;
        } else {
            dataId = arr[arr.length - 1].id + 1;
        }
        //TODO: add check constraint on data
        data.id = dataId;
        arr.push(data);
        this.setUsers(arr);
        return 'success'
    }

    public checkAccount(data: UserDto): boolean { // TODO: add optimisation
        let result = false;
        const users = this.getUsers();
        users.forEach(user => {
            if ((user.name == data.name || user.email == data.email || user.phone == data.phone) && user.password == data.password) {
                result = true;
            }
        })
        return result;
    }

}

export default UserService;