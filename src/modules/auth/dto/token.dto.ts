export class TokenDto {
  accessToken: string;
  refreshToken: string;
}

export class DecodedJwtToken {
  userId: string;
  iat: number;
  exp: number;
}

export class EncodeJwtToken {
  userId: string;
}
