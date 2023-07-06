import React from "react";

type PromptActionsProps = {
  onUpdate: () => void;
  onDelete: () => void;
};

const PromptActions = ({ onUpdate, onDelete }: PromptActionsProps) => {
  return (
    <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
      <p
        className="font-inter text-sm green_gradient cursor-pointer"
        onClick={onUpdate}
      >
        Edit
      </p>
      <p
        className="font-inter text-sm orange_gradient cursor-pointer"
        onClick={onDelete}
      >
        Delete
      </p>
    </div>
  );
};

export default PromptActions;
