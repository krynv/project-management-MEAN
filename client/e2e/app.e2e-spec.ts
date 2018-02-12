import { AppPage } from './app.po';

describe('Main Page Test', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the home screen on first launch', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ManageR');
  });
});
