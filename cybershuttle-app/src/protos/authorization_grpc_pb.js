// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var src_protos_authorization_pb = require('../../src/protos/authorization_pb.js');

function serialize_CreateTokenRequest(arg) {
  if (!(arg instanceof src_protos_authorization_pb.CreateTokenRequest)) {
    throw new Error('Expected argument of type CreateTokenRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CreateTokenRequest(buffer_arg) {
  return src_protos_authorization_pb.CreateTokenRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CreateTokenResponse(arg) {
  if (!(arg instanceof src_protos_authorization_pb.CreateTokenResponse)) {
    throw new Error('Expected argument of type CreateTokenResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CreateTokenResponse(buffer_arg) {
  return src_protos_authorization_pb.CreateTokenResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CreateUserRequest(arg) {
  if (!(arg instanceof src_protos_authorization_pb.CreateUserRequest)) {
    throw new Error('Expected argument of type CreateUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CreateUserRequest(buffer_arg) {
  return src_protos_authorization_pb.CreateUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CreateUserResponse(arg) {
  if (!(arg instanceof src_protos_authorization_pb.CreateUserResponse)) {
    throw new Error('Expected argument of type CreateUserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CreateUserResponse(buffer_arg) {
  return src_protos_authorization_pb.CreateUserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GetUserRequest(arg) {
  if (!(arg instanceof src_protos_authorization_pb.GetUserRequest)) {
    throw new Error('Expected argument of type GetUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GetUserRequest(buffer_arg) {
  return src_protos_authorization_pb.GetUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GetUserResponse(arg) {
  if (!(arg instanceof src_protos_authorization_pb.GetUserResponse)) {
    throw new Error('Expected argument of type GetUserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GetUserResponse(buffer_arg) {
  return src_protos_authorization_pb.GetUserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_IsAuthenticatedRequest(arg) {
  if (!(arg instanceof src_protos_authorization_pb.IsAuthenticatedRequest)) {
    throw new Error('Expected argument of type IsAuthenticatedRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_IsAuthenticatedRequest(buffer_arg) {
  return src_protos_authorization_pb.IsAuthenticatedRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_IsAuthenticatedResponse(arg) {
  if (!(arg instanceof src_protos_authorization_pb.IsAuthenticatedResponse)) {
    throw new Error('Expected argument of type IsAuthenticatedResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_IsAuthenticatedResponse(buffer_arg) {
  return src_protos_authorization_pb.IsAuthenticatedResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserServiceService = exports.UserServiceService = {
  createUser: {
    path: '/UserService/CreateUser',
    requestStream: false,
    responseStream: false,
    requestType: src_protos_authorization_pb.CreateUserRequest,
    responseType: src_protos_authorization_pb.CreateUserResponse,
    requestSerialize: serialize_CreateUserRequest,
    requestDeserialize: deserialize_CreateUserRequest,
    responseSerialize: serialize_CreateUserResponse,
    responseDeserialize: deserialize_CreateUserResponse,
  },
  getUser: {
    path: '/UserService/GetUser',
    requestStream: false,
    responseStream: false,
    requestType: src_protos_authorization_pb.GetUserRequest,
    responseType: src_protos_authorization_pb.GetUserResponse,
    requestSerialize: serialize_GetUserRequest,
    requestDeserialize: deserialize_GetUserRequest,
    responseSerialize: serialize_GetUserResponse,
    responseDeserialize: deserialize_GetUserResponse,
  },
  createToken: {
    path: '/UserService/CreateToken',
    requestStream: false,
    responseStream: false,
    requestType: src_protos_authorization_pb.CreateTokenRequest,
    responseType: src_protos_authorization_pb.CreateTokenResponse,
    requestSerialize: serialize_CreateTokenRequest,
    requestDeserialize: deserialize_CreateTokenRequest,
    responseSerialize: serialize_CreateTokenResponse,
    responseDeserialize: deserialize_CreateTokenResponse,
  },
  isAuthenticated: {
    path: '/UserService/IsAuthenticated',
    requestStream: false,
    responseStream: false,
    requestType: src_protos_authorization_pb.IsAuthenticatedRequest,
    responseType: src_protos_authorization_pb.IsAuthenticatedResponse,
    requestSerialize: serialize_IsAuthenticatedRequest,
    requestDeserialize: deserialize_IsAuthenticatedRequest,
    responseSerialize: serialize_IsAuthenticatedResponse,
    responseDeserialize: deserialize_IsAuthenticatedResponse,
  },
};

exports.UserServiceClient = grpc.makeGenericClientConstructor(UserServiceService);
