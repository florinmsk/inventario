export const Sparkle = ({ size }) => {
    return <span style={{ fontSize: size || '1em' }}>✨</span>;
};

export default function ChipTitle({ title, icon, iconSize }) {
    const displayIcon = icon || <Sparkle size={iconSize} />;

    return (
        <span className="inline-flex py-2 px-4 bg-gradient-to-tr border border-pink-600 rounded-full text-white/85 font-semibold text-lg text-center">
            <span>{displayIcon}</span>
            {title}
        </span>
    );
}
