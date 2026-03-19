import UserDto from "../DTO/UserDto";
import { DataRepository } from "../repositories/DataRepository";
import bcrypt from 'bcrypt';

class UserService {
    private static instance: UserService;
    private dataRepository: DataRepository<UserDto>;

    private constructor() {
        this.dataRepository = new DataRepository<UserDto>();
    }

    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    private getUsers(): UserDto[] {
        return this.dataRepository.readArray('users');
    }

    private setUsers(data: UserDto[]): void {
        this.dataRepository.writeArray('users', data);
    }

    public async register(userData: { name: string; password: string; email?: string; phone?: string }): Promise<{ success: boolean; message: string; user?: Omit<UserDto, 'password'> }> {
        const users = this.getUsers();

        if (users.some(u => u.name === userData.name)) {
            return { success: false, message: 'Пользователь с таким именем уже существует' };
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const newUser: UserDto = {
            id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
            name: userData.name,
            password: hashedPassword,
            email: userData.email,
            phone: userData.phone
        };

        users.push(newUser);
        this.setUsers(users);

        const { password, ...safeUser } = newUser;
        return { success: true, message: 'Регистрация успешна', user: safeUser };
    }

    public async login(name: string, password: string): Promise<{ success: boolean; message: string; user?: Omit<UserDto, 'password'> }> {
        const users = this.getUsers();
        const user = users.find(u => u.name === name);

        if (!user) {
            return { success: false, message: 'Пользователь не найден' };
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return { success: false, message: 'Неверный пароль' };
        }

        const { password: _, ...safeUser } = user;
        return { success: true, message: 'Вход выполнен успешен', user: safeUser };
    }

    public getAllUsers(): Omit<UserDto, 'password'>[] {
        return this.getUsers().map(({ password, ...rest }) => rest);
    }
}

export default UserService;