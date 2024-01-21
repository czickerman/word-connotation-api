/* eslint-disable @typescript-eslint/no-var-requires */
import * as toxicity from "@tensorflow-models/toxicity";

export default async (word: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const threshold = 0.8;
    toxicity.load(threshold, ["insult"]).then((model) => {
      const sentences = [word];
      model.classify(sentences).then((predictions) => {
        resolve(predictions[0].results[0].match);
      });
    });
  });
};
