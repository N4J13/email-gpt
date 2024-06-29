export default async function findById({ userRepository, id }) {
  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}
