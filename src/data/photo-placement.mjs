// PROPOSED placement of real project photos (owner review pending; visible design change).
// slug -> before/after style, pair ids, and whether to show the after-only gallery.
export const PHOTO_PLACEMENT = {
  portfolio: { variant: 'slider', pairs: '*', singles: true, title: 'Before & After: Real Bathroom Projects' },
  'bathroom-remodeling': { variant: 'stack', pairs: ['primary-bath-freestanding-tub', 'acrylic-tub-surround-grab-bar'], title: 'Recent Bathroom Remodels: Before & After' },
  'bathroom-remodeling/tub-to-shower-conversions': { variant: 'toggle', pairs: ['tub-to-walk-in-shower'], title: 'Tub-to-Shower Conversion: Before & After' },
  'bathroom-remodeling/walk-in-showers': { variant: 'slider', pairs: ['tub-to-walk-in-shower'], singles: true, title: 'Walk-In Showers We Have Built' },
};
