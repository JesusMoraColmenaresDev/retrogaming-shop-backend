// Tipos para la información del usuario en el JWT y en el backend

export type UserJwtPayload = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  country?: string;
  role: 'user' | 'admin';
  iat?: number;
  exp?: number;
};
