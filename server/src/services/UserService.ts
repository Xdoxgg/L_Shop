import UserDto from "../DTO/UserDto";
import {DataRepository} from "../repositories/DataRepository";


class UserService {
    private static instance: UserService;
    private dataRepository: DataRepository<UserDto>;

    private constructor() {
        this.dataRepository = new DataRepository<UserDto>();
    }

    public static getInstance() {
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
        if (arr.length==0) {
            arr = []
            dataId = 1;
        } else {
            dataId = arr[arr.length - 1].id + 1;
        }

        //TODO: add check constraint on data
        data.id = dataId;
        console.log(dataId);
        // console.log(arr);

        arr.push(data);
        this.setUsers(arr);
    }


}

export default UserService;