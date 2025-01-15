import { Chip } from "@nextui-org/chip";

export const Sparkle = ({ size }) => {
  return <span style={{ fontSize: size || "1em" }}>✨</span>;
};

export default function ChipTitle({ title, icon, iconSize }) {
  const displayIcon = icon || <Sparkle size={iconSize} />;

  return (
    <Chip
      classNames={{
        base: "p-5 border-accent/70",
        content: "text-white/85 font-semibold text-lg",
      }}
      variant="bordered"
      startContent={displayIcon}
    >
      {title}
    </Chip>
  );
}
