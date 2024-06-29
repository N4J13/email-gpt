export default async function findOrCreateUseCase({ userRepository, data }) {
  const user = await userRepository.findOrCreate(data);
  if (!user) {
    throw new Error("User not found or created");
  }
  return user;
}
