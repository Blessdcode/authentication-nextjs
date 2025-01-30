import Link from "next/link"
import { Button } from "../ui/button"

interface ButtonModel {
    href: string;
    label: string;
}

export const ButtonModel = ({ href, label }: ButtonModel) => {
  return (
    <Button className="font-[500] w-full " variant={"link"} size={"lg"} asChild>
      <Link href={href} className="text-lg hover:text-lightBlue">{label}</Link>
    </Button>
  );
};