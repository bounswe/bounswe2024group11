type LogoProps = {
    size: number;
};

export const Logo = ({ size = 40 }: LogoProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <use href="#logo-shape" />
        </svg>
    );
};
