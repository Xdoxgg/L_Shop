import UserDto from "../DTO/UserDto";
import {DataRepository} from "../repositories/DataRepository";


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


    private setUsers(data: UserDto[]): void {
        this.dataRepository.writeArray('users', data);
    }

    public addUser(data: UserDto): void {
        let arr = this.dataRepository.readArray('users');
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
    }

    public checkAccount(data: UserDto): boolean {
        let result = false;
        const users = this.dataRepository.readArray('users');
        users.forEach(user => {
            if ((user.name == data.name || user.email == data.email || user.phone == data.phone) && user.password == data.password) {
                result = true;
            }
        })


        return result;
    }

}

export default UserService;