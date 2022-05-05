**Breaking:**

bpk-component-map:
- Migrated map dependency to `@react-google-maps/api`. This requires a minimum React version of 16.8.0 as it provides more new features available through hooks.
- `withGoogleMapsScript` provides better loading capabilities, no longer have to worry about the problem of multiple downloads of google map script when loading multiple map components.
  - Now `withGoogleMapsScript` accept `googleMapsApiKey` directly and no longer accept `googleMapUrl` to load map.
  - Added new (OPTIONAL) `preventGoogleFontsLoading` and `libraries` properties in `withGoogleMapsScript` to allow making changes to Google Maps loading configuration.
- `BpkMap` properties changed:
  - Now `BpkMap` accept `className` and no longer accept `containerElement` or `mapElement` property to custom google map container style.
  - Added `mapOptionStyles` to better support google map style customization.
  - Changed default option `clickableIcons` to false, which means the information box won't pop up when icons on map are clicked.
