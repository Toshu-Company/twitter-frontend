/**
 * The properties for the fetchAPI function.
 */
type Props = {
  query?: Record<string, any>;
  body?: Record<string, any>;
  method?: "POST" | "GET";
};

/**
 * Fetches data from the API using the provided URL and properties.
 * @param url - The URL to fetch data from.
 * @param prop - The properties for the fetchAPI function.
 * @returns A Promise that resolves to the fetched data.
 */
async function fetchAPI(url: string, prop: Props = {}) {
  const query = prop.query ?? {};
  const body = prop.body ?? {};
  const method = prop.method ?? "GET";

  const _url = new URL(url);
  Object.keys(query).forEach((key) =>
    _url.searchParams.append(key, query[key])
  );

  const res = await fetch(_url.toString(), {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    ...(method === "POST" && { body: JSON.stringify(body) }),
  });

  if (!res.ok) {
    console.log(res);
    throw new Error("Failed to fetch API");
  }

  const json = await res.json();

  return json;
}

/**
 * Fetches video data from the API based on the provided ID.
 * @param id - The ID of the video to fetch.
 * @returns A Promise that resolves to the fetched video data.
 */
export async function getVideo(id: string): Promise<VideoInfo> {
  const data = await fetchAPI(
    `${process.env.NEXT_PUBLIC_API_URL}/twi-videos/${id}`
  );
  return data;
}

/**
 * Fetches video detail data from the API based on the provided ID.
 * @param id - The ID of the video to fetch detail data for.
 * @returns A Promise that resolves to the fetched video detail data.
 */
export async function getDetail(id: string): Promise<VideoDetail> {
  const data = await fetchAPI(
    `${process.env.NEXT_PUBLIC_API_URL}/twi-videos/${id}/detail`
  );
  return data;
}

/**
 * Fetches video data from the API based on the provided page number.
 * @param page - The page number of the video data to fetch. Defaults to 1.
 * @returns A Promise that resolves to the fetched video data.
 */
export async function getIndex(page = 1): Promise<SearchResult> {
  const data = await fetchAPI(`${process.env.NEXT_PUBLIC_API_URL}/twi-videos`, {
    query: { page },
  });
  return data;
}

/**
 * Fetches the most recent 4 videos from the API.
 * @returns A Promise that resolves to the fetched recent videos data.
 */
export async function getRecent(): Promise<SearchResult> {
  const data = await fetchAPI(
    `${process.env.NEXT_PUBLIC_API_URL}/twi-videos/recent`
  );
  return data;
}

/**
 * Fetches a random video detail from the API.
 * @returns A Promise that resolves to the fetched random video detail data.
 */
export async function getRandom(): Promise<VideoDetail> {
  const data = await fetchAPI(
    `${process.env.NEXT_PUBLIC_API_URL}/twi-videos/random`
  );
  return data;
}

/**
 * Fetches search results from the twi-videos API based on the provided query and page number.
 * @param query - The search query string.
 * @param page - The page number of the search results to fetch. Defaults to 1.
 * @returns A Promise that resolves to the search results data.
 */
export async function getSearch(
  query: string,
  page = 1
): Promise<SearchResult> {
  const data = await fetchAPI(
    `${process.env.NEXT_PUBLIC_API_URL}/twi-videos/search`,
    {
      query: { query, page },
    }
  );
  return data;
}

/**
 * Fetches a list of users based on a search query.
 * @param id - The search query string.
 * @param page - The page number to retrieve. Defaults to 1.
 * @returns A Promise that resolves to the search results data.
 */
export async function getSearchUser(
  id: string,
  page = 1
): Promise<SearchResult> {
  const data = await fetchAPI(
    `${process.env.NEXT_PUBLIC_API_URL}/twi-videos/search/user`,
    {
      query: { id, page },
    }
  );
  return data;
}

export interface SearchResult {
  videos: SearchResultVideo[];
  count: number;
}

export interface SearchResultVideo {
  id: string;
  thumbnail: string;
}

export interface VideoDetail {
  data: Data;
  includes: Includes;
  url: ArrayLikeObject<string>;
  video: ArrayLikeObject<string>;
  thumbnails: ArrayLikeObject<URL_TYPE>;
  uploader: string;
  uploader_id: string;
  uploader_url: string;
  webpage_url: string;
  title: string;
  formats: ArrayLikeObject<URL_TYPE>;
}

export interface Data {
  text: string;
  author_id: string;
  id: string;
  edit_history_tweet_ids: string[];
  attachments: Attachments;
}

export interface Attachments {
  media_keys: string[];
}

export interface Includes {
  media: Medum[];
  users: User[];
}

export interface Medum {
  media_key: string;
  preview_image_url: string;
  type: string;
  variants: Variant[];
}

export interface Variant {
  bit_rate?: number;
  content_type: string;
  url: string;
}

export interface User {
  username: string;
  name: string;
  id: string;
}

export interface URL_TYPE {
  url: string;
}

export type ArrayLikeObject<T> = {
  [key in string]: T;
};

export interface VideoInfo {
  id: string;
  user: VideoInfoUser;
  tweet: string;
  title: string;
  thumbnail: string;
  video: string;
}

export interface VideoInfoUser {
  //   id: string;
  name: string;
  screen_name: string;
  profile_url: string;
}
