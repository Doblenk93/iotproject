export interface HomePageCapability {
  id: string | number;
  IconName?: string;
  Title?: string;
  Description?: string;
}

export interface HomePageTestimonialItem {
  id: string | number;
  ClientWords?: string;
  ClientName?: string;
  ClientCompany?: string;
  ClientPicture?: any;
}

export interface HomePageData {
  PageH1?: string;
  H1Detail?: string;
  Background?: any;
  Capabilities?: {
    Title?: string;
    Detail?: string;
    ValuePoints?: HomePageCapability[];
  };
  Testimonials?: {
    Title?: string;
    Detail?: string;
    DisplayedTestimonials?: number;
    Randomize?: boolean;
  };
}

export interface HomePortfolioItem {
  id: string | number;
  Title?: string;
  Type?: string;
  Image?: any;
}
