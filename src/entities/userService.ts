import bcrypt from 'bcrypt';
import { User } from './userModel';

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

  // Validate unique email
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('El correo electrónico ya está registrado.');
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create user
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