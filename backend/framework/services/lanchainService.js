import { ChatOpenAI } from "@langchain/openai";
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

export default function langchainService() {
  const categoriseEmails = async (emails, apiKey) => {
    // Categorise emails using OpenAI API
    try {
      const model = new ChatOpenAI({
        apiKey,
        model: "gpt-3.5-turbo",
        maxTokens: 1000,
        temperature: 0.5,
      });

      //  Setup prompt template
      const prompt = ChatPromptTemplate.fromTemplate(
        `Categorise this email into a category: "Work, Social Media, Entertainment,  Shopping, Important, Personal, Security". 
        Email content: {emailContent}. 
        Formatting Instructions: {formatting_instructions}`
      );

      // Setup zod parser
      const parser = StructuredOutputParser.fromZodSchema(
        z.object({
          category: z
            .array(
              z.enum([
                "Work",
                "Social Media",
                "Shopping",
                "Entertainment",
                "Important",
                "Personal",
                "Security",
              ])
            )
            .describe("email categories"),
        })
      );

      // Create chain
      const chain = prompt.pipe(model).pipe(parser);

      // Process emails concurrently
      const categorisedEmails = await Promise.all(
        emails.map(async (email) => {
          const output = await chain.invoke({
            emailContent: email.snippet,
            formatting_instructions: parser.getFormatInstructions(),
          });

          return {
            id: email.id,
            subject: email.subject,
            snippet: email.snippet,
            from: email.from,
            category: output.category,
          };
        })
      );

      return categorisedEmails;
    } catch (error) {
      console.error(error);
      throw new Error("Error categorising emails");
    }
  };

  return {
    categoriseEmails,
  };
}
