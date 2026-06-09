import { MainSectionTitle } from "./MainSectionTitle";

export function MainSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <MainSectionTitle>{title}</MainSectionTitle>
      <section>{children}</section>
    </>
  );
}
