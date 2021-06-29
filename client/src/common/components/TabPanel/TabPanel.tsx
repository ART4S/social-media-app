type TabPanelProps = {
  index: number;
  value: number;
  children: React.ReactNode;
};

export default function TabPanel({
  value,
  index,
  children,
}: TabPanelProps): JSX.Element {
  return (
    <div style={{ display: value !== index ? "none" : "block", width: "100%" }}>
      {children}
    </div>
  );
}
