import { connectToDB } from "@/lib/database";
import Prompt from "@/models/prompt";

export const GET = async (request: Request, response: Response) => {
  console.log("hi");
  //   const url = request.url.split("/");
  //   console.log(url);
  //   const id = url[url.length - 2];
  //   console.log(id);

  //   try {
  //     await connectToDB();

  //     const prompts = await Prompt.find({ creator: id }).populate("creator");

  //     return new Response(JSON.stringify(prompts), { status: 200 });
  //   } catch (error) {
  //     return new Response("Failed to fetch prompts created by user", {
  //       status: 500,
  //     });
  //   }
};
