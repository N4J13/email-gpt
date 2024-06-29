import User from "../models/user";

function userRepositoryDB() {
  // Get user by id
  async function getUserById(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    return user;
  }

  // find or create user

  async function findOrCreate(user) {
    console.log("Printing user ", user);
    const [newUser, created] = await User.findOrCreate({
      where: { googleId: user.googleId },
      defaults: user,
    });
    if (!newUser) throw new Error("Error finding or creating user");
    return newUser;
  }

  return {
    getUserById,
    findOrCreate,
  };
}

export default userRepositoryDB;
