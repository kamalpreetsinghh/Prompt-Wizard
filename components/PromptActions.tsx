"use client";

type PromptActionsProps = {
  onUpdate: () => void;
  onDelete: () => void;
};

const PromptActions = ({ onUpdate, onDelete }: PromptActionsProps) => {
  return (
    <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
      <button
        type="button"
        className="font-inter text-sm px-3 py-1 bg-orange-600 rounded-full primary-button"
        onClick={onUpdate}
      >
        Edit
      </button>
      <button
        type="button"
        className="font-inter text-sm px-3 py-1 bg-red-700 rounded-button "
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default PromptActions;
