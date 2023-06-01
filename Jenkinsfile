pipeline { 
    agent any 
    stages {
        stage("Init") {
            steps { 
                sh " echo Hello world"
            }
        }

        stage("Build") { 
            steps { 
                sh "echo This step builds  the docker image."
                // sh 'docker-compose up'
                sh "docker build . -t testimage"
            }
        }
    }
}