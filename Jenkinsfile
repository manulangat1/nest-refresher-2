pipeline { 
    agent any 
    // environment {
    //     def newVersion
    // }
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
                    env.IMAGE_TAG = "$newVersion-$BUILD_NUMBER"

                    packageJson.version = newVersion
                    writeJSON file: 'package.json', json: packageJson
                }
            }
        }

        stage("Build") { 
            steps { 
                sh "echo This step builds  the docker image. Testing the new intergrations"
                // sh 'docker-compose up'
                sh "docker build . -t manulangat/nest-refresher:$IMAGE_TAG"
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
                    sh "docker push manulangat/nest-refresher:$IMAGE_TAG"
                }
                }
            }
        }

        // stage ("Test docker compose step") {
        //     steps { 
        //         script { 
        //             sh "echo Hello there"
        //             sh "docker-compose version"
        //         }
        //     }
        // }

        stage ("Commit version update") { 
            steps { 
                script { 
                    echo "This commits the version upgrade to github"
                    withCredentials([
                        usernamePassword(credentialsId:"Github_credentials_for_manu" , usernameVariable: "USER" , passwordVariable: 'PASSWORD')
                    ]){
                        echo "Helo world"
                    }
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