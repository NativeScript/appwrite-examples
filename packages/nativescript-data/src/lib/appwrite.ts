import { Utils } from '@nativescript/core';
import { Client, Account, Databases, ID } from '@nativescript/appwrite';

/**
 * Set your own database ID and collection ID
 */
const DB_ID = '682e754400251b9879f8';
const COLLECTION_ID = '682e755b000ff5fd50f1';

export type MessageType = {
  createdAt: string;
  message: string;
};

export class AppwriteData {
  client: Client;
  account: Account;
  database: Databases;
  dataUpdates: (data: MessageType[]) => void;

  constructor() {
    this.client = new Client()
      .setEndpoint(process.env.APP_WRITE_ENDPOINT)
      .setProject(process.env.APP_WRITE_PROJECT_ID)
      .setSelfSigned(true);
    this.account = new Account(this.client);
    this.database = new Databases(this.client);
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await this.account.createEmailPasswordSession(
        email,
        password
      );
      console.log('Logged in:', response);
      this.database
        .listDocuments(DB_ID, COLLECTION_ID)
        .then((response: any) => {
          console.log('Documents:', response);
          if (this.dataUpdates) {
            this.dataUpdates(
              response.map((doc) => {
                return {
                  createdAt: doc.createdAt,
                  message: doc.data.message,
                };
              })
            );
          }
        });
      return true;
    } catch (error) {
      console.error('Error logging in:', error);
    }
    return false;
  }

  async createDocument(data: any) {
    const result = await this.database.createDocument(
      DB_ID,
      COLLECTION_ID,
      crypto.randomUUID(),
      data
    );
    console.log('Document created:', result);
    if (this.dataUpdates) {
      const data = Utils.dataDeserialize(result.data);
      this.dataUpdates([
        {
          message: data.message,
          createdAt: result.createdAt,
        },
      ]);
    }
    return result;
  }
}
