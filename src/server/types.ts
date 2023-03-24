import type { OpenAIApi } from 'openai'
import type {
  PineconeClient as PineconeClientGeneric,
  Vector
} from 'pinecone-client'
import { type TweetV1, type TwitterApiv1, type UserV1 } from 'twitter-api-v2'

export type { TwitterApiv1 as TwitterClientV1 }
export type { UserV1 as TwitterUserV1 }
export type { TweetV1 }

export type { OpenAIApi }

export type PineconeMetadata = {
  title?: string
  description?: string
  site?: string
  medium?: string
  author?: string
  category?: string
  shortlink?: string
  canonical?: string
  date?: string
  author_url?: string
  linkText?: string

  thumbnail?: string
  thumbnailWidth?: number
  thumbnailHeight?: number

  icon?: string
  iconWidth?: number
  iconHeight?: number

  url: string
  postTitle: string
  postDate: string
  postId: string
  postUrl: string
}

export type PineconeClient = PineconeClientGeneric<PineconeMetadata>
export type PineconeVector = Vector<PineconeMetadata> & {
  metadata: PineconeMetadata
}

export interface LinkMetadata {
  title?: string
  description?: string
  site?: string
  medium?: string
  author?: string
  category?: string
  shortlink?: string
  canonical?: string
  date?: string
  author_url?: string
  linkText?: string

  thumbnail?: string
  thumbnailWidth?: number
  thumbnailHeight?: number

  icon?: string
  iconWidth?: number
  iconHeight?: number
}

export interface NewsletterLink extends LinkMetadata {
  url: string
  dead?: boolean

  postTitle: string
  postDate: string
  postId: string
  postUrl: string
}

export type NewsletterLinkMap = Record<string, NewsletterLink>

export interface IFramelyLinks {
  thumbnail: IFramelyImage[]
  icon: IFramelyImage[]
}

export interface IFramelyImage {
  href: string
  rel: string[]
  type: string
  media?: IFramelyMedia
  content_length?: number
}

export interface IFramelyMedia {
  width: number
  height: number
}

export namespace beehiiv {
  export interface Newsletter {
    domain: string
    baseUrl: string
    publication: beehiiv.Publication
    posts: beehiiv.Post[]
  }

  export interface Publication {
    id: string
    name: string
    description: string
    tags: Tag[]
    url: string
    web_theme: WebTheme
    cta_text: string
    noindex_enabled: boolean
    double_opt_required: boolean
    premium_enabled: boolean
    premium_offering_name: string
    premium_summary: null
    premium_features: any[]
    stripe_user_id: null
    facebook_url: string
    instagram_url: string
    linkedin_url: string
    tiktok_url: string
    twitter_url: string
    youtube_url: string
    tiktok_pixel: string
    facebook_pixel: string
    google_analytics_4_pixel: string
    twitter_pixel: string
    google_analytics_pixel: string
    gtm_pixel: string
    post_subscribe_form_id: null
    email_sender_name: string
    render_authors_widget: boolean
    has_referral_program: boolean
    has_recommendations: boolean
    beehiiv_branding: boolean
    has_polls: boolean
    thumbnail: Thumbnail
    web_template: WebTemplate
    logo: Logo
    content_tags: any[]
    authors: Author[]
  }

  export interface Post {
    id: string
    publication_id: string
    web_title: string
    web_subtitle: string
    status: PostStatus
    override_scheduled_at: string
    slug: string
    image_url: string
    meta_default_title: string
    meta_default_description: string
    meta_og_title: string
    meta_og_description: string
    meta_twitter_title: string
    meta_twitter_description: string
    audience: string
    enforce_gated_content: boolean
    enable_popup_on_scroll: boolean
    email_capture_title: string
    email_capture_message: string
    email_capture_cta: string
    authors: Author[]
    created_at: string
    updated_at: string

    // our own extensions
    url: string
    markdown?: string
  }

  export interface Author {
    id: string
    name: string
    profile_picture: ProfilePicture
  }

  export interface ProfilePicture {
    url: string
    thumb: Thumbnail
    landscape: Thumbnail
  }

  export interface Thumbnail {
    url: string
  }

  export interface Logo {
    url: string
    thumb: Thumbnail
  }

  export interface Tag {
    id: number
    name: string
    created_at: string
    updated_at: string
  }

  export interface WebTemplate {
    id: number
    theme: string
    enable_featured_post_badges: boolean
  }

  export interface WebTheme {
    primary_color: string
    text_on_primary_color: string
    secondary_color: string
    text_on_secondary_color: string
    tertiary_color: string
    text_on_tertiary_color: string
    background_color: string
    text_on_background_color: string
    subscribe_background_color: string
    text_on_subscribe_background_color: string
    subscribe_theme: string
    content_theme: string
    border_style: string
    border_radius: string
    header_font: string
    body_font: string
    button_font: string
    logo_shadow: string
    name: string
    purpose: string
    owner_id: string
  }

  export type PostStatus = 'published'
}

export interface ResolvedTwitterData {
  tweets: Record<string, TweetV1Ext>
  users: Record<string, UserV1Ext>

  usernamesToIds: Record<string, string>
  urls: Record<string, LinkMetadata>
}

export type TweetV1Ext = Omit<
  TweetV1,
  | 'user'
  | 'quoted_status'
  | 'retweeted_status'
  | 'id'
  | 'source'
  | 'favorited'
  | 'retweeted'
  | 'contributors'
  | 'place'
  | 'geo'
  | 'coordinates'
  | 'truncated'
  | 'in_reply_to_status_id'
  | 'in_reply_to_user_id'
> & {
  quoted_status_id_str?: string
  retweeted_status_id_str?: string
  user_id_str: string
}

export type UserV1Ext = Omit<
  UserV1,
  | 'id'
  | 'utc_offset'
  | 'status'
  | 'contributors_enabled'
  | 'is_translator'
  | 'is_translation_enabled'
  | 'profile_background_color'
  | 'profile_background_image_url'
  | 'profile_background_tile'
  | 'profile_image_url'
  | 'profile_image_extensions_alt_text'
  | 'profile_banner_extensions_alt_text'
  | 'profile_link_color'
  | 'profile_sidebar_border_color'
  | 'profile_sidebar_fill_color'
  | 'profile_text_color'
  | 'profile_use_background_image'
  | 'has_extended_profile'
  | 'default_profile'
  | 'default_profile_image'
  | 'following'
  | 'follow_request_sent'
  | 'notifications'
  | 'translator_type'
  | 'withheld_in_countries'
  | 'needs_phone_verification'
>
