# jenkins-cicd-demo

Sample app used in the Jenkins CI/CD + Prometheus/Grafana practical session.

## Contents
- `app.js` — tiny Express app with `/` and `/health` routes
- `package.json` — dependencies + `npm start` / `npm test`
- `test.js` — smoke test used by the pipeline's Test stage
- `Dockerfile` — builds the app into a container image
- `.dockerignore`
- `Jenkinsfile` — the pipeline definition Jenkins will run

## How to use this in the lab

1. Create a new GitHub repo, e.g. `jenkins-cicd-demo`.
2. Push all files in this folder to that repo's `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: demo app + Jenkinsfile"
   git branch -M main
   git remote add origin https://github.com/<your-username>/jenkins-cicd-demo.git
   git push -u origin main
   ```
3. **Edit the Jenkinsfile**: replace `<your-username>` in the `git url` field with your actual GitHub username (or better, use your repo's HTTPS/SSH URL directly).
4. In Jenkins, create a Pipeline job pointing at this repo (as covered in the main lab guide) with Script Path = `Jenkinsfile`.
5. Run the pipeline. On success, the app will be reachable at:
   `http://<jenkins-server-ip>:3001/`
   and health checks at:
   `http://<jenkins-server-ip>:3001/health`

## Local test (optional, before pushing)
```bash
npm install
npm start
# visit http://localhost:3000
```

## Docker test (optional, before wiring into Jenkins)
```bash
docker build -t myapp .
docker run -d -p 3001:3000 --name myapp myapp
curl http://localhost:3001/health
```
