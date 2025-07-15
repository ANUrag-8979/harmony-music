
import { ThreeDMarqueeDemo } from '@/components/3d-marquee'
import { ProductList } from "@/components/List-all-course-cards";
import Advantages from '@/components/advantages'
import StepsToEnroll from '@/components/stepsToEnroll';
import { StickyBanner } from "@/components/ui/sticky-banner";
export default function Home() {
  return (
    <div className="bg-black">
       <StickyBanner className="z-100 bg-gradient-to-b from-blue-500 to-blue-600"> the website is under construction</StickyBanner>
      {/* <SidebarDemo></SidebarDemo> */}
      <ThreeDMarqueeDemo />
      {/* <AppleCardsCarouselDemo></AppleCardsCarouselDemo> */}
      {/* <ExpandableCardDemo></ExpandableCardDemo> */}
      <ProductList></ProductList>
      <Advantages></Advantages>
      <StepsToEnroll></StepsToEnroll>
       {/* </StickyBanner> */}
    </div>
  );
}
