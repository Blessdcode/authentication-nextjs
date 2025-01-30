import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Header } from "./Header";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
}

export const CardWrapper = ({ children, headerLabel }: CardWrapperProps) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full md:w-[700px] shadow-md">
        <CardHeader>
          <Header label={headerLabel} />
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};
