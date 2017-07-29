import { browser, by, element, until } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getPlayersInList() {
    return browser.wait(until.elementsLocated(by.css('[id^=link_]')));
  }
}
