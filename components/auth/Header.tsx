interface headerProps {
  label: string;
  title: string;
}

export const HeaderWrapper = ({ label, title }: headerProps) => {
  return (
    <div>
      <div className="flex items-center justify-center space-x-3 mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-center">{title}</h2>
      </div>
      <p className="text-lg sm:text-xl text-center opacity-90">{label}</p>
    </div>
  );
};
