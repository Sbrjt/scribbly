- Do **not** modify anything inside `node_modules/`.
- After making changes to api, start the development server and verify using `curl` to check the `/docs/json` endpoint.
- For running any command open terminal with wsl.
- Before spinning up new server, check in docker if the service is already running. (hot reload is enabled so no need to restart)
- No return types in functions.
- Dont use interface, use types.
- Use pnpm dlx for the shadcn CLI.

- To use a new library:

```
pnpm -F <image> add <new-lib>
docker compose up --build <image>
```

Don't `docker-compose down`.

- Indent with tab using 4 spaces. Don't use semicolons.