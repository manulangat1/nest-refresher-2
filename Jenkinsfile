
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

        // stage("Delete docker caches") {
        //     steps { 
        //         script { 
        //             echo "Delete all docker caches"
        //             sh " docker system prune -f"
        //         }
        //     }
        // }
        

        stage ("Get current app version and bump it") {
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
                    env.NEW_V = newVersion

                    echo "NEW_V : $NEW_V"
                    packageJson.version = NEW_V
                    echo "$newVersion"
                    // writeJSON file: 'package.json', json: packageJson
                    writeFile file: 'package.json', text: groovy.json.JsonOutput.prettyPrint(groovy.json.JsonOutput.toJson(packageJson))
                    // writeFile file: 'package.json', text: groovy.json.JsonOutput.toJson(packageJson)
                }
            }
        }

        stage("Build app images") { 
            steps { 
                sh "echo This step builds  the docker image. Testing the new intergrations"
                // sh 'docker-compose up'
                sh "docker build . -t manulangat/nest-refresher:$IMAGE_TAG  "
            }
        }

        // stage("Run tests"){
        //     steps {
        //         script { 
        //             withCredentials( [
        //                 usernamePassword(credentialsId:'docker-hub-creds', usernameVariable:'USER', passwordVariable:'PASSWORD') 
        //             ]){
        //                 sh "docker ps"
        //                 sh " docker run manulangat/nest-refresher:$IMAGE_TAG -"
        //             sh "docker run exec manulangat/nest-refresher:$IMAGE_TAG npm run test:e2e "
        //             }
                    
        //         }
        //     }
        // }

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

        stage ("Deploy artifacts to nexus") { 
            steps { 
                script{
                    echo " Pushing to nexus"
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

        stage ("Commit bump version to github") { 
            steps { 
                script { 
                    echo "This commits the version upgrade to github"
                    withCredentials([
                        usernamePassword(credentialsId:"Github_credentials_for_manu" , usernameVariable: "USER" , passwordVariable: 'PASSWORD')
                    ]){
                        echo "Helo world"
                        sh 'git config --global user.email "jenkins@gmail.com"'
                        sh 'git config --global  user.name "jenkins"'
                        sh "git branch"
                        sh "git status"
                        sh "git remote set-url origin https://${USER}:${PASSWORD}@github.com/manulangat1/nest-refresher-2.git"
                        sh " git add ."
                        sh 'git commit -m "ci: version update bump ${IMAGE_TAG}"'
                        sh 'git push origin HEAD:ft-jenkins-setup'
                    }
                }
            }
        }

        stage("Delete docker caches after") {
            steps { 
                script { 
                    echo "Delete all docker caches"
                    sh " docker system prune -f --volumes"
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