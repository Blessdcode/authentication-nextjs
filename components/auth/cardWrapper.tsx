import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { ButtonModel } from "./button.model";
import { Header } from "./Header";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  buttonLabelLink: string;
  buttonLabel:string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  buttonLabelLink,
  buttonLabel,
}: CardWrapperProps) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full md:w-[700px] shadow-md">
        <CardHeader>
          <Header label={headerLabel} />
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          <ButtonModel href={buttonLabelLink} label={buttonLabel} />
        </CardFooter>
      </Card>
    </div>
  );
};
