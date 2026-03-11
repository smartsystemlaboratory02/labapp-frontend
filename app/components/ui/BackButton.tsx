import React from "react";
import { Button } from "./button";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => navigate(-1)}
      className="rounded-2xl hover:bg-zinc-100 items-center justify-center flex ml-0 mt-0 border"
    >
      <ChevronLeft size="40" strokeWidth={2} />
    </Button>
  );
};

export default BackButton;
