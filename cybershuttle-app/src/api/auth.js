const service = require('../protos/authorization_grpc_pb')
const auth = require('../protos/authorization_pb')
const grpc = require('grpc')


export const register = async ({username, first_name, second_name, email, password } = {}) => {

	const user = {username,  first_name, second_name, email, password };

    console.log(user);

    // var client = new user_proto.UserService('localhost:50051',grpc.credentials.createInsecure());

    let client = new service.UserServiceClient('localhost:50051', grpc.credentials.createInsecure())

    let regis = new auth.Register()

    regis.setUsername(username);
    regis.setFirstName(first_name);
    regis.setLastName(last_name);
    regis.setEmail(email);
    regis.setPassword(password);

    client.createUser({new_user: user}, function(err, response) {
        if (err) throw new Error(`Cannot register at this time. ${err}`);
        console.log('User Created:', response.message);
        client.close();
    });

};







// // const { startGrpcServer, getGrpcServer } = require("./grpc");
// const protoLoader = require("@grpc/proto-loader");
// const grpc = require("@grpc/grpc-js");
// const PROTO_PATH = __dirname + "./protos/user.proto";
// // const { createUser, createToken, isAuthenticated, getUser } = require("./user");

// const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
//   keepCase: true,
//   longs: String,
//   defaults: true,
//   oneofs: true,
// });

// const user_proto = grpc.loadPackageDefinition(packageDefinition);

// // startGrpcServer();
// // const server = getGrpcServer();

// // server.addService(user_proto.UserService.service, {
// //   createUser,
// //   createToken,
// //   isAuthenticated,
// //   getUser,
// // });

// export const register = async ({username, first_name, second_name, email, password } = {}) => {

// 	const user = {username,  first_name, second_name, email, password };

//     console.log(user);

//     var client = new user_proto.UserService('localhost:50051',grpc.credentials.createInsecure());

//     client.createUser({new_user: user}, function(err, response) {
//         if (err) throw new Error(`Cannot register at this time. ${err}`);
//         console.log('User Created:', response.message);
//         client.close();
//     });

// };


// // export const login = async ({userType, email, password, otp } = {}) => {
// // 	const user = {userType, email, password, otp };

// // 	try {
// // 		const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
// // 			method: "POST",
// // 			credentials: "include",
// // 			headers: {
// // 				Accept: "application/json",
// // 				"Content-Type": "application/json",
// // 			},
// // 			body: JSON.stringify(user),
// // 		});
// // 		return await res.json();
// // 	} catch (err) {
// // 		throw new Error(`Cannot login at this time. ${err}`);
// // 	}
// // };

// // export const logout = async () => {
// // 	try {
// // 		const res = await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
// // 			method: "GET",
// // 			credentials: "include",
// // 		});
// // 		return await res.json();
// // 	} catch (err) {
// // 		console.log(err);
// // 	}
// // };

// // export const getUser = async () => {
// // 	try {
// // 		const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
// // 			method: "GET",
// // 			credentials: "include",
// // 		});
// // 		return await res.json();
// // 	} catch (err) {
// // 		throw new Error("Please login to continue");
// // 	}
// // };

// // export const resetpassword = async ({userType,email} = {}) => {
// // 	const user = {userType,email};

// // 	try {
// // 		const res = await fetch(`${process.env.REACT_APP_API_URL}/resetpassword`, {
// // 			method: "POST",
// // 			credentials: "include",
// // 			headers: {
// // 				Accept: "application/json",
// // 				"Content-Type": "application/json",
// // 			},
// // 			body: JSON.stringify(user),
// // 		});

// // 		return await res.json();
// // 	} catch (err) {
// // 		throw new Error(`Cannot reset password at this time. ${err}`);
// // 	}
// // };

// // export const newpassword = async ({password,token_rs} = {}) => {
// // 	const user = {password,token_rs};

// // 	try {
// // 		const res = await fetch(`${process.env.REACT_APP_API_URL}/newpassword`, {
// // 			method: "POST",
// // 			credentials: "include",
// // 			headers: {
// // 				Accept: "application/json",
// // 				"Content-Type": "application/json",
// // 			},
// // 			body: JSON.stringify(user),
// // 		});

// // 		return await res.json();
// // 	} catch (err) {
// // 		throw new Error(`Cannot reset password at this time. ${err}`);
// // 	}
// // };