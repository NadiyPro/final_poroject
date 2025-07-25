import 'react';
import authPasswordValidator from '../../validator/authPassword.validator';

describe('authPasswordValidator', () => {

  test('valid data', () => {
    const result = authPasswordValidator.validate({
      password: 'Password111!',
      confirm_password: 'Password111!'
    });

    expect(result.error).toBeUndefined();
  })

  test('valid limit password and confirm_password', () => {
    const result = authPasswordValidator.validate({
      password: 'Pas4567!',
      confirm_password: 'Pas4567!'
    });

    expect(result.error).toBeUndefined();
  })

  test('no valid password and confirm_password empty', () => {
    const result = authPasswordValidator.validate({
      password: '',
      confirm_password: ''
    });

    expect(result.error?.details[0].message).toBe('Поле має бути заповнене');
  })


  test('no valid password', () => {
    const result = authPasswordValidator.validate({
      password: 'password111',
      confirm_password: 'Password111!'
    });

    expect(result.error?.details[0].message).toBe('Пароль повинен містити принаймні одну літеру, одну цифру та один спеціальний символ, і бути не менше 8 символів');
  })

  test('no valid confirm_password', () => {
    const result = authPasswordValidator.validate({
      password: 'Password111',
      confirm_password: 'password111!'
    });

    expect(result.error?.details[0].message).toBe('Пароль повинен містити принаймні одну літеру, одну цифру та один спеціальний символ, і бути не менше 8 символів');
  })

})

export {};