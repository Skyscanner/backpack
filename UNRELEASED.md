# Unreleased

**Fixed:**
- bpk-theming:
  - `style` prop is now correctly applied in `BpkThemeProvider` e.g:
    ```
    <BpkThemeProvider
      theme={{ color: colorWhite }}
      themeAttributes={['color']}
      style={{ /* user defined style goes here */ }}
    >
      <p>Lorem Ipsum</p>
    </BpkThemeProvider>,
    ```
