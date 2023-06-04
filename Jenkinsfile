pipeline { 
    agent any 
    stages {
        stage("Init") {
            steps { 
                sh " echo Hello world"
            }
        }


        stage ("Get current version") {
            steps {
                script {
                    sh "echo This gets the current version and bumps it"

                    def packageJson = readJSON file: 'package.json'
                    def currentVersion = packageJson.version
                    echo "Current version: ${currentVersion}"

                    echo "$BUILD_NUMBER"

                    def newVersion = incrementVersion(currentVersion)
                    echo "New version: $newVersion"
                    // def packageJson = readJSON file: 'package.json'
                    // def packageVersion = packageJSON.version
                    // echo "${packageJSONVersion}"
                    // sh(script: 'npm run version', returnStdout: true)
                    // sh "$env.BUILD_NUMBER"

                    // when ( env.BRANCH_NAME) { 
                        // sh "echo $BRANCH_NAME"
                    // }
                }
            }
        }

        stage("Build") { 
            steps { 
                sh "echo This step builds  the docker image. Testing the new intergrations"
                // sh 'docker-compose up'
                sh "docker build . -t manulangat/nest-refresher:latest"
            }
        }


         stage('SonarQube Analysis') {
                steps {
                    script {
                        sh "echo Sonarqube analysis"
                    }
                }
            }

        stage("Deploy to dockerhub") { 
            steps { 
                script{
                    sh "echo This step pushed the built image to dockerhub"
                    withCredentials([ 
                    usernamePassword(credentialsId:'docker-hub-creds', usernameVariable:'USER', passwordVariable:'PASSWORD')
                ]) { 
                    sh "echo $PASSWORD | docker login -u $USER --password-stdin"
                    sh "docker push manulangat/nest-refresher:latest"
                }
                }
            }
        }

        stage ("Test docker compose step") {
            steps { 
                script { 
                    sh "echo Hello there"
                    sh "docker-compose version"
                }
            }
        }
    }
}

def incrementVersion(version) {
    // Split the version string into its major, minor, and patch components
    def (major, minor, patch) = version.split(/\./).collect { it.toInteger() }

    // Increment the appropriate component
    patch += 1

    // Build and return the new version string
    return "${major}.${minor}.${patch}"
}