import { OCMSRemake2Page } from './app.po';

describe('ocmsremake2 App', () => {
  let page: OCMSRemake2Page;

  beforeEach(() => {
    page = new OCMSRemake2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
