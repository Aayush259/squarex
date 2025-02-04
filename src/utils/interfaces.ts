
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
};

export interface SpanProps extends React.HTMLAttributes<HTMLSpanElement> {
    reference?: React.RefObject<HTMLSpanElement | null>;
    children: React.ReactNode;
    className?: string;
};

export interface ITemplates {
    name: TemplateType;
    description: string;
    image: string;
};

export interface IContact {
    user_id: string;
    templateName: TemplateType;
    data: {
        name: string;
        email: string;
        message: string;
    }
};

// Store Interfaces
export interface UserState {
    id: string;
    name: string;
    email: string;
};

export type SocialLinks = 'Instagram' | 'Twitter' | 'LinkedIn' | 'GitHub' | 'Facebook' | null;
export type TemplateType = 'basic1template' | 'basic2template' | 'intermediate1template' | null;
export type TemplateMode = 'checking' | 'editing' | 'reviewing' | 'done' | null;

export type TemplateData = {
    [K in Exclude<TemplateType, null>]: {
        type: K;
        data: TemplateDataMap[K];
    }
}[Exclude<TemplateType, null>];

export interface TemplateState {
    mode: TemplateMode;
    templateData: TemplateData | null;
};

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
};

export interface Basic2TemplateData {
    home: {
        title: string;
        name: string;
        role: string;
        bio: string;
    },
    about: {
        title: string;
        descriptionPart1: string;
        descriptionPart2: string;
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
    skills: {
        title: string;
        subtitle: string;
        skills: string[];
    },
    social: {
        platform: SocialLinks;
        url: string | null;
    }[];
};

export interface Intermediate1TemplateData {
    
};

// Template data type that maps template types to their corresponding data structures
export type TemplateDataMap = {
    'basic1template': Basic1TemplateData;
    'basic2template': Basic2TemplateData;
    'intermediate1template': Intermediate1TemplateData;
};

export interface TemplateState {
    mode: TemplateMode;
    templateData: TemplateData | null;
};
