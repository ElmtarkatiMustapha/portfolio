# Mustapha El Mtarkati · Portfolio

A responsive, dark-mode portfolio built with React, TypeScript, and Vite. English/French content, persisted language preference, project filters, original illustrations, professional history, education, and direct contact links.

## Local development

Requires Node.js 24 and npm. In Windows PowerShell, use `npm.cmd` if execution policy blocks `npm.ps1`.

```sh
npm ci
npm run dev
```

Open http://localhost:5173. Production verification:

```sh
npm test
npm run build
npm run preview
```

Browser checks: `npm run test:e2e` after building (uses installed Chrome locally; CI installs Chromium). Both desktop and mobile layouts, localization persistence, filtering, navigation, image loading, and runtime errors are checked.

## Docker Compose

Start Docker Desktop with Linux containers, then:

```sh
docker compose up --build -d web
```

Production preview: http://localhost:8080. Health endpoint: `/health`.

On Windows, if Docker reports a missing `dockerDesktopLinuxEngine` pipe, first start Docker Desktop and wait for its engine. If the `default` context is the working endpoint, use `docker --context default compose up --build -d web`.

For live-reloading development:

```sh
docker compose --profile dev up --build dev
```

Development: http://localhost:5173. After dependency changes, refresh the development volume with `docker compose --profile dev run --rm dev npm ci`. Stop containers with `docker compose --profile dev down`.

## Branches and delivery

- `main`: stable production source.
- `dev`: integration branch.
- `feature/portfolio`: initial portfolio feature branch. Create future features as `feature/<name>`.

Open pull requests from feature branches into `dev`, then from `dev` into `main`. CI runs on pushes to these branches and PRs targeting `dev` or `main`: dependency audit, visitor interaction tests, TypeScript/build checks, production Docker build, and HTTP smoke checks. Configure branch protection on GitHub to require the `validate` and `docker` jobs and a PR before merging.

## Docker Hub publication

The CI workflow publishes the exact production image that passed the container HTTP checks to `docker.io/elmtarkati/portfolio`. Each successful push to `main` creates two tags: the full Git commit SHA and `latest`. A manual run of **Actions → CI → Run workflow → main** also tests and publishes the image. Pull requests, `dev`, and feature branches only run checks.

Configure these repository Actions settings before the first run:

| Type | Name | Value |
| --- | --- | --- |
| Variable | `DOCKERHUB_USERNAME` | `elmtarkati` |
| Secret | `DOCKERHUB_TOKEN` | Docker Hub token with permission to push to `elmtarkati/portfolio` |
| Variable | `ENABLE_RENDER_DEPLOY` | `false` until ready to deploy |

The Docker Hub repository `elmtarkati/portfolio` must already exist. Push the workflow changes to `main` to start the first publication. Check the **Sign in to Docker Hub** and **Publish the tested production image** steps in the `docker` job. Their success confirms publication; building locally alone does not publish an image.

## Render deployment — prepared, not deployed

Nothing in this project creates a Render service automatically. CD remains disabled unless `ENABLE_RENDER_DEPLOY` is explicitly set to `true` in GitHub repository Actions variables.

When ready:

1. After the first successful Docker Hub publication, create a Render web service using **Existing Image** with `docker.io/elmtarkati/portfolio:latest`, or import `render.yaml` as a Blueprint. Creating/importing the service can trigger its initial deployment. Choose your own plan in Render. For a private image, configure Docker Hub registry credentials in Render with permission to read the image (and add their `registryCredential` reference to the Blueprint if using it).
2. GitHub Actions controls subsequent deployments through a deploy hook. Render image-backed services do not automatically redeploy when a Docker Hub tag changes. The Blueprint also sets `autoDeployTrigger: off`.
3. Use `/health` as the health-check path. The Nginx image listens on Render’s `PORT`, defaulting to `10000`.
4. Copy the service’s deploy hook into the GitHub Actions secret `RENDER_DEPLOY_HOOK_URL` (repository Settings → Secrets and variables → Actions).
5. Optionally add required reviewers to the GitHub `production` environment.
6. Set the Actions variable `ENABLE_RENDER_DEPLOY` to `true` when ready to enable CD. Then merge/push a change to `main`.

The deployment workflow runs only after successful push CI on `main` from this repository, including Docker Hub publication. It passes `docker.io/elmtarkati/portfolio:<tested-commit-sha>` through the hook’s `imgURL` parameter. A successful workflow means Render accepted the request; check the Render dashboard for final build and deployment status. Feature branches, `dev`, and manually dispatched CI runs never deploy. Leave the enable variable unset or `false` to keep deployment disabled.

References: [Render Docker](https://render.com/docs/docker), [Deploy hooks](https://render.com/docs/deploy-hooks), [Blueprint reference](https://render.com/docs/blueprint-spec).

## Editing content

- `src/content.ts`: both languages, contact details, projects, skills, experience, and education.
- `src/App.tsx`: page sections and interactions.
- `src/styles.css`: responsive styles and reduced-motion support.
- `public/images/`: original hero and project artwork.

Contact/experience/education come from the supplied resume text; Simplon starts on 14 September 2026. Akkodis is shown as ongoing as supplied in the resume. Update its end date when known. Project descriptions were checked against the public repository READMEs; gymApp’s sparse README is described conservatively. Project illustrations are labeled concepts and are not screenshots. No PDF resume download is shown because no original PDF was supplied.

The site has no backend or contact-form provider: email and phone links open visitors’ own apps. Fonts use Google Fonts with system fallbacks. No application secrets are required. Deployment secrets belong in GitHub Actions, never in Vite client variables.

## Artwork

The hero was generated with the built-in image generation tool. See [art direction and prompt](docs/artwork.md). Project illustrations are editable original SVGs; regenerate them with `node scripts/generate-art.mjs`.
