import bcrypt from 'bcrypt';
import { User } from '../user/userModel';
import { ApiError } from '../../utils/ApiError';

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  const { firstName, lastName, email, phoneNumber, country, password } = data;

  // Validar que el correo no esté registrado
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new ApiError('EMAIL_ALREADY_EXISTS');
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Crear usuario
  await User.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    country,
    passwordHash,
    role: 'user',
  });

  console.log(`Usuario ${email} registrado exitosamente.`);
};