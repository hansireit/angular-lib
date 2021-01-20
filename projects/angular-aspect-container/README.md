# AngularAspectContainer

Used to create containers with a certain aspect ratio.

## Usage

### HTML-Template

```
<lib-ac-ratio
  id="full-aspect-wrapper"
  [targetRatio]="16 / 9"
  [sizingMode]="AcSizingMode.MATCH_PARENT"
  [horizontalAlignment]="AcHorizontalAlignment.CENTER"
  [verticalAlignment]="AcVerticalAlignment.CENTER"
>
  <div id="full-aspect-content"></div>
</lib-ac-ratio>
```

### Style

```
#full-aspect-wrapper
    width: 100vw
    height: 100vh
    background-color: #505050

#full-aspect-content
    min-width: 100%
    min-height: 100%
    background-color: blue
```
