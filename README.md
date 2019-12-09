# JSON-SCHEMA-TO-MARKDOWN-TOOL
# Example Output:
--------------------------------------------------------------------------------------------------------------


# https://example.com/arrays.schema.json

*A representation of a person, company, organization, or place*

`http://json-schema.org/draft-07/schema#`

## properties
### fruits <a name="fruits"></a>
|*type*|*items.type*
|---|---
array|string
### vegetables <a name="vegetables"></a>
|*type*|*items.$ref*
|---|---
array|#/definitions/veggie
## definitions
### veggie <a name="veggie"></a>
|*type*|*required*|*properties.veggieName.type*|*properties.veggieName.description*|*properties.veggieLike.type*|*properties.veggieLike.description*
|---|---|---|---|---|---
object|veggieName;veggieLike|string|The name of the vegetable.|boolean|Do I like this vegetable?
--------------------------------------------------------------------------------------------------------------

## Contributing
- Clone the repo and run `npm install`.
- Create a new feature branch: `git checkout -b feature/your-feature-branch-name`.
- Write a test in the `__tests__` folder for your feature.
- Write the code to get the test passing, running `npm run test`.
- Push your branch up and submit a pull request.

Note: I have configured a launch.json for vscode that should allow for playing around with anything in index.ts and hitting f5 to debug.

## Publishing
- npm version patch
- npm publish
