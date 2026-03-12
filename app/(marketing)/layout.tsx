import OiaNav from "@/components/oia/OiaNav";
import OiaFooter from "@/components/oia/OiaFooter";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <OiaNav />
      <div style={{ paddingTop: "64px" }}>{children}</div>
      <OiaFooter />
    </>
  );
}
