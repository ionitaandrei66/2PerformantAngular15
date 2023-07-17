export interface User {
    email: string;
    id: number;
    login: string;
    name: string;
    role: string;
    unique_code: string;
    created_at: string;
    avatar_url: string;
    user_info: UserInfo;
    newsletter_subscription: boolean;
    influencer_marketing_wizard_state: string | null;
    influencer_profile_status: string | null;
}

export interface UserInfo {
    address: string;
    city: string;
    country: string;
    display_name: string;
    firstname: string;
    lastname: string;
    organization: string;
    phone: string;
    state: string;
    typeofbusiness: string;
}