export class UserModel {
  constructor(
    id,
    email,
    password,
    firstName,
    lastName,
    btcAddress,
    btcWalletName
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.btcAddress = btcAddress;
    this.btcWalletName = btcWalletName;
  }
}
