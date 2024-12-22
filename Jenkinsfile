pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                https://github.com/mmohit1271/todo-app.git
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build' // Add a build command if applicable
            }
        }
        stage('Test') {
            steps {
                sh 'npm test' // Add your test scripts if available
            }
        }
        stage('Package') {
            steps {
                // Optional: If using Docker
                sh 'docker build -t todo-app:latest .'
            }
        }
        stage('Deploy') {
            steps {
                // Deploy to your server (adjust commands as needed)
                sh '''
                docker stop todo-app || true
                docker rm todo-app || true
                docker run -d --name todo-app -p 3000:3000 todo-app:latest
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed'
        }
    }
}

