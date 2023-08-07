export interface AssetFeatureCollectionResponse {
  type: "FeatureCollection";
  features: AssetFeatureResponse[];
  pagination: {
    page: number;
    pageCount: number;
  };
}

export interface AssetFeatureResponse extends woosmap.map.GeoJSONFeature {
  type: "Feature";
  properties: AssetResponse;
  geometry: woosmap.map.GeoJSONPoint;
}

export interface AssetResponse {
  name: string;
  store_id: string;
  address?: AssetAddress;
  contact?: AssetContact;
  open?: {
    current_slice: AssetOpeningHoursPeriod;
    open_hours: AssetOpeningHours[];
    open_now: boolean;
    next_opening?: {
      end: string;
      start: string;
      day: string;
    };
    week_day?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  };
  weekly_opening?: AssetWeeklyOpeningResponse;
  types?: string[];
  tags?: string[];
  user_properties?: Record<string, unknown>;
  opening_hours?: AssetOpeningHours | null;
  distance?: number;
}

export interface AssetContact {
  website?: string;
  phone?: string;
  email?: string;
}

export interface AssetAddress {
  lines?: string[];
  country_code?: string | null;
  city?: string;
  zipcode?: string;
}

interface AssetOpeningHoursPeriod {
  start: string;
  end: string;
  "all-day"?: boolean;
}

interface AssetOpeningHours {
  timezone?: string;
  usual?: AssetOpeningHoursUsual;
  special?: AssetOpeningHoursSpecial;
}

interface AssetOpeningHoursUsual {
  "1"?: AssetOpeningHoursPeriod[];
  "2"?: AssetOpeningHoursPeriod[];
  "3"?: AssetOpeningHoursPeriod[];
  "4"?: AssetOpeningHoursPeriod[];
  "5"?: AssetOpeningHoursPeriod[];
  "6"?: AssetOpeningHoursPeriod[];
  "7"?: AssetOpeningHoursPeriod[];
  default?: AssetOpeningHoursPeriod[];
}

interface AssetOpeningHoursSpecial {
  /** key as YYYY-MM-DD like "2015-03-08" **/
  [key: string]: AssetOpeningHoursPeriod[];
}

interface AssetWeeklyOpeningResponse {
  "1"?: AssetWeeklyOpeningHoursPeriod;
  "2"?: AssetWeeklyOpeningHoursPeriod;
  "3"?: AssetWeeklyOpeningHoursPeriod;
  "4"?: AssetWeeklyOpeningHoursPeriod;
  "5"?: AssetWeeklyOpeningHoursPeriod;
  "6"?: AssetWeeklyOpeningHoursPeriod;
  "7"?: AssetWeeklyOpeningHoursPeriod;
  timezone?: string;
}

interface AssetWeeklyOpeningHoursPeriod {
  hours?: AssetOpeningHoursPeriod[];
  isSpecial?: boolean;
}
