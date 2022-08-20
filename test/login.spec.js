import login from '../src/view/login.js';
/* import logIn from '../src/firebase/auth.js'; */

jest.mock('../src/firebase/auth.js', () => ({
  loginGoogle: jest.fn(),
  logIn: jest.fn().mockImplementationOnce(() => Promise.resolve({
    displayName: 'Karla', email: 'karlavasquez817@gmail.com', uid: 'jdfhds4545248',
  })),
  sendEmailVerification: jest.fn(),
}));

const renderLogin = () => {
  window.location.href = '';
  document.body.innerHTML = '';
  document.body.appendChild(login.template());
  login.init();
};

describe('login', () => {
  it('should be a function', () => {
    expect(typeof login.template).toBe('function');
    expect(typeof login.init).toBe('function');
  });

  it('should check template', () => {
    expect(login.template()).toMatchSnapshot();
  });

  it('should render template', () => {
    renderLogin();
    const elem = document.querySelector('.form-email');
    expect(elem instanceof HTMLElement).toBeTruthy();
  });

  it('should close modal', () => {
    renderLogin();
    const btnModal = document.querySelector('.btn-modal');
    const modal = document.querySelector('.modal-container');
    btnModal.click();
    modal.classList.remove('show-modal');
    expect(modal instanceof HTMLElement).toBeTruthy();
  });

  it('should render template login', () => {
    renderLogin();

    const formEmail = document.querySelector('.form-email');
    formEmail.submit();
    const messageError = document.querySelector('.message-error');
    expect(messageError.classList.contains('show-message-error')).toBeTruthy();

    const inputEmail = document.querySelector('#inputEmail');
    const inputPassword = document.querySelector('#inputPassword');
    inputEmail.value = 'karlavasquez817@gmail.com';
    inputPassword.value = '1234567';
    formEmail.submit();
    expect(messageError.classList.contains('show-message-error')).toBeFalsy();
  });

  it('No deberia abrirse el modal si el email esta verificado', () => {
    renderLogin();

    const modalContainer = document.querySelector('.modal-container');
    const btnModal = document.querySelector('.btn-log-email');
    btnModal.click();
    expect(modalContainer.classList.contains('show-modal')).toBeFalsy();
  });
});
