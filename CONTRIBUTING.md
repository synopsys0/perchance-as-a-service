# Contributing

Thanks for considering a contribution. We are provisionally delighted.

## Add a maybe

Most contributions only need to edit `maybes.json`.

A good response is:

- a genuine synonym for “maybe” or a funny noncommittal answer;
- short enough to work in chat, bots, terminals, and UI labels;
- broadly understandable without private context;
- safe to display to a general audience;
- original writing rather than copied material.

Do not add harassment, hate, explicit sexual content, personal data, advertising, instructions for wrongdoing, or many near-duplicates of an existing answer.

Run the checks before opening a pull request:

```bash
npm install
npm run check
```

## Change the application

Keep the central constraint in mind: this is one tiny “maybe” API. New features should make the joke stronger or the endpoint easier to use without adding accounts, storage, tracking, or operational complexity.

Please explain the user-visible reason for larger changes in your pull request.
