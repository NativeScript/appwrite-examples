import { Client, Account, Databases } from '@nativescript/appwrite';

export class AppwriteData {
  client: Client;
  account: Account;
  database: Databases;

  constructor() {
    this.client = new Client()
      .setEndpoint(process.env.APP_WRITE_ENDPOINT)
      .setProject(process.env.APP_WRITE_PROJECT_ID)
      .setSelfSigned(true);
    this.account = new Account(this.client);
    this.database = new Databases(this.client);
  }

  demoLogin() {
    this.login('test@example.com', 'password');
  }

  async login(email: string, password: string) {
    try {
      const response = await this.account.createEmailPasswordSession(email, password);
      console.log('Logged in:', response);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  async createDocument(data: any) {
    const result = await this.database.createDocument('682e754400251b9879f8', '682e755b000ff5fd50f1', crypto.randomUUID(), data);
    console.log('Document created:', result);
  }
}