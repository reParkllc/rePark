import React from 'react';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel'
import CssBaseline from '@material-ui/core/CssBaseline';
import { green400, green600, blue400, blue600, red400, red600 } from '@material-ui/core/colors'


const RtOnboard = props => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    console.log('MATCHES',matches);
   return (
       <div>
           <CssBaseline/>
           <Link to={'./LogInComponent'}>
               <AutoRotatingCarousel
                   label="Get started"
                   open
                   mobile = {matches}
               >
                   <Slide
                       media={<img src="http://www.icons101.com/icon_png/size_256/id_79394/youtube.png" />}
                       mediaBackgroundStyle={theme.palette.secondary}
                       contentStyle={{ backgroundColor: red600 }}
                       title="This is a very cool feature"
                       subtitle="Just using this will blow your mind."
                   />
                   <Slide
                       media={<img src="http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png" />}
                       mediaBackgroundStyle={{ backgroundColor: blue400 }}
                       contentStyle={{ backgroundColor: blue600 }}
                       title="Ever wanted to be popular?"
                       subtitle="Well just mix two colors and your are good to go!"
                   />
                   <Slide
                       media={<img src="http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png" />}
                       mediaBackgroundStyle={{ backgroundColor: green400 }}
                       contentStyle={{ backgroundColor: green600 }}
                       title="May the force be with you"
                       subtitle="The Force is a metaphysical and ubiquitous power in the Star Wars universe."
                   />
               </AutoRotatingCarousel>
           </Link>
       </div>
   )
};

export default RtOnboard;
