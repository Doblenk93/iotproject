/**
 * Query Builder untuk Strapi API
 * Menggunakan qs untuk build efficient queries
 * 
 * Features:
 * - Selective populate (hanya field yang dibutuhkan)
 * - Filtering, sorting, pagination
 * - Field selection (reduce data transfer)
 * - Type-safe dengan TypeScript
 */

import qs from 'qs';

/**
 * Interface untuk Query Options
 */
interface QueryOptions {
  // Populate - relasi/component yang ingin diambil
  populate?: any;//string | string[];
  
  // Fields - field spesifik yang ingin diambil (mengurangi data)
  fields?: string[];
  
  // Filters - kondisi pencarian
  filters?: Record<string, any>;
  
  // Sorting
  sort?: string | string[];
  
  // Pagination
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  
  // Publishing state
  publicationState?: 'live' | 'preview';
}

/**
 * Build populate query string
 * Hanya include field yang dibutuhkan, bukan semua
 */
export function buildPopulate(fields: string[] | string): string {
  if (typeof fields === 'string') {
    return fields;
  }
  
  // Convert array ke comma-separated string
  // populate=field1,field2,field3
  return fields.join(',');
}

/**
 * Build query object untuk Strapi API
 * FIX: Menghilangkan arrayFormat 'comma' agar kompatibel dengan Strapi v4/v5
 */
export function buildQuery(options: QueryOptions): string {
  const query: Record<string, any> = {};

  // 1. Populate configuration
  if (options.populate) {
    query.populate = options.populate;
  }

  // 2. Fields selection
  if (options.fields && options.fields.length > 0) {
    query.fields = options.fields;
  }

  // 3. Filters
  if (options.filters && Object.keys(options.filters).length > 0) {
    query.filters = options.filters;
  }

  // 4. Sorting
  if (options.sort) {
    query.sort = options.sort;
  }

  // 5. Pagination
  if (options.pagination) {
    query.pagination = options.pagination;
  }

  // 6. Publication state
  if (options.publicationState) {
    query.publicationState = options.publicationState;
  }

  // CONVERT MENGGUNAKAN QS (VERSI AMAN)
  const queryString = qs.stringify(query, {
    encodeValuesOnly: true,
    // Kita hapus arrayFormat: 'comma'
    // Secara default akan menghasilkan: populate[0]=Background&populate[1]=Capabilities
  });

  return queryString ? `?${queryString}` : '';
}

/**
 * Helper: Build efficient query untuk single type
 * Hanya ambil field yang dibutuhkan, minimal populate
 */
export function buildSingleTypeQuery(
  populateFields?: string[],
  selectFields?: string[]
): string {
  return buildQuery({
    populate: populateFields || [],
    fields: selectFields,
    publicationState: 'live',
  });
}

/**
 * Helper: Build efficient query untuk collection dengan pagination
 */
export function buildCollectionQuery(
  options: {
    populate?: string[];
    fields?: string[];
    filters?: Record<string, any>;
    sort?: string[];
    page?: number;
    pageSize?: number;
  } = {}
): string {
  return buildQuery({
    populate: options.populate,
    fields: options.fields,
    filters: options.filters,
    sort: options.sort,
    pagination: {
      page: options.page || 1,
      pageSize: options.pageSize || 10,
    },
    publicationState: 'live',
  });
}

/**
 * Helper: Build query untuk search/filter
 */
export function buildSearchQuery(
  searchTerm: string,
  searchFields: string[],
  options?: Partial<QueryOptions>
): string {
  const filters: Record<string, any> = {
    $or: searchFields.map(field => ({
      [field]: {
        $containsi: searchTerm,
      },
    })),
  };

  return buildQuery({
    ...options,
    filters: {
      ...options?.filters,
      ...filters,
    },
  });
}

/**
 * ============================================
 * SPECIFIC QUERY BUILDERS PER CONTENT TYPE
 * ============================================
 */

/**
 * Query untuk General Info (Single Type)
 * - CompanyLogo, CompanyName, Tagline, Address, Email
 * - Contacts (component), Socials (component), BussinessHours (component)
 */
