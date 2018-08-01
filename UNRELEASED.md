# Unreleased

**New:**
 - bpk-component-scrollable-calendar:
   - implemented BpkScrollableCalendarDate, built on top of BpkCalendarDate

**Changed:** 
 - bpk-component-calendar:
   - exposed propTypes as BpkCalendarPropTypes for reuse in BpkScrollableCalendarDate

**Breaking:**
 - bpk-component-infinite-scroll:
   - Added DataSource class. Can be used to trigger updates when the data for infinite scroll has changed.
   - `onItemsFetch` prop replaced in favour of DataSource.

