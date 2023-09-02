import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (err) {
        console.log(err);
    }
};