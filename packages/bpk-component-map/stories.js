import {
  SimpleExample,
  DragDisabledAndHiddenControlsExample,
  GreddyGestureHandlingExample,
  WithOnZoomAndOnRegionChangeExample,
  WithOnTilesLoadedExample,
  WithBoundingBoxExample,
  WithAMarkerExample,
  WithIconMarkersExample,
  WithPriceMarkersExample,
} from './examples';

export default {
  title: 'bpk-component-map',
};

export const Simple = SimpleExample;
export const DragDisabledAndControlsHidden =
  DragDisabledAndHiddenControlsExample;

DragDisabledAndControlsHidden.story = {
  name: 'Drag disabled and controls hidden',
};

export const GreedyGestureHandling = GreddyGestureHandlingExample;

GreedyGestureHandling.story = {
  name: 'Greedy gesture handling',
};

export const WithOnZoomAndOnRegionChangeCallbacks =
  WithOnZoomAndOnRegionChangeExample;

WithOnZoomAndOnRegionChangeCallbacks.story = {
  name: 'With onZoom and onRegionChange callbacks',
};

export const WithOnTilesLoaded = WithOnTilesLoadedExample;

WithOnTilesLoaded.story = {
  name: 'With onTilesLoaded',
};

export const WithABoundingBox = WithBoundingBoxExample;

WithABoundingBox.story = {
  name: 'With a bounding box',
};

export const WithAMarker = WithAMarkerExample;

WithAMarker.story = {
  name: 'With a marker',
};

export const IconMarkers = WithIconMarkersExample;

IconMarkers.story = {
  name: 'Icon markers',
};

export const PriceMarkers = WithPriceMarkersExample;

PriceMarkers.story = {
  name: 'Price markers',
};
