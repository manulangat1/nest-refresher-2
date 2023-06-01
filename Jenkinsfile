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
                sh "echo This step builds  the docker image. Testing the new intergrations"
                // sh 'docker-compose up'
                sh "docker build . -t testimage"
            }
        }

        // stage('SonarQube Analysis') {
        //     steps { 
        //         def scannerHome = tool 'SonarScanner';
        //     withSonarQubeEnv() {
        //     sh "${scannerHome}/bin/sonar-scanner"
        //     }
        //     }
            
        // }

         stage('SonarQube Analysis') {
                steps {
                    script {
                        def scannerHome = tool 'SonarScanner';
                            withSonarQubeEnv() {
                            sh "${scannerHome}/bin/sonar-scanner"
                            }
                    }
                }
            }
    }
}