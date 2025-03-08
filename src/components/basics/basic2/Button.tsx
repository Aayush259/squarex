import { ButtonProps } from "@/utils/interfaces";

const Basic2Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {

    return (
        <button
            className={`px-6 py-2 rounded-full overflow-hidden bg-[#303030] text-white border border-[#303030] outline-none relative hover:text-[#303030] duration-500 before:absolute before:top-0 before:left-1/2 before:h-full before:w-0 before:rounded-full before:bg-white before:duration-500 hover:before:w-full hover:before:left-0 disabled:opacity-50 disabled:cursor-default ${className}`}
            {...props}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
        </button>
    );
};

export default Basic2Button;
