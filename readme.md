# KeepThemCold

[![Build Status](https://travis-ci.org/sirgallifrey/keepthemcold.svg?branch=master)](https://travis-ci.org/sirgallifrey/keepthemcold)

## Table of Contents

1. [About this project](#about-this-project)
2. [Questions](#about-this-project)
    1. [About the device](#about-the-device)
    2. [About the data](#about-the-data)
3. [Running the project](#running-the-project)
    1. [Dependencies](#dependencies)
    2. [Setup](#setup)
    3. [Starting the project](#starting-the-project)
    4. [Running tests](#running-tests)
4. [Architecture](#architecture)
    1. [How it works](#how-it-works)
5. [Notes](#notes)
    1. [The truck infrastructure](#the-truck-infrastructure)
    2. [On the features of the app](#on-the-features-of-the-app)
    3. [The excuse for lowdb](#the-excuse-for-lowdb)
6. [What I regret](#what-i-regret)
7. [What I am proud of](#what-i-am-proud-of)
8. [What I would have done differently on version 2.0](#what-i-would-have-done-differently-on-version-2.0)

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

## Running the project

### Dependencies

To run the project:

- node.js 8 or greater
- npm 6

To run the end-to-end tests, you need one of:

- chrome
- firefox
- chromium

### Setup

Install dependencies

```shell
npm install
```

### Starting the project

To start the project run the command above:

```shell
npm start
```

The web-page will be available at 0.0.0.0:8080

### Running tests

The tests in this project are split into two commands, one for running unit and functional tests e other for running end-to-end.

To run unit and functional tests run the above command:

```shell
npm test
```

To run end-to-end tests run:

```shell
npm run e2e
```

Not that this command requires that you have chrome and firefox installed. There are other commands for convenience:

```shell
npm run e2e-chromium
npm run e2e-chrome
npm run e2e-firefox
```

## Architecture

### How it works

Te application is split in 2 parts: client and server.

The server is supposed to be the software who keeps the configuration about the containers and who runs on the infrastructure which receives the sensor data from the containers.
It is capable of changing label, id, min temperature and max temperature from each containers, and is also capable of adding or removing containers. There is a endpoint for sending sensor data which includes the actual data from the sensor and the temperature set on the container. Every time a container or sensor data changes, a broadcast is made over websockets.

The client is a web-page designed to run well on tablets and smartphones. It will subscribe to the websockets from the server and update accordingly. Despite having the capabilities on the server, the client can't add nor remove containers, though it should display more than six of them, if there is a broadcast from the server. The intent of the interface is to be intuitive and to be easy to use with a touchscreen.


## Notes

### The truck infrastructure

I have no real knowledge of which kind of hardware would be available on the truck to handle the sensors and to deliver this data do another device which would have the monitoring interface. I understand this "truck knowledge" is not really needed for this coding challenge, but never the less I tried to make assumptions that made a little sense. I believe it is reasonable to think a android tablet would be used, or at least an android embedded device on the console (which is becoming common in cars multimedia). A raspberryPi like computer handling the sensors is also not to crazy, but the wireless on the truck is a stretch. Some of my assumptions and excuses for these topics are intend to justify the use o Javascript and allow for a software where the real purpose is to assess my skills as a developer.

### On the features of the app

When I was first drawing some mocks of the interface thinking on what this application would became, I already had made some notes on how the app would show if the truck doors or some of the containers doors where open, and it would have controls for setting the containers temperature directly on the app, and of course, showing the temperature inside and outside of the truck. But then I realized that none of these things where requirements, and probably those features wouldn't even be possible since the document only talks about containers having a temperature set (probably meaning a knob on the container itself) and one sensor on each container. No sensors on doors, no sensors on the truck. Also, the requirements is quite clear on what should be done: Monitor temperature and alert if it is out of range.
In the real world I would suggest these ideas to the team and they could be considered, we could end up adding them as requirements depending on whats the customer wants. But the point is not to overdo the requirements simply because I think those are cool features.

### The excuse for lowdb

Lowdb is a cool little package, very versatile for storing and querying data. But is no good for production. It was used in this project only to mock a database. 

## What I regret

The first thing that I started to perceive as a regret was the idea to use websockets. As I was working I noticed that they were starting to get in my way making some things difficult, but that alone is not the problem, the catch is that they were of little impact on the final result when it come to added value for the client. But none the less it was very cool to see my three devices updating in sync.

The bigger picture of the websocket regret is "focusing on the wrong stuff". Now that I stopped working on the code I realize I could made some less features (some of which are barely noticeable) in exchange of other things like more architectural code showcasing a maintainable path for the software, or add more testing for example. At the end, choices were made and because of the time constraints** I had to stand up by my choices and deliver something instead of not delivering nothing at all.

The last I can remember right now was my choice of colors for the UI, the result is very beautiful (for my taste) but when I showed to my family they where like: "Cool, red is hot and blue is cold!". I should have seen that coming. :)

time constrains** - I'm not saying that I had little time, 3 days for a coding challenge was sufficient. But a deadline is a deadline. 

## What I am proud of

Despite the color mistake I'm proud of the user interface. I like the way it looks and I it left me with the feeling that I have achieved what I tried to do with it. Choosing colors, gradients and tuning the responsiveness was time well spent.

## What I would have done differently on version 2.0

On version 2.0 I would rethink the features and maybe have a real conversation with the client to understand what they really need.
I would consider removing the websockets or at least change the framework which is currently handling them on this project.
Typescript would be very tempting the the next version. I used to dislike typescript in the past with fears it would turn javascript into java. But it is possible to use typescript without going too crazy on oop, if we use it only for typing our data structures and functions it would already be an enormous advantage.

That's about it I guess.
Thanks very much for the opportunity to perform this coding challenge! I was a grate learning experience!
