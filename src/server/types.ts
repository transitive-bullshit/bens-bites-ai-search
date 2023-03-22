import type { OpenAIApi } from 'openai'
import type {
  PineconeClient as PineconeClientGeneric,
  Vector
} from 'pinecone-client'

export type { OpenAIApi }

export type PineconeMetadata = {
  postTitle: string
  postId: string
  postUrl: string

  publicationId: string

  markdown: string
  text: string
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
}

export interface NewsletterLink extends LinkMetadata {
  url: string
  postTitle: string
  postDate: string
  postId: string
  postUrl: string
}

export type NewsletterLinkMap = Record<string, NewsletterLink>

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
