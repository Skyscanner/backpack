# bpk-component-nudger-row

> Backpack nudger row component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import BpkNudgerRow from '@skyscanner/backpack-web/bpk-component-nudger-row';

export default () => (
    <BpkNudgerRow
        nudgerId="nudger"
        title="title"
        subtitle="subtitle"
        min={1}
        max={9}
        value={2}
        onChange={() => null}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
    />
)
```

## Props

| Property            	| PropType 	| Required 	| Default Value 	|
|---------------------- |----------	|----------	|------------------ |
| nudgerId            	| string   	| true     	| -             	|
| value               	| number   	| true     	| -             	|
| min                 	| number   	| true     	| -             	|
| max                 	| number   	| true     	| -             	|
| decreaseButtonLabel 	| string   	| true     	| -             	|
| increaseButtonLabel 	| string   	| true     	| -             	|
| onChange            	| function 	| true     	| -             	|
| title               	| string   	| true     	| -             	|
| subtitle            	| string   	| false    	| undefined     	|
| className           	| string   	| false    	| null          	|


### Prop Details

#### title & subtitle

Title and subtitle - The title and subtitle together make up the label for the nudger. This label will be read aloud as a whole by screen readers.

#### decreaseButtonLabel

Decrease button label - This is the label that will be read out when screen reader users tab to the decrease button. Make sure you use a descriptive label like "Decrease number of adults".

#### increaseButtonLabel

Increase button label - This is the label that will be read out when screen reader users tab to the increase button. Make sure you use a descriptive label like "Increase number of adults"
