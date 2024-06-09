"use client";

import Image from "next/image";
import { useState } from "react";

type PromptCopyProps = {
  onCopy: () => void;
};

const PromptCopy = ({ onCopy }: PromptCopyProps) => {
  const [showCopyIcon, setShowCopyIcon] = useState(false);

  const handleCopy = () => {
    setShowCopyIcon(true);
    onCopy();
    setTimeout(() => setShowCopyIcon(false), 3000);
  };

  return (
    <div className="copy_btn cursor-pointer" onClick={handleCopy}>
      <Image
        src={showCopyIcon ? "/icons/tick.svg" : "/icons/copy.svg"}
        alt={showCopyIcon ? "tick_icon" : "copy_icon"}
        width={20}
        height={20}
      />
    </div>
  );
};

export default PromptCopy;
