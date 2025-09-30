interface AuthState {
  isAuth: boolean;
  token: AuthToken;
  user: AuthUser;
}

interface AuthUser {
  id: string;
  email: string;
  type: string;
  createdAt: Date | null;
}

interface AuthToken {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  issuedAt: Date | null;
  expiresIn: number;
  expiresAt: Date | null;
}
