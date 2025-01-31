import React from "react";
import { CardWrapper } from "./cardWrapper";
import { Button } from "../ui/button";

const VerificationEmail = () => {
  return (
    <CardWrapper
      headerLabel="Confirm your email"
      buttonLabel="wrong email?"
      buttonLabelLink="/auth/login">
      <div className="flex md:flex-row flex-col items-center justify-center">
        <Button>Confirm Email</Button>
      </div>
    </CardWrapper>
  );
};

export default VerificationEmail;
