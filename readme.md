# KeepThemCold

## Table of Contents

1. [About this project](#about-this-project)
2. [Questions](#about-this-project)
  1. [About the device](#about-the-device)
  2. [About the data](#about-the-data)

## About this project

KeepThemCold is an application to monitor the temperature of beer containers in a truck, alerting the driver if any of the containers fall outside of the temperature range.

This project is a do-at-home code challenge, for that reason no contribution will be accepted and once delivered it won't change. But feel free to fork, change and learn from it. Just don't use it if you ever have to do this same code challenge. :)

## Questions

As instructed I'll be documenting the questions I would ask if this was a real life project.

### About the device

**Q:** The requirements say that the driver will be alerted while driving, this raises the question of where this application will run and what are the cpabilities of this device. Is it a full flegd computer running windows or linux? Will it be an android phone or tablet? Or prehaps it is a embeded computer running embeded windows or some unix like system?

---

**Q:** What can we expect in terms of CPU and RAM avaliable? Will be there a browser avaliable or the app must be native?

---

**Q:** How will the driver interact with the application? Will he have a mouse and keyboard, or will use only a touch screen?

**A:** Mouse and keyboard don't make much sense on a truck especially considering this application which doesn't require data entry and complex operation. A touch screen is sufficient, but not only that, it is the best choice for the use case of the truck driver.



### About the data

**Q:** How the data will reach our application? Or will our application fetch the data from somewhere? Will the application receive raw sensor data?

