import React, { useState } from 'react';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel'
import CssBaseline from '@material-ui/core/CssBaseline';
import { green400, green600 } from '@material-ui/core/colors/green';
import { blue400, blue600 } from '@material-ui/core/colors/blue';
import { red400, red600 } from '@material-ui/core/colors/red';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import slide1 from './slide1.png'
import slide2 from './slide2.png'
import slide3 from './slide3.png'

const OnboardingComponent = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [handleOpen, setHandleOpen] = useState(true);
  return (
    <div>
      <CssBaseline />
      <AutoRotatingCarousel
        label="Get started"
        open={handleOpen}
        onClose={() => setHandleOpen(false)}
        onStart={() => setHandleOpen(false)}
        mobile={matches}
      >
        <Slide
          media={<img src={slide1} />}
          mediaBackgroundStyle={theme.palette.secondary}
          contentstyle={{ backgroundColor: red600 }}
          title="'rePark' helps you find parking nearby"
          subtitle="Fast and easy."
        />
        <Slide
          media={<img src={slide2} />}
          mediaBackgroundStyle={{ backgroundColor: blue400 }}
          contentstyle={{ backgroundColor: blue600 }}
          title="Your time is valuable"
          subtitle="'rePark' is the solution for you to save time looking for parking!"
        />
        <Slide
          media={<img src={slide3} />}
          mediaBackgroundStyle={{ backgroundColor: green400 }}
          contentstyle={{ backgroundColor: green600 }}
          title="Sign up Now!"
          subtitle="And you will see a map of all available parking spots near you."
        />
      </AutoRotatingCarousel>
    </div >
  )
};

export default OnboardingComponent;