export const GENERAL_INFO_QUERIES = {
  // Minimal: hanya nama, email, alamat
  minimal: buildQuery({
    populate: [],
    fields: ['CompanyName', 'Email', 'Address'],
  }),

  // For header: logo, nama
  header: buildQuery({
    populate: ['CompanyLogo'],
    fields: ['CompanyName'],
  }),

  // For footer
  footer: buildQuery({
    populate: ['Contacts', 'Socials'],
    fields: [
      'CompanyName',
      'Email',
      'Address',
      'Tagline',
    ],
  }),

  // For contact form: email, contact fields
  contactForm: buildQuery({
    populate: ['Contacts', 'Socials', 'BussinessHours'],
    fields: ['Email', 'Address'],
  }),

  // Complete: semua field
  complete: buildQuery({
    populate: ['CompanyLogo', 'Contacts', 'Socials', 'BussinessHours'],
  }),
};

/**
 * Query untuk Home Page (Single Type)
 * - Background, PageH1, H1Detail, Capabilities (component)
 */
export const HOME_PAGE_QUERIES = {
  complete: buildQuery({
    populate: {
      Background: {
        populate: '*',
      },
      Capabilities: {
        populate: {
          ValuePoints: {
              populate: '*'
          }
        },
      },
      Testimonials: {
        populate: '*',
      }
    },
  }),
};

/**
 * Query untuk About Page (Single Type)
 */
/*
export const ABOUT_PAGE_QUERIES = {
  minimal: buildQuery({
    populate: [],
    fields: ['PageH1', 'H1Detail'],
  }),

  complete: buildQuery({
    populate: ['Background', 'VisionAndMission', 'Advantages'],
  }),
};
*/
export const ABOUT_PAGE_QUERIES = {
  complete: buildQuery({
    // Gunakan Array untuk populate sederhana
    populate: {
      VisionAndMission: {
        populate: '*',
      },
      Advantages: {
        populate: '*',
      },
      Background: {
        populate: '*',
      }
    },
    fields: ['PageH1', 'H1Detail'],
    // Atau gunakan Object jika butuh populate yang lebih dalam (nested)
    /* 
    populate: {
      Background: { fields: ['url', 'alternativeText'] },
      VisionAndMission: { populate: '*' },
      Advantages: { populate: '*' }
    } 
    */
  }),
};

/**
 * Query untuk Contact Page (Single Type)
 */
export const CONTACT_PAGE_QUERIES = {
  minimal: buildQuery({
    populate: [],
    fields: ['PageH1', 'H1Detail'],
  }),

  complete: buildQuery({
    populate: ['Background'],
  }),
};

/**
 * Query untuk Portfolio (Collection Type)
 * - Title, Type, Description, Image, Location, Timestamp
 */
