import { LoaderFunctionArgs, json } from "@remix-run/node";
import getWordToxicity from "~/lib/getWordToxicity";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const word = url.searchParams.get("content");

  if (!word) {
    throw new Response("Search param content not specified in url", { status: 400 });
  }

  const predicton = await getWordToxicity(word);

  return json({ toxic: predicton, id: Math.floor(Math.random() * 999999) });
}
