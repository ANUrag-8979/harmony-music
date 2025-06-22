
import {ThreeDMarqueeDemo} from '@/components/3d-marquee'
import { ProductList } from "@/components/List-all-course-cards";
import Advantages from '@/components/advantages'
import StepsToEnroll from '@/components/stepsToEnroll';
export default function Home() {
  return (
       <div className="bg-black">
        {/* <SidebarDemo></SidebarDemo> */}
        
        <ThreeDMarqueeDemo/>
        {/* <AppleCardsCarouselDemo></AppleCardsCarouselDemo> */}
        {/* <ExpandableCardDemo></ExpandableCardDemo> */}
        <ProductList></ProductList>
        <Advantages></Advantages>
        <StepsToEnroll></StepsToEnroll>
       </div>
  );
}
