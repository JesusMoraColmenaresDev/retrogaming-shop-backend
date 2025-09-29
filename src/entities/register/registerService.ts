import bcrypt from 'bcrypt';
import { User } from '../user/userModel';

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

  // Validar qeu el correo no este registrado
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw { code: 'EMAIL_ALREADY_EXISTS' };
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