import { useNavigate } from "react-router-dom";
import { Button } from "smarthr-ui";
import { createNewApplication } from "../../../lib/db";

interface NewApplicationButtonProps {
  variant?: "primary" | "secondary" | "text";
  size?: "default" | "s";
}

export const NewApplicationButton = ({
  variant = "primary",
  size = "default",
}: NewApplicationButtonProps) => {
  const navigate = useNavigate();

  const handleCreateNew = async () => {
    try {
      const newId = await createNewApplication();
      navigate(`/jobs/${newId}?new=true`);
    } catch (error) {
      console.error("Failed to create new application:", error);
      alert("新しい選考の作成に失敗しました。");
    }
  };

  return (
    <Button variant={variant} size={size} onClick={handleCreateNew}>
      + 新しい選考を追加
    </Button>
  );
};
