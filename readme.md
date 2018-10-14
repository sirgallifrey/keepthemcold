# KeepThemCold

[![Build Status](https://travis-ci.org/sirgallifrey/keepthemcold.svg?branch=master)](https://travis-ci.org/sirgallifrey/keepthemcold)

## Table of Contents

1. [About this project](#about-this-project)
2. [Questions](#about-this-project)
    1. [About the device](#about-the-device)
    2. [About the data](#about-the-data)
3. [Notes](#notes)
    1. [The truck infrastructure](#the-truck-infrastructure)
    2. [On the features of the app](#on-the-features-of-the-app)

## About this project

KeepThemCold is an application to monitor the temperature of beer containers in a truck, alerting the driver if any of the containers fall outside of the temperature range.

This project is a do-at-home code challenge, for that reason no contribution will be accepted and once delivered it won't change. But feel free to fork, change and learn from it. Just don't use it if you ever have to do this same code challenge. :)

## Questions

As instructed I'll be documenting the questions I would ask if this was a real life project.

### About the device

**Q:** The requirements say that the driver will be alerted while driving, this raises the question of where this application will run and what are the capabilities of this device. Is it a full-fledged computer running windows or Linux? Will it be an android phone or tablet? Or perhaps it is a embedded computer running *windows embedded* or some Unix like system?

**A:** Pragma Brewery is a small company and there are not much resources for custom hardware or embedded equipment. The driver will have a 8" to 10" android tablet secured on the dashboard. 

---

**Q:** What can we expect in terms of CPU and RAM available? And on which OS? Will be there a browser or the app must be native?

**A:** You can expect to run on an mid-range android tablet with a 8" to 10" screen running android 8.0 or greater, but circumstances might change so it should also run on a normal laptop computer running Linux/OSX/windows. The truck has a wireless local network and a computer which handles the sensor data. Is possible to use this computer to run a server for our application.

---

**Q:** How will the driver interact with the application? Will he have a mouse and keyboard, or will use only a touch screen?

**A:** Mouse and keyboard don't make much sense on a truck especially considering this application which doesn't require data entry and complex operation. A touch screen is sufficient, but not only that, it is the best choice for the use case of the truck driver.

### About the data

**Q:** How the data will reach our application? Or will our application fetch the data from somewhere? Will the application receive raw sensor data?

**A:** Raw sensor data will be given to another software which will then give more comprehensive data to our application through web sockets.

## Notes

### The truck infrastructure

I have no real knowledge of which kind of hardware would be available on the truck to handle the sensors and to deliver this data do another device which would have the monitoring interface. I understand this "truck knowledge" is not really needed for this coding challenge, but never the less I tried to make assumptions that made a little sense. I believe it is reasonable to think a android tablet would be used, or at least an android embedded device on the console (which is becoming common in cars multimedia). A raspberryPi like computer handling the sensors is also not to crazy, but the wireless on the truck is a stretch. Some of my assumptions and excuses for these topics are intend to justify the use o Javascript and allow for a software where the real purpose is to assess my skills as a developer.

### On the features of the app

When I was first drawing some mocks of the interface thinking on what this application would became, I already had made some notes on how the app would show if the truck doors or some of the containers doors where open, and it would have controls for setting the containers temperature directly on the app, and of course, showing the temperature inside and outside of the truck. But then I realized that none of these things where requirements, and probably those features wouldn't even be possible since the document only talks about containers having a temperature set (probably meaning a knob on the container itself) and one sensor on each container. No sensors on doors, no sensors on the truck. Also, the requirements is quite clear on what should be done: Monitor temperature and alert if it is out of range.
In the real world I would suggest these ideas to the team and they could be considered, we could end up adding them as requirements depending on whats the customer wants. But the point is not to overdo the requirements simply because I think those are cool features.
