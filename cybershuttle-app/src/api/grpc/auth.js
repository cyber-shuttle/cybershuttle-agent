const { UserServicePromiseClient } = require('../../protos/authorization_grpc_web_pb')
const { CreateUserRequest, CreateTokenRequest, IsAuthenticatedRequest, Register, Login, User } = require('../../protos/authorization_pb')


const host = 'http://localhost:5001/'

export class UserServiceGrpc {

    static async register(data) {

        let client = new UserServicePromiseClient(host, null, null);

        let user = new Register();

        let regis = new CreateUserRequest();

        console.log(data["username"]);

        user.setUsername(data.username);
        user.setFirstName(data.first_name);
        user.setLastName(data.last_name);
        user.setEmail(data.email);
        user.setPassword(data.password);

        regis.setNewUser(user);

        try {
            const res = await client.createUser(regis, null);

            return { "id": res.getId() };

        } catch (err) {
            throw new Error(`Cannot register at this time. ${err}`);
        }
    }

    static async login(data) {

        let client = new UserServicePromiseClient(host, null, null);

        let loginUser = new Login();

        loginUser.setEmail(data.email);
        loginUser.setPassword(data.password);

        let tokenRequest = new CreateTokenRequest();

        tokenRequest.setLogin(loginUser);

        try {
            const res = await client.createToken(tokenRequest, null);

            const token = res.getToken();
            let newuser = res.getUser();

            if (token.length > 0) {

                const auth = new IsAuthenticatedRequest();
                auth.setToken(token);
                auth.setUser(newuser);

                const userResponse = await client.isAuthenticated(auth, null);

                if (userResponse.getOk()) {
                    console.log("looged in")
                    let user = userResponse.getUser();
                    let consulParams = userResponse.getConsulauthparams();
                    let data = {
                        "Ok": userResponse.getOk(),
                        "username": user.getUsername(),
                        "first_name": user.getFirstName(),
                        "last_name": user.getLastName(),
                        "email": user.getEmail(),
                        "token": token,
                        "id": user.getId(),
                        "consul_token": consulParams.getConsultoken(),
                        "consul_path": consulParams.getConsulpath(),
                        "consul_host": consulParams.getConsulhost(),
                        "consul_port": consulParams.getConsulport(),
                    }

                    return data;
                }
                else {
                    throw new Error(`Login token invalid`);
                }

            } else {
                throw new Error(`Cannot login with given details`);
            }

        } catch (err) {
            throw new Error(`Cannot login at this time. ${err}`);
        }


    }
}