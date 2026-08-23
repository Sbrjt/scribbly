import { User } from "@/models";
import { checkPassword } from "@/utils/crypto";

export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return null;
  }

  const isValidPassword = await checkPassword(password, user.password);

  if (!isValidPassword) {
    return null;
  }

  return user;
}
