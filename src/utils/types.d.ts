export interface AWSCredentialProfile {
  profileName: string;
  awsSecretKey: string;
  awsAccessKey: string;
}

export interface AWSConfigProfile {
  profileName: string;
  region: string;
  output?: "json" | "text" | "";
}

export interface AWSProfile extends AWSCredentialProfile, AWSConfigProfile {}
