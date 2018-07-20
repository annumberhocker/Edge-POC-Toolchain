import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.example.bank{
   export class SampleParticipant extends Participant {
      participantId: string;
      name: string;
   }
   export class Bank extends SampleParticipant {
   }
   export class Customer extends SampleParticipant {
   }
   export class Account extends Asset {
      accountId: string;
      balance: number;
      customer: Customer;
      bank: Bank;
   }
   export class CreateAccount extends Transaction {
      accountId: string;
      balance: number;
      bank: Bank;
      customer: Customer;
   }
   export class DeleteAccount extends Transaction {
      accountId: string;
   }
   export class TransferFunds extends Transaction {
      fromAccount: Account;
      toAccount: Account;
      amount: number;
   }
   export class GetBalance extends Transaction {
      account: Account;
   }
   export class e_GetBalance extends Event {
      accountId: string;
      balance: number;
   }
// }
