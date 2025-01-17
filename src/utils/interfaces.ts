
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

export type SocialLinks = 'Instagram' | 'Twitter' | 'LinkedIn' | 'GitHub' | 'Facebook' | null;
export type TemplateType = 'basic1template' | null;
export type TemplateMode = 'checking' | 'editing' | 'reviewing' | 'done' | null;

// Interface for basic1template data structure
export interface Basic1TemplateData {
    home: {
        title: string;
        name: string;
        role: string;
        bio: string;
        image: string;
    },
    work: {
        title: string;
        projects: {
            title: string;
            url: string;
            description: string;
            image: string;
        }[];
    },
    skills: string[];
    social: {
        platform: SocialLinks;
        url: string | null;
    }[]
}

// Template data type that maps template types to their corresponding data structures
export type TemplateDataMap = {
    basic1template: Basic1TemplateData;
}

export interface TemplateState {
    mode: TemplateMode;
    selectedTemplate: TemplateType;
    templateData: {
        [K in Exclude<TemplateType, null>]: K extends keyof TemplateDataMap ? TemplateDataMap[K] : never;
    } | null;
}
