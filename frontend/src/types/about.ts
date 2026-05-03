export interface AboutPageMission {
  id: string | number;
  Value?: string;
  Detail?: string;
}

export interface AboutPagePoint {
  id: string | number;
  IconName?: string;
  Title?: string;
  Description?: string;
}

export interface AboutPageData {
  PageH1?: string;
  H1Detail?: string;
  Background?: any;
  VisionAndMission?: {
    Vision?: string;
    Mission?: AboutPageMission[];
  };
  Advantages?: {
    Title?: string;
    Detail?: string;
    ValuePoints?: AboutPagePoint[];
  };
}
