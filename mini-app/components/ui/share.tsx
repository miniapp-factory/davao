import { Button } from "@/components/ui/button";
import { useCallback } from "react";

export interface ShareProps {
  score: number;
  url: string;
}

export function Share({ score, url }: ShareProps) {
  const handleShare = useCallback(() => {
    const shareText = `I scored ${score} out of 10 in the Davao Discovery Quiz! Check it out: ${url}`;
    if (navigator.share) {
      navigator
        .share({
          title: "Davao Discovery Quiz",
          text: shareText,
          url,
        })
        .catch((err) => console.error("Share failed:", err));
    } else {
      // Fallback: open Twitter intent
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}`;
      window.open(twitterUrl, "_blank");
    }
  }, [score, url]);

  return (
    <Button onClick={handleShare} variant="outline" className="mt-4">
      Share to Farcaster
    </Button>
  );
}
