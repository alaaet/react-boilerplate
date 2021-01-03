import React, {useState} from 'react'
import ReactPageScroller from 'react-page-scroller';
import { FirstSection } from './fristSection';
import { SecondSection } from './secondSection';
import { ThirdSection } from './thirdSection';
import { FourthSection } from './fourthSection';
import { FifthSection } from './fifthSection';
function LandingPage({ history, match,location}) {
    const { path } = match;
    //console.log("LandingPage path:",path)
    const [currentPage, setCurrentPage] = useState(null);
    const handlePageChange = number => {
        setCurrentPage(number);
    };
    const handleBeforePageChange = number => {
        console.log(number);
      };
    return (
        <ReactPageScroller
          pageOnChange={handlePageChange}
          onBeforePageScroll={handleBeforePageChange}
            customPageNumber={currentPage}   
        >
            <FirstSection path={path} history={history} location={location}/>
            <SecondSection />
            <FourthSection />
            <FifthSection/>
        </ReactPageScroller>
    )
}

export default LandingPage
