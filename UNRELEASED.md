**Changed:**

- bpk-component-scrollable-calendar:
  - Migrated from heavy `react-virtualized` library to more lightweight library previously used
  - With this change you will see snapshot (if being used) fail as it will change from rendering as the following to previously fuller rendered components showing week days and numbers

  ```
  <div
      style="overflow: visible; height: 0px; width: 0px;"
    >
      <div
        aria-label="grid"
        aria-readonly="true"
        class="ReactVirtualized__Grid ReactVirtualized__List"
        role="grid"
        style="box-sizing: border-box; direction: ltr; height: 0px; position: relative; width: 0px; will-change: transform; overflow-x: hidden; overflow-y: auto;"
        tabindex="0"
      />
    </div>
    <div
      class="resize-triggers"
    >
      <div
        class="expand-trigger"
      >
        <div
          style="width: 1px; height: 1px;"
        />
      </div>
      <div
        class="contract-trigger"
      />
  </div>
  ```

**Fixed:**

- bpk-component-calendar:
  - Set default values for `minDate` and `maxDate` in `BpkCalendarGrid`