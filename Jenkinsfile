pipeline {
    agent any

    environment {
        IMAGE_NAME = 'myapp'
        CONTAINER_NAME = 'myapp'
        HOST_PORT = '3001'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Delib2004/jenkins-cicd-demo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} -t ${IMAGE_NAME}:latest ."
            }
        }

        stage('Deploy') {
            steps {
                sh "docker stop ${CONTAINER_NAME} || true"
                sh "docker rm ${CONTAINER_NAME} || true"
                sh "docker run -d -p ${HOST_PORT}:3000 --name ${CONTAINER_NAME} ${IMAGE_NAME}:latest"
            }
        }

        stage('Verify Deployment') {
            steps {
                sh "sleep 3 && curl -f http://localhost:${HOST_PORT}/health"
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully — build #${BUILD_NUMBER} deployed."
        }
        failure {
            echo "Pipeline failed — check console output above."
        }
    }
}
