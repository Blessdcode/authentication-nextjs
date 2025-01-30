import Image from "next/image";

export const Header = ({ label }: { label: string }) => {
  return (
    <div>
      <div className="flex items-center justify-center space-x-3 mb-4">
        <Image src="/Logo.svg" width={ 40} height={40} alt="logo" />
        <h1 className="text-4xl sm:text-5xl font-bold text-center">DropSaas</h1>
      </div>
      <p className="text-lg sm:text-xl text-center opacity-90">{label}</p>
    </div>
  );
};
