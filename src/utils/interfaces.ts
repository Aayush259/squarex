
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
};

export interface ITemplates {
    name: TemplateType;
    description: string;
    image: string;
}

// Store Interfaces
export interface UserState {
    id: string;
    name: string;
    email: string;
};

export type TemplateType = 'basic1template' | null;

export interface TemplateState {
    mode: 'checking' | 'editing' | 'reviewing' | 'done' | null;
    selectedTemplate: TemplateType;
    templateData: Record<string, any>;
};
