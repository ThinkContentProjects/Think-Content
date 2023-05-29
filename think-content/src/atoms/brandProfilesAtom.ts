import { atom } from "recoil";

type GenderType = "Male" | "Female" | "NotSpecified";

export type customerPersona = {
    personaName: string;
    ageRangeLow: Number;
    ageRangeHigh: Number;
    gender: GenderType;
    painPoints: string;
}

export type BrandProfile = {
    id: string,
    name: string,
    mission: string,
    industry: string,
    message: string
    customerPersona?: customerPersona
};

interface BrandProfileState {
    selectedBrandProfile: BrandProfile | null
    brandProfiles: BrandProfile[]
    brandProfilesFetched: Boolean
}

const defaultBrandProfileState: BrandProfileState = {
    selectedBrandProfile: null,
    brandProfiles: [],
    brandProfilesFetched: false
}

export const brandProfileState = atom<BrandProfileState>({
    key: 'brandProfileState',
    default: defaultBrandProfileState
})