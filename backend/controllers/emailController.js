export default function emailController(emailService, langchainService) {
  const getInbox = async (req, res) => {
    try {
      const accessToken = req.session.user.access_token;
      const refreshToken = req.session.user.refresh_token;
      const openaiApiKey = req.query.openaiApiKey;

      if (!openaiApiKey) {
        return res.status(400).json({ message: "OpenAI API key is required" });
      }

      const emails = await emailService.getInbox(accessToken, refreshToken);
      const categorisedEmails = await langchainService.categoriseEmails(emails);
      console.log("categorisedEmails: ", categorisedEmails);
      res.json({
        message: "GET /inbox",
        data: categorisedEmails,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  const getSent = async (req, res) => {
    try {
      const accessToken = req.session.user.access_token;
      const refreshToken = req.session.user.refresh_token;
      const openaiApiKey = req.query.openaiApiKey;

      if (!openaiApiKey) {
        return res.status(400).json({ message: "OpenAI API key is required" });
      }

      const emails = await emailService.getSent(accessToken, refreshToken);
      const categorisedEmails = await langchainService.categoriseEmails(emails);
      console.log("categorisedEmails: ", categorisedEmails);
      res.json({
        message: "GET /inbox",
        data: categorisedEmails,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  const getDrafts = async (req, res) => {
    try {
      const accessToken = req.session.user.access_token;
      const refreshToken = req.session.user.refresh_token;
      const openaiApiKey = req.query.openaiApiKey;
      console.log("accessToken: ", accessToken);

      if (!openaiApiKey) {
        return res.status(400).json({ message: "OpenAI API key is required" });
      }

      const emails = await emailService.getDrafts(accessToken, refreshToken);
      const categorisedEmails = await langchainService.categoriseEmails(emails);
      console.log("categorisedEmails: ", categorisedEmails);
      res.json({
        message: "GET /inbox",
        data: categorisedEmails,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  const getTrash = async (req, res) => {
    try {
      const accessToken = req.session.user.access_token;
      const refreshToken = req.session.user.refresh_token;
      const openaiApiKey = req.query.openaiApiKey;

      if (!openaiApiKey) {
        return res.status(400).json({ message: "OpenAI API key is required" });
      }

      const emails = await emailService.getTrash(accessToken, refreshToken);
      const categorisedEmails = await langchainService.categoriseEmails(emails);
      console.log("categorisedEmails: ", categorisedEmails);
      res.json({
        message: "GET /inbox",
        data: categorisedEmails,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  return {
    getInbox,
    getSent,
    getDrafts,
    getTrash,
  };
}
