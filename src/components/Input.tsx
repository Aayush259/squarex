import { InputProps } from "@/utils/interfaces";

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {

    return (
        <label htmlFor={label} className="block my-4">
            {
                label && <span className="capitalize">{label + ":"}</span>
            }

            <input
                id={label}
                className="w-full rounded-md bg-transparent border border-neutral-400/50 focus:border-[var(--primary)] mt-1 p-2 outline-none"
                {...props}
            />
        </label>
    );
};

export default Input;
