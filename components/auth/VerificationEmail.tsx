"use client";

import { useEffect, useState } from "react";
import { CardWrapper } from "./cardWrapper";
import { Button } from "../ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyEmail } from "@/actions/verify-email";

const VerificationEmail = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [message, setMessage] = useState<string | undefined>("");

  const verify = async () => {
    if (!token) {
      setMessage("Invalid verification link.");
      return;
    }

    const response = await verifyEmail(token);
    setMessage(response.success || response.error);

    if (response.success) {
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000); 
    }
  };

  useEffect(() => {
    // Initialize verification on page load
    verify();
  }, [token]);

  return (
    <CardWrapper
      headerLabel="Confirm your email"
      buttonLabel="Wrong email?"
      buttonLabelLink="/auth/login">
      <div className="space-y-5 flex flex-col items-center justify-center">
        <Button onClick={verify}>Confirm Email</Button>
        {message && <p className="mt-4">{message}</p>}
      </div>
    </CardWrapper>
  );
};

export default VerificationEmail;
