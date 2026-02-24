"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const FoodGeneration = () => {
  const [prompt, setPrompt] = useState<string>(
    "I just made a delicious plate of Spaghetti Carbonara using spaghetti, eggs, Parmesan cheese, pancetta, black pepper, garlic, and a pinch of salt. The sauce was rich and creamy without using any cream, thanks to the eggs and cheese. The pancetta added a perfect salty crunch, and the garlic brought everything together. It's one of those simple yet satisfying meals that always hits the spot.",
  );
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [extractedInfo, setExtractedInfo] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateImageAndExtract = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt first");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResultImage(null);
    setExtractedInfo([]);

    try {
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container max-w-3xl p-4 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">AI Food Creator</h1>

      <div className="space-y-4">
        <Textarea
          placeholder="Enter a food description (e.g., 'Try our new spicy chicken ramen...')"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[120px]"
        />

        <Button onClick={generateImageAndExtract} disabled={isLoading || !prompt.trim()} className="w-full" variant={isLoading ? "secondary" : "outline"}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            "Generate Image & Extract Info"
          )}
        </Button>

        {error && <div className="p-2 text-red-500 rounded bg-red-50">{error}</div>}

        <div className="mt-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-lg">
              <Loader2 className="w-12 h-12 text-gray-400 animate-spin" />
              <p className="mt-4 text-gray-500">Working on it...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {extractedInfo && (
                <div className="flex flex-wrap items-center gap-2 p-4 border rounded-lg card">
                  <h2 className="mb-2 text-lg font-semibold">Extracted Info</h2>
                  {extractedInfo}
                </div>
              )}
              {resultImage && (
                <div className="mb-6 overflow-hidden border rounded-lg">
                  <img src={resultImage || "/placeholder.svg"} alt="Generated image" className="w-full h-auto" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
