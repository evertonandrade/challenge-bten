export class LocalStorageAuth {
  public getUser() {
    return JSON.parse(localStorage.getItem('bten.user'));
  }

  public saveLocalUserData(response: any) {
    this.saveUserToken(response.accessToken);
    this.saveUser(response.userToken);
  }

  public clearLocalUserData() {
    localStorage.removeItem('bten.token');
    localStorage.removeItem('bten.user');
  }

  public getUserToken() {
    return localStorage.getItem('bten.token');
  }

  public saveUserToken(token: string) {
    localStorage.setItem('bten.token', token);
  }

  public saveUser(user: any) {
    localStorage.setItem('bten.user', JSON.stringify(user));
  }
}
