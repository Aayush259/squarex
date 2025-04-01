
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
    _id: string;
    user_id: string;
    templateName: TemplateType;
    data: {
        name: string;
        email: string;
        message: string;
    };
    visited: boolean;
    createdAt: Date;
};

// Store Interfaces
export interface UserState {
    id: string;
    name: string;
    email: string;
};

export type SocialLinks = 'Instagram' | 'Twitter' | 'LinkedIn' | 'GitHub' | 'Facebook' | null;
export type TemplateType = 'basic1template' | 'basic2template' | 'intermediate1template';
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
    home: {
        name: string;
        headlines: string[];
    };
    about: {
        descriptionPart1: string;
        descriptionPart2: string;
    };
    projects: {
        name: string;
        description: string;
        image: string;
        url: string;
        gitHubLink: string;
    }[];
    social: {
        platform: SocialLinks;
        url: string | null;
    }[];
};

export type TemplateDataType = Basic1TemplateData | Basic2TemplateData | Intermediate1TemplateData;

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

export interface IEngagementMetric {
    date: string;
    count: number;
};

export interface IEngagementData {
    socialClicks: IEngagementMetric[];
    projectClicks: IEngagementMetric[];
    timeSpent: IEngagementMetric[];
};

export interface IEngagementApiData {
    views: {
        templateName: TemplateType;
        views: IEngagementMetric[];
    }[];
    engagement: IEngagementData;
};

export interface ITrackerFunctions {
    trackSocialClick: () => void;
    trackProjectClick: () => void;
};

export interface IToast {
    id: string;
    message: string;
    success: boolean;
}
