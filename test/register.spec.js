import register from '../src/view/register';

jest.mock('../src/firebase/auth.js', () => ({
  loginGoogle: jest.fn(),
  createNewUser: jest.fn(),

}));

describe('login', () => {
  it('should be a function', () => {
    expect(typeof register.template).toBe('function');
    expect(typeof register.init).toBe('function');
  });

  it('should check template', () => {
    expect(register.template()).toMatchSnapshot();
  });

  it('should render template login', () => {
    document.body.appendChild(register.template());
    register.init();
    const formEmail = document.querySelector('.form-email');
    formEmail.submit();
    expect(formEmail instanceof HTMLElement).toBeTruthy();
  });
});
