import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "./ui/button";
import { FormProvider, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";
import { FetcherWithComponents } from "@remix-run/react";
import { loader as getToxcitiy } from "../routes/api.getToxcitity";
import { SerializeFrom } from "@remix-run/node";

const formSchema = z.object({
  message: z.string().max(100, {
    message: "Message must be a maximum of 100 characters.",
  }),
});

interface TextareaFormProps {
  fetcher: FetcherWithComponents<SerializeFrom<typeof getToxcitiy>>;
}

export function TextareaForm({ fetcher }: TextareaFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    fetcher.load("/api/getToxcitity?content=" + data.message);

    toast({
      title: "Submitted",
      description: "Please be patient as this could take some time",
    });
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[35vw] space-y-6 mt-4 mb-8">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Submit sentence to be judged</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your sentence" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>Maximum of 100 characters for this website demo</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={fetcher.state !== "idle"}>
          Submit
        </Button>
      </form>
    </FormProvider>
  );
}
