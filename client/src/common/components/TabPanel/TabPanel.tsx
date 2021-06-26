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
  return <div hidden={value !== index}>{children}</div>;
}