export const PORTFOLIO_QUERIES = {
  page:
    buildQuery({
      populate: ['Background'],
      fields: ['PageH1', 'H1Detail'],
    }),
  /**
   * Featured portfolios (untuk homepage showcase)
   * Sorted by pinnedOrder, limited to small number
   */
  featured: (limit = 3) =>
    buildQuery({
      populate: ['Image', 'Location', 'Timestamp'],
      fields: ['Title', 'Type', 'isFeatured', 'pinnedOrder'],
      filters: {
        isFeatured: {
          $eq: true,
        },
      },
      sort: ['pinnedOrder:asc', 'createdAt:desc'],
      pagination: {
        page: 1,
        pageSize: limit,
      },
    }),

  /**
   * List dengan pagination & full data untuk modal
   */
  paginatedList: (page = 1, pageSize = 12, includeDesc = true) => 
    buildQuery({
      populate: ['Image', 'Location', 'Timestamp'],
      fields: ['Title', 'Type', 'Description', 'isFeatured', 'pinnedOrder'],
      // Urutan: Featured dulu, lalu urutan pin, baru tanggal terbaru
      sort: [
        'isFeatured:desc', 
        'pinnedOrder:asc', 
        'createdAt:desc'
      ],
      pagination: { page, pageSize },
    }),

  /**
   * Search portfolios dengan full details
   */
  search: (searchTerm: string, page = 1, pageSize = 12) =>
    buildQuery({
      populate: ['Image', 'Location', 'Timestamp'],
      fields: ['Title', 'Type', 'Description'],
      filters: {
        $or: [
          { Title: { $containsi: searchTerm } },
          { Type: { $containsi: searchTerm } },
        ],
      },
      sort: ['createdAt:desc'],
      pagination: { page, pageSize },
    }),

  /**
   * Detail view: semua data untuk modal
   */
  detail: buildQuery({
    populate: ['Image', 'Location', 'Timestamp', 'OtherImages'],
    fields: ['Title', 'Type', 'Description', 'isFeatured', 'MultipleMedia'],
  }),

  /**
   * Filter by type dengan pagination
   */
  filterByType: (type: string, page = 1, pageSize = 12) =>
    buildQuery({
      populate: ['Image', 'Location', 'Timestamp'],
      fields: ['Title', 'Type', 'Description', 'isFeatured'],
      filters: {
        Type: {
          $eq: type,
        },
      },
      sort: ['isFeatured:desc', 'pinnedOrder:asc', 'createdAt:desc'],
      pagination: { page, pageSize },
    }),

  /**
   * DEPRECATED - untuk backwards compatibility
   * Gunakan paginatedList() atau featured() sebagai gantinya
   */
  list: buildQuery({
    populate: ['Image'],
    fields: ['Title', 'Type'],
    sort: ['createdAt:desc'],
    pagination: {
      page: 1,
      pageSize: 12,
    },
  }),

  listWithDesc: buildQuery({
    populate: ['Image'],
    fields: ['Title', 'Type', 'Description'],
    sort: ['createdAt:desc'],
    pagination: {
      page: 1,
      pageSize: 12,
    },
  }),
};

/**
 * Query untuk Testimonial (Collection Type)
 * - Title, Detail, ClientWords (component repeatable)
 */
export const TESTIMONIAL_QUERIES = {
  // List: minimal
  list: buildQuery({
    populate: [],
    fields: ['Title', 'Detail'],
    sort: ['createdAt:desc'],
    pagination: {
      page: 1,
      pageSize: 5,
    },
  }),

  // List dengan client words
  listWithReviews: buildQuery({
    populate: ['ClientWords'],
    fields: ['Title', 'Detail'],
    sort: ['createdAt:desc'],
    pagination: {
      page: 1,
      pageSize: 5,
    },
  }),

  paginatedList: (page = 1, pageSize = 5, includeReviews = false, isActiveOnly = true) =>
    buildQuery({
      populate: ['ClientPicture'],
      fields: ['ClientName', 'ClientCompany', ...(includeReviews ? ['ClientWords'] : [])],
      sort: ['createdAt:desc'],
      pagination: { page, pageSize },
      filters: {
        isActive: {
          $eq: isActiveOnly ? true : undefined, // Jika isActiveOnly true, filter isActive=true, jika false, tidak filter
        }
      }
    }),

  all: buildQuery({
    populate: ['ClientWords'],
    fields: ['Title', 'Detail'],
    sort: ['createdAt:desc'],
    pagination: { pageSize: 100 },
  }),

  complete: buildQuery({
    populate: ['ClientWords'],
    sort: ['createdAt:desc'],
  }),
};

/**
 * ============================================
 * CUSTOM QUERY BUILDER FUNCTIONS
 * ============================================
 */

/**
 * Build query dengan full customization
 */
export function buildCustomQuery(options: QueryOptions): string {
  return buildQuery(options);
}

/**
 * Build query untuk pagination
 */
export function buildPaginatedQuery(
  page: number = 1,
  pageSize: number = 10,
  additionalOptions?: QueryOptions
): string {
  return buildQuery({
    ...additionalOptions,
    pagination: { page, pageSize },
  });
}

/**
 * Build query untuk filter
 */
export function buildFilteredQuery(
  filters: Record<string, any>,
  additionalOptions?: QueryOptions
): string {
  return buildQuery({
    ...additionalOptions,
    filters,
  });
}

/**
 * Build query untuk sorting
 */
export function buildSortedQuery(
  sort: string | string[],
  additionalOptions?: QueryOptions
): string {
  return buildQuery({
    ...additionalOptions,
    sort,
  });
}
