import type { Project } from '~/types/store/projects'

export type EmailSettings = {
    email: string | null;
    useBothEmails: boolean;
    balance: boolean;
    balanceLimit: string;
    mediaSuccess: boolean;
    mediaError: boolean;
    mediaBuy: boolean;
    liveCodecs: boolean;
    cameraError: boolean;
    liveAutokick: boolean;
    liveNotRecorded: boolean;
    news: boolean;
}

export type Account = {
    balance: string;
    balanceLine: string;
    currency: string;
    creditEnabled: boolean;
    removeMediaAt: string | null;
}

export type Stat = {
    playtimeMs: number;
    timesSpaceMs: number;
}

export type Language = {
    id: string;
    title: string;
    code: string;
}

export type Settings = {
    phone: string | null;
    about: string | null;
    language: Language;
}

export type User = {
    id: string;
    email: string;
    username: string;
    isEmailVerified: boolean;
    emailSettings: EmailSettings;
    account: Account;
    stat: Stat;
    settings: Settings;
    createdAt: string;
}

export type CheckMyPromoCodePromo = {
    id: string;
    title: string;
    bonus: string;
}

export type CheckMyPromoCode = {
    isAvailable: boolean;
    promo: CheckMyPromoCodePromo
}

export type PriceNodes = {
    currency: string;
    price: string;
}

export type NodesTariffs = {
    id: string;
    title: string;
    isDef: boolean;
    isPublic: boolean;
    position: number;
    prices: Array<PriceNodes>;
}

export type Tariffs = {
    nodes: Array<NodesTariffs>;
}

export type Projects = {
    totalCount: number;
    nodes: Array<Project>;
}

export type UpdateProfileDTO = {
    input: {
        email: string;
        username: string;
        languageId: string;
        phone: string | null;
        about: string | null;
    }
}

export type FetchLoginProfileResponse = {
    loginProfile: User;
    checkMyPromoCode: CheckMyPromoCode;
    tariffs: Tariffs;
    userProjects: Projects;
}

export type UpdateProfileResponse = {
    loginProfileUpdate: {
        id: number;
        record: User;
    }
}