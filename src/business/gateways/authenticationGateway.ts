export interface AuthenticationGateway {
  generateToken(input: UsersInfoForToken): string;
  getUsersInfoFromToken(token: string): UsersInfoForToken;
}

// userId

export interface UsersInfoForToken {
  id: string;
}
