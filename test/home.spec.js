// import { getPost } from '../src/firebase/auth';
import home from '../src/view/home.js';

jest.mock('../src/firebase/auth.js', () => ({
  getPost: jest.fn(),
  observer: jest.fn().mockImplementationOnce((authCallBack) => authCallBack({ photoURL: null })),
  onGetPost: jest.fn(),
  savePost: jest.fn(),

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
    const elem = document.querySelector('.description-img');
    expect(elem instanceof HTMLElement).toBeTruthy();
  });

  it('should open modal publish post', () => {
    document.body.appendChild(home.template());
    home.init();

    const btnPublicarNav = document.querySelector('#btn-publicar-nav');
    btnPublicarNav.click();
  });

  it('should close modal publish post', () => {
    document.body.appendChild(home.template());
    home.init();

    const btnPublicarModal = document.querySelector('#btn-publicar');
    btnPublicarModal.click();
    /* expect(btnPublicarModal instanceof HTMLElement).toBe(true); */
  });

  // Testeando la función menuPublicación
  it('debería mostrar el boton img-tree-dots', () => {
    document.body.appendChild(home.template());
    home.init();
    const menusDesplegables = document.querySelectorAll('.img-tree-dots');
    expect(menusDesplegables instanceof HTMLElement).toBeTruthy();
  });
});
