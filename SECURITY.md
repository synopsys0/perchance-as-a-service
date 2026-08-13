# Security policy

## Supported versions

Security fixes are applied to the latest version on the `main` branch and the current public deployment.

## Reporting a vulnerability

Please do not open a public issue for a suspected security vulnerability. Use GitHub's [private vulnerability reporting form](../../security/advisories/new) for this repository.

If private vulnerability reporting is unavailable, contact the maintainer through their GitHub profile without including vulnerability details in a public message. Do not test against the public deployment without permission.

## Scope

The service accepts no user content and stores no user data. Reports involving dependency vulnerabilities, denial-of-service risks, unsafe headers, or deployment configuration are still welcome.

## Known build-tool advisory

The development dependency tree currently includes `image-size@2.0.2` through `vinext`. GitHub advisories [GHSA-w3rx-r6r6-pgpr](https://github.com/advisories/GHSA-w3rx-r6r6-pgpr) and [GHSA-5p2g-fcmc-qvqq](https://github.com/advisories/GHSA-5p2g-fcmc-qvqq) describe infinite-loop denial-of-service issues when parsing malicious ICNS, JXL, or HEIF files. No patched `image-size` release is currently available.

This service does not accept or process image uploads, and `image-size` is not included in the deployed Worker bundle. Dependabot remains enabled so the dependency can be updated when an upstream fix is released. The production dependency audit is enforced separately in CI.
