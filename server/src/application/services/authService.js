import userRepository from "../../infrastructure/repositories/userRepository.js";
import jwtProvider from "../../infrastructure/providers/jwtProvider.js";
import bcrypt from "bcrypt";

async function register({ email, password, name }) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.create({
        email,
        name,
        passwordHash: hashedPassword,
    });
    return user;
}

async function login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const validPassword = await bcrypt.compare(password, user.passwordHash); // campo correto
    if (!validPassword) throw new Error("Invalid credentials");

    const token = jwtProvider.generateToken({ id: user.id });
    return token;
}

export default { register, login };
