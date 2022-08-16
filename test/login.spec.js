import login from '../src/view/login.js';

jest.mock('../src/firebase/auth.js', () => ({
  loginGoogle: jest.fn(),
}));

describe('login', () => {
  it('should be a function', () => {
    expect(typeof login.template).toBe('function');
    expect(typeof login.init).toBe('function');
  });

  it('should check template', () => {
    expect(login.template()).toMatchSnapshot();
  });

  it('should render template login', () => {
    document.body.appendChild(login.template());
    login.init();
    const elem = document.querySelector('.form-email');
    expect(elem instanceof HTMLElement).toBeTruthy();
  });

  it('should close modal', () => {
    document.body.appendChild(login.template());
    login.init();
    const btnModal = document.querySelector('.btn-modal');
    const modal = document.querySelector('.modal-container');
    btnModal.click();
    modal.classList.remove('show-modal');
    expect(modal instanceof HTMLElement).toBeTruthy();
  });

  it('El usuario debería entrar a la apliacación', () => {
    document.body.appendChild(login.template());
    login.init();
    const formEmail = document.querySelector('.form-email');
    formEmail.submit();
  });
});
