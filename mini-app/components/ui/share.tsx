import { Button } from "@/components/ui/button";

export interface ShareProps {
  url: string;
}

export function Share({ url }: ShareProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(url).catch(() => alert("Failed to copy URL"));
  };

  return <Button onClick={handleCopy} variant="outline">Copy Quiz Link</Button>;
}
