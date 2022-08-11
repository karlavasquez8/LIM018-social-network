// import { getPost } from '../src/firebase/auth';
import home from '../src/view/home.js';

jest.mock('../src/firebase/auth.js', () => ({
  getPost: jest.fn(),
  observer: jest.fn().mockImplementationOnce((authCallBack) => authCallBack({ photoURL: null })),
  onGetPost: jest.fn(),
}));

describe('home', () => {
  it('should be a function', () => {
    expect(typeof home.template).toBe('function');
    expect(typeof home.init).toBe('function');
  });

  it('should check template', () => {
    expect(home.template()).toMatchSnapshot();
  });

  it('should render template home', () => {
    document.body.appendChild(home.template());
    home.init();
  });

  it('should open modal publish post', () => {
    document.body.appendChild(home.template());
    home.init();

    const btnPublish = document.querySelector('#btn-publicar-nav');
    btnPublish.click();
  });
});
// wt
