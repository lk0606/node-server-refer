pipeline {
    agent any
    options {
        disableConcurrentBuilds()
        timeout(time: 10, unit: 'MINUTES')
        timestamps()
    }
    tools { nodejs 'NodeJs_14_lts' }
    stages {
        stage('Preparation') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                // sh 'npm config set registry https://registry.npm.taobao.org/'
                // sh 'npm config get registry'
                sh 'npm i'
            }
        }
        stage('Build') {
            steps {
                script {
                    sh 'npm run build'
                }
            }
        }
        stage('Server') {
            steps {
                script {
                    sh 'pwd'
                    sh 'npm run list'
                    // sh 'npm run stop'
                    sh 'npm run prod'
                    sh 'npm run list'
                }
            }
        }
    }
    post {
        failure {
            emailext(
                subject: "Jenkins build is ${currentBuild.result}: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                mimeType: "text/html",
                body: """<p>Jenkins build is ${currentBuild.result}: ${env.JOB_NAME} #${env.BUILD_NUMBER}:</p>
                        <p>Check console output at <a href="${env.BUILD_URL}console">${env.JOB_NAME} #${env.BUILD_NUMBER}</a></p>""",
                recipientProviders: [[$class: 'CulpritsRecipientProvider'],
                                    [$class: 'DevelopersRecipientProvider'],
                                    [$class: 'RequesterRecipientProvider']]
            )
        }
    }
}
