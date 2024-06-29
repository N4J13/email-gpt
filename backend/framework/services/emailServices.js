import { google } from "googleapis";
import { oauth2Client } from "../../config/google-oauth";

export default function emailServices() {
  const getInbox = async (accessToken, refreshtoken) => {
    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshtoken,
    });

    const gmail = google.gmail({
      version: "v1",
      auth: oauth2Client,
    });

    try {
      const response = await gmail.users.messages.list({
        userId: "me",
        maxResults: 10,
      });

      const messages = response.data.messages.map(async (message) => {
        const email = await gmail.users.messages.get({
          userId: "me",
          id: message.id,
          format: "metadata",
        });

        const headers = email.data.payload.headers;
        const subject = headers.find((header) => header.name === "Subject");
        const from = headers.find((header) => header.name === "From");

        return {
          id: email.data.id,
          subject: subject.value,
          from: from.value,
          snippet: email.data.snippet,
        };
      });

      return Promise.all(messages);
    } catch (error) {
      console.error(error);
      throw new Error("Error getting emails");
    }
  };

  const getSent = async (accessToken, refreshtoken) => {
    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshtoken,
    });

    const gmail = google.gmail({
      version: "v1",
      auth: oauth2Client,
    });

    try {
      const response = await gmail.users.messages.list({
        userId: "me",
        maxResults: 10,
        q: "in:sent",
      });

      const messages = response.data.messages.map(async (message) => {
        const email = await gmail.users.messages.get({
          userId: "me",
          id: message.id,
          format: "metadata",
        });

        const headers = email.data.payload.headers;
        const subject = headers.find((header) => header.name === "Subject");
        const from = headers.find((header) => header.name === "From");

        return {
          id: email.data.id,
          subject: subject.value,
          from: from.value,
          snippet: email.data.snippet,
        };
      });

      return Promise.all(messages);
    } catch (error) {
      console.error(error);
      throw new Error("Error getting emails");
    }
  };

  const getDrafts = async (accessToken, refreshtoken) => {
    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshtoken,
    });

    const gmail = google.gmail({
      version: "v1",
      auth: oauth2Client,
    });

    try {
      const response = await gmail.users.messages.list({
        userId: "me",
        maxResults: 10,
        q: "in:draft",
      });

      const messages = response.data.messages.map(async (message) => {
        const email = await gmail.users.messages.get({
          userId: "me",
          id: message.id,
          format: "metadata",
        });

        const headers = email.data.payload.headers;
        const subject = headers.find((header) => header.name === "Subject");
        const from = headers.find((header) => header.name === "From");

        return {
          id: email.data.id,
          subject: subject.value,
          from: from.value,
          snippet: email.data.snippet,
        };
      });

      return Promise.all(messages);
    } catch (error) {
      console.error(error);
      throw new Error("Error getting emails");
    }
  };

  const getTrash = async (accessToken, refreshtoken) => {
    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshtoken,
    });

    const gmail = google.gmail({
      version: "v1",
      auth: oauth2Client,
    });

    try {
      const response = await gmail.users.messages.list({
        userId: "me",
        maxResults: 10,
        labelIds: ["TRASH"],
      });

      console.log("response: ", response.data);

      const messages = response.data.messages.map(async (message) => {
        const email = await gmail.users.messages.get({
          userId: "me",
          id: message.id,

          format: "metadata",
        });

        const headers = email.data.payload.headers;
        const subject = headers.find((header) => header.name === "Subject");
        const from = headers.find((header) => header.name === "From");

        return {
          id: email.data.id,
          subject: subject.value,
          from: from.value,
          snippet: email.data.snippet,
        };
      });

      return Promise.all(messages);
    } catch (error) {
      console.error(error);
      throw new Error("Error getting emails");
    }
  };

  return {
    getInbox,
    getSent,
    getDrafts,
    getTrash,
  };
}
