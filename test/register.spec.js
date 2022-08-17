import register from '../src/view/register';

jest.mock('../src/firebase/auth.js', () => ({
  loginGoogle: jest.fn(),
  createNewUser: jest.fn().mockImplementationOnce(() => Promise.resolve({ uid: '123-123', userName: 'Waldo' })),
  sendEmailVerification: jest.fn(),
  updateUser: jest.fn(),
}));

const renderRegister = () => {
  window.location.href = '#/register';
  document.body.innerHTML = '';
  document.body.appendChild(register.template());
  register.init();
};

describe('login', () => {
  it('should be a function', () => {
    expect(typeof register.template).toBe('function');
    expect(typeof register.init).toBe('function');
  });

  it('should check template', () => {
    expect(register.template()).toMatchSnapshot();
  });

  it('should render template login', () => {
    renderRegister();

    const formEmail = document.querySelector('.form-email');
    formEmail.submit();
    const messageError = document.querySelector('.message-error');
    expect(messageError.classList.contains('show-message-error')).toBeTruthy();
    const inputName = document.querySelector('#inputName');
    const inputEmail = document.querySelector('#inputEmail');
    const inputPassword = document.querySelector('#inputPassword');
    inputName.value = 'karla';
    inputEmail.value = 'karlavasquez817@gmail.com';
    inputPassword.value = '1234567';
    formEmail.submit();
    expect(messageError.classList.contains('show-message-error')).toBeFalsy();
  });

  // it('should remove message error', () => {
  //   renderRegister();

  //   const formEmail = document.querySelector('.form-email');
  //   const newFormData = new FormData();
  //   newFormData.set('name', 'karla');
  //   newFormData.set('email', 'karlavasquez817@gmail.com');
  //   newFormData.set('password', '1234567');
  //   formEmail.submit();
  //   const messageError = document.querySelector('.message-error');
  //   expect(messageError.classList.contains('show-message-error')).toBeTruthy();
  // });
});
