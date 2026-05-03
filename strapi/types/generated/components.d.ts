import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentBlockContactWa extends Struct.ComponentSchema {
  collectionName: 'components_component_block_contact_was';
  info: {
    displayName: 'Contact WA';
    icon: 'phone';
  };
  attributes: {
    defaultMessage: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Permisi..., saya ingin bertanya mengenai....'>;
    Name: Schema.Attribute.String & Schema.Attribute.Required;
    Phone: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::strapi-phone-validator-5.phone',
        {
          country: 'id';
        }
      >;
  };
}

export interface ComponentBlockFeatureCard extends Struct.ComponentSchema {
  collectionName: 'components_component_block_feature_cards';
  info: {
    displayName: 'Feature Card (Capabilities)';
    icon: 'layer';
  };
  attributes: {
    Detail: Schema.Attribute.Text;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
    ValuePoints: Schema.Attribute.Component<
      'component-block.item-with-icons',
      true
    > &
      Schema.Attribute.Required;
  };
}

export interface ComponentBlockFeatureCardNonData
  extends Struct.ComponentSchema {
  collectionName: 'components_component_block_feature_card_non_data_s';
  info: {
    displayName: 'Feature Card (Testimonials)';
    icon: 'layer';
  };
  attributes: {
    Detail: Schema.Attribute.Text;
    DisplayedTestimonials: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      >;
    Randomize: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ComponentBlockItemWithIcons extends Struct.ComponentSchema {
  collectionName: 'components_component_block_item_with_icons';
  info: {
    displayName: 'Item with Icons';
    icon: 'layer';
  };
  attributes: {
    Description: Schema.Attribute.Text & Schema.Attribute.Required;
    IconName: Schema.Attribute.Enumeration<
      [
        'Award',
        'Briefcase',
        'CheckCircle',
        'Droplets',
        'Factory',
        'Globe',
        'Handshake',
        'HardHat',
        'Leaf',
        'Lightbulb',
        'Recycle',
        'Settings',
        'Shield',
        'Target',
        'Users',
        'Zap',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Award'>;
    Title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface ComponentBlockLocationBlock extends Struct.ComponentSchema {
  collectionName: 'components_component_block_location_blocks';
  info: {
    displayName: 'Location';
    icon: 'pinMap';
  };
  attributes: {
    City: Schema.Attribute.String;
    Province: Schema.Attribute.Enumeration<
      [
        'Aceh',
        'Bali',
        'Banten',
        'Bengkulu',
        'DI Yogyakarta',
        'DKI Jakarta',
        'Gorontalo',
        'Jambi',
        'Jawa Barat',
        'Jawa Tengah',
        'Jawa Timur',
        'Kalimantan Barat',
        'Kalimantan Selatan',
        'Kalimantan Tengah',
        'Kalimantan Timur',
        'Kalimantan Utara',
        'Kepulauan Bangka Belitung',
        'Kepulauan Riau',
        'Lampung',
        'Maluku',
        'Maluku Utara',
        'Nusa Tenggara Barat',
        'Nusa Tenggara Timur',
        'Papua',
        'Papua Barat',
        'Papua Barat Daya',
        'Papua Pegunungan',
        'Papua Selatan',
        'Papua Tengah',
        'Riau',
        'Sulawesi Barat',
        'Sulawesi Selatan',
        'Sulawesi Tengah',
        'Sulawesi Tenggara',
        'Sulawesi Utara',
        'Sumatera Barat',
        'Sumatera Selatan',
        'Sumatera Utara',
      ]
    > &
      Schema.Attribute.Required;
  };
}

export interface ComponentBlockMultipleValue extends Struct.ComponentSchema {
  collectionName: 'components_component_block_multiple_values';
  info: {
    displayName: 'Multiple Value';
    icon: 'bulletList';
  };
  attributes: {
    Detail: Schema.Attribute.Text & Schema.Attribute.Required;
    Value: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface ComponentBlockOperatingHours extends Struct.ComponentSchema {
  collectionName: 'components_component_block_operating_hours';
  info: {
    displayName: 'Operating Hours';
  };
  attributes: {
    Holidays: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::advanced-fields.input',
        {
          placeholder: 'Hari Libur Nasional: Tutup';
        }
      >;
    WorkingDays: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::advanced-fields.input',
        {
          placeholder: 'Hari Kerja: 8:00 AM - 6:00 PM';
        }
      >;
  };
}

export interface ComponentBlockProjectPeriod extends Struct.ComponentSchema {
  collectionName: 'components_component_block_project_periods';
  info: {
    displayName: 'Project Period';
    icon: 'clock';
  };
  attributes: {
    endDate: Schema.Attribute.Date;
    isCurrentProject: Schema.Attribute.Boolean;
    startDate: Schema.Attribute.Date & Schema.Attribute.Required;
  };
}

export interface ComponentBlockSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_component_block_social_links';
  info: {
    displayName: 'Social Link';
    icon: 'globe';
  };
  attributes: {
    Platform: Schema.Attribute.Enumeration<
      ['YouTube', 'TikTok', 'Facebook', 'Instagram']
    > &
      Schema.Attribute.Required;
    Url: Schema.Attribute.String & Schema.Attribute.Required;
    Username: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ComponentBlockVisionMision extends Struct.ComponentSchema {
  collectionName: 'components_component_block_vision_misions';
  info: {
    displayName: 'VisionMision';
    icon: 'key';
  };
  attributes: {
    Mission: Schema.Attribute.Component<'component-block.multiple-value', true>;
    Vision: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'component-block.contact-wa': ComponentBlockContactWa;
      'component-block.feature-card': ComponentBlockFeatureCard;
      'component-block.feature-card-non-data': ComponentBlockFeatureCardNonData;
      'component-block.item-with-icons': ComponentBlockItemWithIcons;
      'component-block.location-block': ComponentBlockLocationBlock;
      'component-block.multiple-value': ComponentBlockMultipleValue;
      'component-block.operating-hours': ComponentBlockOperatingHours;
      'component-block.project-period': ComponentBlockProjectPeriod;
      'component-block.social-link': ComponentBlockSocialLink;
      'component-block.vision-mision': ComponentBlockVisionMision;
    }
  }
}
