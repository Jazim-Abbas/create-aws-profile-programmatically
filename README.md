# Create AWS Profile Programatically

After installing this package, you can import the AWSProfile in your code like below:

```js
import { AwsProfile } from "aws-profile";
```

AWSProfile constuctor accepts one argument i.e. an object

```js
{
    profileName: string,
    awsSecretKey: string,
    awsAccessKey: string,
    region: string,
    output?: "json" | "text"
}
```

After creating an object of AWSProfile, you just need to call its one method i.e. createProfile.

```js
const awsProfile = new AWSProfile({
  profileName: "alex_user",
  awsSecretKey: "wJalrXUtnFEMI/K7MDENbPxRfiCYEXAMPLEKEY",
  awsAccessKey: "AKIAIOSFODNN7EXAMPLE",
  region: "us-east-1",
  output: "json",
});

await awsProfile.createProfile();
```

### Note:

- createProfile method will automatically create .aws directory in the root of OS if it doesn't exist, so you don't need to worry about to creating the directory.
- if the profile name already exists, it will not create new profile or update that profile.
