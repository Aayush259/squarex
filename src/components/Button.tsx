import { ButtonProps } from "@/utils/interfaces";

const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {

    return (
        <button
            className={`px-5 py-2 font-semibold rounded-full overflow-hidden bg-[var(--primary)] text-white outline-none relative hover:text-[var(--primary)] duration-500 before:absolute before:top-0 before:left-1/2 before:h-full before:w-0 before:rounded-full before:bg-white before:duration-500 hover:before:w-full hover:before:left-0 disabled:opacity-50 disabled:cursor-default ${className}`}
            {...props}
        >
            <span className="relative z-10">{children}</span>
        </button>
    );
};

export default Button;
