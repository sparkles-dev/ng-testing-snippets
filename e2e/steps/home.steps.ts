import { expect } from 'chai';
import { defineSupportCode } from 'cucumber';
import { AppPage } from './app.po';

defineSupportCode(({Given, When, Then, Before}) => {
  let app: AppPage;

  Before(() => {
    app = new AppPage();
  });

  When('I open the page',
    () => app.navigateTo());

  Then('I see a player list with {int} persons',
    (count: number) => app.getPlayersInList()
      .then(players => expect(players).to.have.lengthOf(count)));

});
