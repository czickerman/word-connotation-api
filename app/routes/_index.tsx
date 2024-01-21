import { type MetaFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { loader as getToxcitiy } from "./api.getToxcitity";
import { TextareaForm } from "~/components/TextareaForm";
import { TypeAnimation } from "react-type-animation";

export const meta: MetaFunction = () => {
  return [{ title: "Hackathon" }, { name: "description", content: "Hackathon winner 2024" }];
};

export default function Index() {
  const fetcher = useFetcher<typeof getToxcitiy>({ key: "api-fetcher" });

  const [text, setText] = useState("No word submitted");

  useEffect(() => {
    if (fetcher.state === "loading") {
      setText("Loading");
    } else if (fetcher.data?.toxic !== undefined) {
      setText(fetcher.data.toxic ? "Message is insulting" : "Message is non insulting");
    }
  }, [fetcher.state]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-7xl absolute top-[5vh] font-titillium-web">
        <TypeAnimation sequence={["AI Powered Text Recognition"]} />
      </h1>
      <div className="border-stone-300 border-2 rounded-lg">
        <div className="flex flex-col p-5 relative w-[200px]">
          <h2 className="text-center">Word Judge</h2>
          <h3 className="text-center">{text}</h3>
        </div>
      </div>
      <TextareaForm fetcher={fetcher} />
      <div className="flex flex-col">
        <h1 className="text-5xl text-center">Access our API</h1>
        <div className="flex flex-col font-vt323 bg-slate-900 p-4 text-xl rounded-lg shadow-2xl mt-5">
          <h2 className="mt-3">
            <span className="text-green-500">GET</span> https://placeholderurl.com/api/getWordToxicity?word=WORD
          </h2>
          <p className="mt-3 p-4">
            {"{"}
            <br />
            <span className="ml-[30px]">{'"toxic"'}: true || false</span>
            <br />
            {"}"}
          </p>
        </div>
      </div>
    </div>
  );
}
