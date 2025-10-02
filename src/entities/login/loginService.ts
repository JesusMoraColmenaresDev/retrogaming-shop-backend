import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../user/userModel';
import { ApiError } from '../../utils/ApiError';

interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginData) => {
  const { email, password } = data;

  // Buscar usuario por email
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new ApiError('INVALID_CREDENTIALS');
  }

  // Comparar contraseñas
  const isMatch = await bcrypt.compare(password, user.getDataValue('passwordHash'));
  if (!isMatch) {
    throw new ApiError('INVALID_CREDENTIALS');
  }

  // Generar JWT con todos los campos del usuario excepto la contraseña
  const token = jwt.sign(
    {
      id: user.getDataValue('id'),
      firstName: user.getDataValue('firstName'),
      lastName: user.getDataValue('lastName'),
      email: user.getDataValue('email'),
      phoneNumber: user.getDataValue('phoneNumber'),
      country: user.getDataValue('country'),
      role: user.getDataValue('role'),
    },
    process.env.JWT_SECRET || 'secretkey',
    { expiresIn: '1h' }
  );

  return token;
};