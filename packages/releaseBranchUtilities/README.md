# @44north/releaseBranchUtilities

A Module containing a number of small releaseBranchUtilities to use in your applications

## Install

```
npm install @44north/releaseBranchUtilities
```

or

```
yarn add @44north/releaseBranchUtilities
```

## Usage

```ts
import { ReleaseBranchUtilities } from "@44north/releaseBranchUtilities";

const utl = new ReleaseBranchUtilities();
```

### getDataset

returns the instance dataset

```ts
const utl = new ReleaseBranchUtilities(["v0.1.0"]);
const data = utl.getDataset();

/* data = [{
    name: "v0.1.0",
    major: 0,
    minor: 1,
    patch: 0
}];
*/
```

### hasEntry

returns if the dataset has an entry for the provided value

```ts
const utl = new ReleaseBranchUtilities(["v0.1.0"]);
utl.hasEntry("v0.1.0"); // true
utl.hasEntry("0.1.0"); // true
utl.hasEntry("Release-0.1.0"); // true
utl.hasEntry("0.1.1"); // false
```

### addEntry

Add one or more additional values

```ts
const utl = new ReleaseBranchUtilities();
utl.addEntry("v0.1.0").addEntry(["v1.0.0", "v1.1.0"]);
const data = utl.getDataset();

/* data = [{
    name: "v0.1.0",
    major: 0,
    minor: 1,
    patch: 0
},{
    name: "v1.0.0",
    major: 1,
    minor: 0,
    patch: 0
},{
    name: "v1.1.0",
    major: 1,
    minor: 1,
    patch: 0
}];
```

### getReleaseName

returns the release name for a found semvar

```ts
const utl = new ReleaseBranchUtilities(["v0.1.0"]);
const name = utl.getReleaseName(0, 1, 0); // v0.1.0
```

### getLatestRelease

returns the release name for a found semvar

```ts
const utl = new ReleaseBranchUtilities(["v0.1.0", "v0.2.1", "v0.2.0"]);
const name = utl.getLatestRelease(0, 1, 0); // v0.2.1
```

### next

returns the release name for a found semvar

```ts
const utl = new ReleaseBranchUtilities(["v0.1.0", "v0.2.1", "v0.2.0"]);
const major = utl.next("major"); // v1.0.0
const minor = utl.next("minor"); // v0.3.0
const patch = utl.next("patch"); // v0.2.2
```

## Static Methods

### is().before()

```ts
const result1 = ReleaseBranchUtilities.is("Release-v1.0.0").before("Release-v1.1.0"); // true
const result2 = ReleaseBranchUtilities.is("Release-v1.0.0").before("Release-v0.1.0"); // false
```

### is().after()

```ts
const result1 = ReleaseBranchUtilities.is("Release-v1.0.0").after("Release-v1.1.0"); // false
const result2 = ReleaseBranchUtilities.is("Release-v1.0.0").after("Release-v0.1.0"); // true
```
