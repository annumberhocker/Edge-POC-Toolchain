/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Create an Account
 * @param {org.example.bank.CreateAccount} createAccount - the CreateAccount transaction
 * @transaction
 */
async function createAccount(accountInfo) { // eslint-disable-line no-unused-vars
  // Incoming Data: accountId, balance, bank, customer

  const factory = getFactory();
  const namespace = 'org.example.bank';

  // Create a new Account Asset
  const account = factory.newResource(namespace, 'Account', accountInfo.accountId);

  // Create a new Bank relationship and assign to new Account Asset. Use incoming Bank id
  account.bank = factory.newRelationship(namespace, 'Bank', accountInfo.bank.getIdentifier());

  // Create a new customer relationship and assign to new Account Asset. Use incoming Customer id
  account.customer = factory.newRelationship(namespace, 'Customer', accountInfo.customer.getIdentifier());

  // Assign incoming balance to new Account Asset
  account.balance = accountInfo.balance;

  // save the new Account Asset in the Asset Registry
  const assetRegistry1 = await getAssetRegistry(account.getFullyQualifiedType());
  await assetRegistry1.add(account);
}

/**
* Access the Seller info
* @param {org.example.bank.DeleteAccount} deleteAccount
* @transaction
*/
async function deleteAccount (accountId) {
  // incomingData: accountId

  const namespace = 'org.example.bank';

  const assetRegistry = await getAssetRegistry(namespace + '.Account');
  var account = await assetRegistry.get(accountId);
  await assetRegistry.delete(account);
}

/**
* Transfer Funds
* @param {org.example.bank.TransferFunds} transferFunds
* @transaction
*/
async function transferFunds (incomingData) {
// incomingData: Account fromAccount; Account toAccount; Double amount

  const namespace = 'org.example.bank';
  const assetRegistry = await getAssetRegistry(namespace + '.Account');

  var account1 = await assetRegistry.get(incomingData.fromAccount.getIdentifier());
  var account2 = await assetRegistry.get(incomingData.toAccount.getIdentifier());

  if (account1.balance >= incomingData.amount) {
	account1.balance -= incomingData.amount;
	account2.balance += incomingData.amount;
	await assetRegistry.update(account1);
	await assetRegistry.update(account2);
  } // else throw an error
}

/**
* Functionality: Gets the account balance from the Registry; 
* @param {org.example.bank.GetBalance} getBalance
* @transaction
*/
async function getBalance (incomingData) {
  // incomingData: Account account; 
  
  const namespace = 'org.example.bank';

/*  outgoingData: 
  event getBalance {
  o String accountId
  o Double balance   
}
*/

  var event = getFactory().newEvent (namespace, "getBalance");
  event.accountId = incomingData.account.getIdentifier();
  event.balance = incomingData.account.balance;    

  //  this serves as a means for a participant to READ the order
  emit(event);
}

