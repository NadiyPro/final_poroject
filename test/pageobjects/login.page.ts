import { $ } from '@wdio/globals'
import Page from './page';

class LoginPage extends Page {

    public get inputEmail () {
        return $('#email');
    }

    public get inputPassword () {
        return $('#password');
    }

    public get btnSubmit () {
        return $('button[type="submit"]');
    }

    public async login (email: string, password: string) {
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    public open () {
        return super.open('login');
    }
}

export default new LoginPage();
