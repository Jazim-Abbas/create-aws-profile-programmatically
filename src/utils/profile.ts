import os from "os";
import fs from "fs/promises";
import { AWSProfile } from "./types";

export class AwsProfile {
  private awsDir: string;

  constructor(private profile: AWSProfile) {
    this.awsDir = "";
  }

  async createProfile(): Promise<void> {
    await this.createAWSDirIfNotExists();

    if (await this.isProfileExists()) return;

    await this.createCredentialsProfile();
    await this.createConfigProfile();
  }

  private async createAWSDirIfNotExists(): Promise<void> {
    this.awsDir = os.homedir() + "/.aws";

    try {
      await fs.mkdir(this.awsDir);
    } catch (_) {}
  }

  private async isProfileExists(): Promise<boolean> {
    const credentialsFilePath = this.getAWSFilePath("credentials");
    const configFilePath = this.getAWSFilePath("config");
    let isFileExists = false;

    try {
      const credentialsContent = await fs.readFile(credentialsFilePath);
      const configContent = await fs.readFile(configFilePath);
      isFileExists = credentialsContent !== null && configContent !== null;
    } catch (_) {
      isFileExists = false;
    } finally {
      return isFileExists;
    }
  }

  private async createCredentialsProfile() {
    const { profileName, awsAccessKey, awsSecretKey } = this.profile;

    const credentialsFilePath = this.getAWSFilePath("credentials");
    const profileContent = `
    [${profileName}]
    aws_access_key_id=${awsAccessKey}
    aws_secret_access_key=${awsSecretKey}
    `;

    try {
      await fs.writeFile(credentialsFilePath, profileContent);
    } catch (err) {
      throw err;
    }
  }

  private async createConfigProfile() {
    const { profileName, region, output } = this.profile;

    const configFilePath = this.getAWSFilePath("config");
    const profileContent = `
    [${profileName}]
    region=${region}
    output=${output}
    `;

    try {
      await fs.writeFile(configFilePath, profileContent);
    } catch (err) {
      throw err;
    }
  }

  private getAWSFilePath(profileType: "credentials" | "config"): string {
    return this.awsDir + "/" + this.profile.profileName + "_" + profileType;
  }
}
