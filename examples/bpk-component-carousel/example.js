import BpkCarousel from '../../packages/bpk-component-carousel'

const DemoImages = () => (
    <img src="https://d2xf5gjipzd8cd.cloudfront.net/available/949043373/949043373_343x132.jpg" alt='' />
)

const imagesList = [<DemoImages />,<img src='https://d2xf5gjipzd8cd.cloudfront.net/available/758391025/758391025_343x132.jpg' alt='' />, <DemoImages />, <DemoImages />, <DemoImages />, <DemoImages />]


const DefaultExample = () => (
  <BpkCarousel images={imagesList} initialImageIndex={1}/>
);

export default DefaultExample
