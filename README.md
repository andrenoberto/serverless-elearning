# Serverless e-Learning
[![Codacy Badge][codacy-image]][codacy-url]
[![Build Status][travis-image]][travis-url]
[![MIT license][license-image]][license-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
## Description
API-First Headless virtual learning environment built on top of AWS serverless architecture.
## Contents
<img align="right" width="400" src="https://s3.amazonaws.com/github-repositories-images/serverless-elearning-getting-started.png" />

*   [Supported Providers](#supported-providers)
*   [Services Used](#services-used)
*   [Quick Start](#quick-start)
*   [Contributing](#contributing)
*   [Licensing](#licensing)
## <a name="supported-providers"></a>Supported Providers
*   AWS
## <a name="services-used"></a>Services Used
*   API Gateway
*   Cognito
*   CloudFormation
*   DynamoDB
*   Lambda
*   SES
## <a name="quick-start"></a>Quick Start
Feel free to use npm or yarn to run all scripts provided in this source code.

1.  **Install via npm or yarn:**

  Using npm:
```bash
npm install
```
  Using yarn:
```bash
yarn
```

2.  **Run TSLint:**
```bash
yarn test
```

3.  **Offline development server:**
```bash
yarn start-offline
```

4.  **Deploy your code to AWS:**
```bash
yarn deploy
```
## <a name="contributing"></a>Contributing
Contributors are pretty welcome!

Check out our issues or feel free to make PR's and discuss about new features.
## <a name="licensing"></a>Licensing
Serverless e-Learning is licensed under the [MIT License](./LICENSE).

All files located in the node_modules and external directories are externally maintained libraries used by this software which have their own licenses; we recommend you read them, as their terms may differ from the terms in the MIT License.

[codacy-image]: https://api.codacy.com/project/badge/Grade/62e150176b514626b74788368eae1671
[codacy-url]: https://app.codacy.com/app/andrenoberto/serverless-elearning?utm_source=github.com&utm_medium=referral&utm_content=andrenoberto/serverless-elearning&utm_campaign=Badge_Grade_Dashboard
[travis-image]: https://travis-ci.com/andrenoberto/serverless-elearning.svg?branch=master
[travis-url]: https://travis-ci.com/andrenoberto/serverless-elearning
[license-image]: https://img.shields.io/github/license/dividab/tsconfig-paths.svg?style=flat
[license-url]: https://opensource.org/licenses/MIT
[snyk-image]: https://snyk.io/test/github/andrenoberto/serverless-elearning/badge.svg?targetFile=package.json
[snyk-url]: https://snyk.io/test/github/andrenoberto/serverless-elearning?targetFile=package.json
